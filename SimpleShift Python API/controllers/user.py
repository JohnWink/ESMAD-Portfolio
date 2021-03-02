import logging
from models.user import User
from models.company import Company
import sqlalchemy.orm
import db_session
from sqlalchemy import exc
from passlib.hash import sha256_crypt
from flask import abort
from sqlalchemy.sql import exists
import smtplib, ssl
from smtplib import SMTPException
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_jwt_extended import (create_access_token, create_refresh_token, get_jwt_identity)
from random import randint


def createUser(idCompany: int, email: str, role: str):
    session: sqlalchemy.orm.Session = db_session.factory()

    company: Company = session.query(Company). \
        filter(Company.idCompany == idCompany). \
        one()

    # Only the founder account can be created when the company is pending.
    if company.status == "pending" and role != "founder":
        return {"title": "Company isn't active yet",
                "message": "The Company isn't active yet. Please finish payment or contact our support team for "
                           "any questions you may have"}, 406
    # Only one founder account can be created for a company.
    if role == "founder" and session.query(User).filter(User.idCompany == idCompany).one_or_none():
        return {
            "title": "Company already has founder registered.",
            "message": "Please contact support, company already has a registered email address for the founder user."
        }, 406
    # TODO -- Check that authentication has been completed and that the requesting user is an admin -- should this be
    # on the routes/user?
    if role != "founder":
        pass
    # Can't register an account if one already exists with the same email address.
    existing_user: User = session.query(User).filter(User.email == email).one_or_none()
    # If so, suggest either password reset or to resend activation email.
    if existing_user:
        if existing_user.status == "active":
            return {
                "title": "Already got that email, try logging in.",
                "message": f"Looks like we already have an account for {email}. Please try to log in, "
                           "or contact support if you're stuck."
            }, 406
            # TODO -- Suggest password reset.
        elif existing_user.status == "pending":
            emailNewUser(existing_user.idUser, existing_user.email)
            return {
                "title": "Already got that email, needs confirmed.",
                "message": f"Looks like we already have an account for {email}, but it hasn't been activated yet."
                           "We've re-sent the confirmation email, double check your inbox and spam folder, "
                           "or contact support if you're stuck."
            }, 406
            # TODO -- Resend activation email.


    # Get random uniqueid
    min_ = 100
    max_ = 1000000000

    # possibility of same random number is very low.
    # but if you want to make sure, here you can check id exists in database.

    exist_idUser = True
    while exist_idUser:
        rand = randint(min_, max_)

        exist_idUser = session.query(
            session.query(User).filter_by(idUser=rand).exists()
        ).scalar()

        u = User()

        u.idUser = rand

        u.role = role

        u.email = email

        u.idCompany = idCompany

        session.add(u)
        session.commit()
        emailNewUser(u.idUser, email)

    return {"message": "success"}, 200


def emailNewUser(idUser: int, email: str):
    access_token = create_access_token(idUser)
    refresh_token = create_refresh_token(idUser)
    sender = 'devjohnwink@gmail.com'
    receiver = email

    gmail_user = "devjohnwink@gmail.com"
    gmail_password = "SiOl920092."

    message = MIMEMultipart("alternative")
    message["Subject"] = ("Create User")
    message["From"] = sender
    message["To"] = receiver
    # Create the plain-text and HTML version of your message
    text = """\
        Hey,
        You have received a request to create an account
        Click on the link bellow to Create your account:
        http://192.168.4.200:8080/#/users/{idUser}/signup/{access_token}/{refresh_token}"""
    html = """\
        <html>
         <head>
            <title>Title of the document</title>
            <style>

            </style>
          </head>
          <body>
            <h1>Hey</h1>
               <h2>You have received a request to create an account</h2>
               <a  href="http://192.168.4.200:8080/#/users/{idUser}/signup/{access_token}/{refresh_token}" ><h2> Click on the link bellow to Create your account</h2></a> 
            </h1>
          </body>
        </html>
        """
    print(html)
    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text.format(access_token=str(access_token), idUser=str(idUser), refresh_token=str(refresh_token)),
                     "plain")
    part2 = MIMEText(html.format(access_token=str(access_token), idUser=str(idUser), refresh_token=str(refresh_token)),
                     "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    message.attach(part2)

    # Create a secure SSL context
    context = ssl.create_default_context()
    try:
        smtpObj = smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context)
        smtpObj.ehlo()
        smtpObj.login(gmail_user, gmail_password)
        smtpObj.sendmail(sender, receiver, message.as_string())
        returnMessage = "email sent"
    except SMTPException:
        returnMessage = "Error: unable to send mail"

    return returnMessage


def login(email: str, password: str):
    session: sqlalchemy.orm.Session = db_session.factory()
    user = session.query(User). \
        filter(User.email == email). \
        filter(User.status == "active"). \
        one()

    if user and sha256_crypt.verify(password, user.password):
        # when authenticated, return a fresh access token and a refresh token
        access_token = create_access_token(identity=user.idUser, fresh=True)
        refresh_token = create_refresh_token(user.idUser)

        return {
                   'access_token': access_token,
                   'refresh_token': refresh_token,
                   'idUser': user.idUser,
                   'idCompany': user.idCompany,
                   'role': user.role,
                   'name': user.name,
                   'email': user.email,
                   'phone': user.phone,
                   'prefered_contact': user.prefered_contact,
                   'messenger_name': user.messenger_name,
                   'time_zone': user.time_zone,
               }, 200
    return {"message": "Invalid Credentials!"}, 401


def checkUser():
    return {"message": "success"}, 200


def activate(idUser: int, name: str, password: str, phone: str, prefered_contact: str, time_zone: str,
             messenger_name: str):
    session: sqlalchemy.orm.Session = db_session.factory()

    user = session.query(User). \
        filter(User.idUser == idUser). \
        one()

    user.name = name
    user.phone = phone
    user.prefered_contact = prefered_contact
    user.time_zone = time_zone
    user.messenger_name = messenger_name
    user.status = "active"

    # Hashing password
    hashedPass = sha256_crypt.encrypt(password)
    user.password = hashedPass

    if user.role != "founder":
        verify(user.idCompany)
        session.commit()
    else:
        session.commit()

    access_token = create_access_token(identity=user.idUser, fresh=True)
    refresh_token = create_refresh_token(user.idUser)

    return {
               'access_token': access_token,
               'refresh_token': refresh_token,
               'idUser': user.idUser,
               'idCompany': user.idCompany,
               'role': user.role,
               'name': user.name,
               'email': user.email,
               'phone': user.phone,
               'prefered_contact': user.prefered_contact,
               'messenger_name': user.messenger_name,
               'time_zone': user.time_zone,
           }, 200


def verify(idCompany):
    session: sqlalchemy.orm.Session = db_session.factory()

    company = session.query(Company). \
        filter(Company.idCompany == idCompany). \
        one()

    if company.status == "active":
        return True
    else:
        return False


def registration_resend(idUser: int):
    session: sqlalchemy.orm.Session = db_session.factory()

    user = session.query(User). \
        filter(User.idUser == idUser). \
        one()

    exists = session.query(
        session.query(User).filter_by(idUser=user.idUser, status="pending").exists()
    ).scalar()

    if (exists):
        emailNewUser(user.idUser, user.email)
        return {"message": "success"}, 200
    else:
        return {"error": "conflict"}, 409


def getCompanyUsers(idCompany: int):
    session: sqlalchemy.orm.Session = db_session.factory()

    users = session.query(User). \
        filter(User.idCompany == idCompany). \
        filter(User.status == "active"). \
        all()
    data = []

    for user in users:
        data.append({
            "idUser": user.idUser,
            "role": user.role,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "prefered_contact": user.prefered_contact,
            "messenger_name": user.messenger_name,
            "time_zone": user.time_zone,
        })
    print("data: ", data)
    current_user = get_jwt_identity()
    # return a non-fresh token for the user
    new_token = create_access_token(identity=current_user, fresh=False)

    return {
               'access_token': new_token,
               'users': data
           }, 200

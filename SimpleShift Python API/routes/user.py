import flask
from flask import request
from controllers import user
from flask_jwt import jwt_required, current_identity
blueprint = flask.Blueprint('user', __name__)
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_refresh_token_required, create_access_token



@blueprint.route('/companies/<int:idCompany>/founder', methods=["POST"])
def postCompanyFounder(idCompany: int):
    name = request.form.get("name")
    email = request.form.get("email")
    password = request.form.get("password")
    phone = request.form.get("phone")
    prefered_contact = request.form.get("prefered_contact")
    time_zone = request.form.get("time_zone")
    messenger_name = request.form.get("messenger_name")

    result = user.postCompanyFounder(idCompany, name, email, password, phone, prefered_contact, time_zone,
                                     messenger_name)

    return result


@blueprint.route('/companies/<int:idCompany>/users/founder', methods=["POST"])
def createFounder(idCompany: int):
    email = request.form.get("email")
    role = request.form.get("role")

    result = user.createUser(idCompany, email, role)
    return result


@blueprint.route('/companies/<int:idCompany>/users', methods=["POST"])
@jwt_refresh_token_required
def createUser(idCompany: int):
    email = request.form.get("email")
    role = request.form.get("role")

    result = user.createUser(idCompany, email, role)
    return result


@blueprint.route('/users/<int:idUser>/signup', methods=["GET"])
def signup(idUser: int):
    return flask.render_template('/signup.html', user=idUser)


@blueprint.route('/checkUser',methods=["GET"])
@jwt_required
def checkUser():
    result = user.checkUser()

    return result

@blueprint.route('/users/<int:idUser>/activate', methods=["PUT"])
@jwt_refresh_token_required
def activate(idUser: int):
    name = request.form.get("name")
    password = request.form.get("password")
    phone = request.form.get("phone")
    prefered_contact = request.form.get("prefered_contact")
    time_zone = request.form.get("time_zone")
    messenger_name = request.form.get("messenger_name")

    

    result = user.activate(idUser, name, password, phone, prefered_contact, time_zone, messenger_name)

    return result

@blueprint.route('/users/<int:idUser>/registration_resend', methods=["GET"])
@jwt_refresh_token_required
def registration_resend(idUser:int):
    result = user.registration_resend(idUser)
    return result

@blueprint.route('/users/login', methods=["POST"])
def login():
    email = request.form.get("email")
    password = request.form.get("password")

    result = user.login(email, password)

    return result


@blueprint.route('/companies/<int:idCompany>/users', methods=["GET"])
@jwt_required
def getCompanyUsers(idCompany:int):

    result = user.getCompanyUsers(idCompany)

    return result


#JWT end point example
@blueprint.route('/protected', methods=['GET'])
# An endpoint that requires a valid access token (non-expired, either fresh or non-fresh):
#@jwt_required
# An endpoint that requires a valid fresh access token (non-expired and fresh only):
@jwt_refresh_token_required
def protected():
    # retrive the user's identity from the refresh token using a Flask-JWT-Extended built-in method
    current_user = get_jwt_identity()
    # return a non-fresh token for the user
    new_token = create_access_token(identity=current_user, fresh=False)
    return {'access_token':new_token},200

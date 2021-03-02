from models.company import Company
import sqlalchemy.orm
import db_session
from sqlalchemy import exc
import datetime
from flask import abort


def postCompany(name: str, package: str):
    c = Company()

    c.name = name
    c.package = package
    c.created = datetime.datetime.now()
    c.status = "pending"

    session: sqlalchemy.orm.Session = db_session.factory()

    exists = session.query(
        session.query(Company).filter_by(name=name,status="active").exists()
    ).scalar()

    if exists:
        abort(409, "Company name exists")
        message = "error"

    else:
        session.add(c)

        try:
            session.commit()

            idLast = c.idCompany

            message = {"success": idLast}


        except exc.SQLAlchemyError:
            print("Error posting User: {}".format(exc.SQLAlchemyError))
            message = exc.SQLAlchemyError

    return message

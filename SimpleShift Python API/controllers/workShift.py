from models.workShift import WorkShift
import sqlalchemy.orm
import db_session
import datetime
from flask import jsonify

from flask import abort
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_refresh_token_required, create_access_token, \
    create_refresh_token


def getWorkShift(idWorkShift: int):
    session: sqlalchemy.orm.Session = db_session.factory()

    shift = session.query(WorkShift). \
        filter(WorkShift.id_work_shift == idWorkShift). \
        one()

    current_user = get_jwt_identity()
    # return a non-fresh token for the user
    new_token = create_access_token(identity=current_user, fresh=False)

    return {
               "access_token": new_token,
               "shift": {'id_work_shift': shift.id_work_shift,
                         'start_datetime': shift.start_datetime,
                         'end_datetime': shift.end_datetime,
                         'start_datetime_strict': shift.start_datetime_strict,
                         'end_datetime_strict': shift.end_datetime_strict,
                         'start_location': shift.start_location,
                         'end_location': shift.end_location,
                         'summary': shift.summary,
                         'description': shift.description,
                         'idCompany': shift.idCompany,
                         'idUser': shift.idUser
                         }

           }, 200


def postWorkShift(idCompany: int, idUser: int, summary: str, description: str, start_datetime: str, end_datetime: str,
                  start_location: str, end_location: str):
    start_time = datetime.datetime.strptime(start_datetime, "%Y-%m-%dT%H:%M:%S.%fZ")
    end_time = datetime.datetime.strptime(end_datetime, "%Y-%m-%dT%H:%M:%S.%fZ")

    print("start time: {}".format(start_time.utcoffset()))
    print("end time: {}".format(end_time.utcoffset()))
    shift = WorkShift()

    shift.summary = summary
    shift.description = description
    shift.start_datetime = start_time
    shift.end_datetime = end_time
    shift.start_location = start_location
    shift.end_location = end_location
    shift.idCompany = idCompany
    shift.idUser = idUser

    session: sqlalchemy.orm.Session = db_session.factory()

    session.add(shift)

    session.commit()

    dt_str = datetime.datetime.strftime(shift.start_datetime, '%Y-%m-%d %H:%M:%S')
    print("getting stored start time: {}".format(dt_str))

    current_user = get_jwt_identity()
    # return a non-fresh token for the user
    new_token = create_access_token(identity=current_user, fresh=False)

    return {
               'access_token': new_token,
               'idWorkShift': shift.id_work_shift,
               'message': 'success'
           }, 201


def updateWorkShift(idWorkShift: int, summary: str, description: str, start_datetime: str,
                    end_datetime: str, start_location: str, end_location: str):
    start_datetime = datetime.datetime.strptime(start_datetime, "%Y-%m-%dT%H:%M:%S.%fZ")
    end_datetime = datetime.datetime.strptime(end_datetime, "%Y-%m-%dT%H:%M:%S.%fZ")

    session: sqlalchemy.orm.Session = db_session.factory()

    shift = session.query(WorkShift). \
        filter(WorkShift.id_work_shift == idWorkShift). \
        one()

    shift.summary = summary
    shift.description = description
    shift.start_datetime = start_datetime
    shift.end_datetime = end_datetime
    shift.start_location = start_location
    shift.end_location = end_location

    session.commit()

    current_user = get_jwt_identity()

    # return a non-fresh token for the user
    new_token = create_access_token(identity=current_user, fresh=False)

    return {
               'access_token': new_token,
               'message': 'success'
           }, 200


def getWorkShifts(idCompany: int):
    session: sqlalchemy.orm.Session = db_session.factory()

    shifts = session.query(WorkShift). \
        filter(WorkShift.idCompany == idCompany). \
        all()

    current_user = get_jwt_identity()
    # return a non-fresh token for the user
    new_token = create_access_token(identity=current_user, fresh=False)

    data = []

    for shift in shifts:
        data.append({'id_work_shift': shift.id_work_shift,
                     'start_datetime': shift.start_datetime,
                     'end_datetime': shift.end_datetime,
                     'start_datetime_strict': shift.start_datetime_strict,
                     'end_datetime_strict': shift.end_datetime_strict,
                     'start_location': shift.start_location,
                     'end_location': shift.end_location,
                     'summary': shift.summary,
                     'description': shift.description,
                     'idCompany': shift.idCompany,
                     'idUser': shift.idUser})

    return {
               'access_token': new_token,
               'shifts': data
           }, 200

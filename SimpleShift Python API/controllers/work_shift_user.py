from models.work_shift_user import Work_Shift_User
import sqlalchemy.orm
import db_session
import datetime
from flask import abort
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_refresh_token_required, create_access_token


def postWorkshiftUser(idUser: int, idWorkshift: int, notes: str, start_datetime: str, end_datetime: str):

    session: sqlalchemy.orm.Session = db_session.factory()
    # Checks if an email from an active user already exists
    exists = session.query(
        session.query(Work_Shift_User).filter_by(idUser=idUser, id_work_shift=idWorkshift).exists()
    ).scalar()

    if exists:
        abort(409, "User already exists in work shift")

    start_time = datetime.datetime.strptime(start_datetime, "%Y-%m-%dT%H:%M:%S.%fZ")
    end_time = datetime.datetime.strptime(end_datetime, "%Y-%m-%dT%H:%M:%S.%fZ")

    shift = Work_Shift_User()

    shift.idUser = idUser
    shift.id_work_shift = idWorkshift
    shift.start_time = start_time
    shift.end_time = end_time
    shift.status="pending"
    shift.notes = notes



    session.add(shift)

    session.commit()

    current_user = get_jwt_identity()
    # return a non-fresh token for the user
    new_token = create_access_token(identity=current_user, fresh=False)

    data = []

    data.append({'id_work_shift_user': shift.id_work_shift_user,
                 'idUser': shift.idUser,
                 'id_work_shift': shift.id_work_shift,
                 'start_datetime': shift.start_time,
                 'end_datetime': shift.end_time,
                 'notes': shift.notes,
                 'status': shift.status,
                 })
    print("shift user data: ", data)
    return {
               'access_token': new_token,
               'workShiftUser': data,
               'message': 'success'
           }, 201

def getWorkShiftUsers(idWorkShift:int):
    session: sqlalchemy.orm.Session = db_session.factory()

    shifts = session.query(Work_Shift_User). \
        filter(Work_Shift_User.id_work_shift == idWorkShift). \
        all()

    current_user = get_jwt_identity()
    # return a non-fresh token for the user
    new_token = create_access_token(identity=current_user, fresh=False)

    data = []

    for shift in shifts:
        data.append({'id_work_shift_user': shift.id_work_shift_user,
                     'idUser': shift.idUser,
                     'id_work_shift': shift.id_work_shift,
                     'start_datetime': shift.start_time,
                     'end_datetime': shift.end_time,
                     'notes': shift.notes,
                     'status': shift.status,
                     })

    return {
               'access_token': new_token,
               'shiftUsers': data
           }, 200


def getWorkShiftUsersByUser(idUser:int):
    session: sqlalchemy.orm.Session = db_session.factory()

    shifts = session.query(Work_Shift_User). \
        filter(Work_Shift_User.idUser == idUser). \
        all()

    current_user = get_jwt_identity()
    # return a non-fresh token for the user
    new_token = create_access_token(identity=current_user, fresh=False)

    data = []

    for shift in shifts:
        data.append({'id_work_shift_user': shift.id_work_shift_user,
                     'idUser': shift.idUser,
                     'id_work_shift': shift.id_work_shift,
                     'start_datetime': shift.start_time,
                     'end_datetime': shift.end_time,
                     'notes': shift.notes,
                     'status': shift.status,
                     })

    return {
               'access_token': new_token,
               'shiftUsers': data
           }, 200
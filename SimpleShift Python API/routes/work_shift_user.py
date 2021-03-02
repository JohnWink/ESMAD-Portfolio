import flask
from flask import request
from controllers import work_shift_user
from flask_jwt import jwt_required, current_identity
blueprint = flask.Blueprint('work_shift_user', __name__)
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_refresh_token_required, create_access_token

@blueprint.route('/users/<int:idUser>/workShifts/<int:idWorkshift>/workShiftUsers', methods=['POST'])
@jwt_refresh_token_required
def postWorkShiftUser(idUser:int,idWorkshift:int):

    notes = request.form.get("notes")
    start_datetime = request.form.get("start_datetime")
    end_datetime = request.form.get("end_datetime")

    result = work_shift_user.postWorkshiftUser(idUser,idWorkshift,notes,start_datetime,end_datetime)

    return result


@blueprint.route('/workShifts/<int:idWorkShift>/workShiftUsers', methods=['GET'])
@jwt_required
def getWorkShiftUsers(idWorkShift:int):

    result = work_shift_user.getWorkShiftUsers(idWorkShift)
    return result

@blueprint.route('/users/<int:idUser>/workShiftUser', methods=['GET'])
@jwt_required
def getWorkShiftUsersByUser(idUser:int):

    result = work_shift_user.getWorkShiftUsersByUser(idUser)
    return result

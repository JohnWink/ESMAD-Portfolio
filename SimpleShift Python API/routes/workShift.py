import flask
from flask import request
from controllers import workShift
from flask_jwt import jwt_required, current_identity

blueprint = flask.Blueprint('workShift', __name__)
from flask_jwt_extended import jwt_required, get_jwt_identity, jwt_refresh_token_required, create_access_token
from flask import jsonify


@blueprint.route('/workShifts/<int:idWorkShift>')
@jwt_required
def getWorkShift(idWorkShift: int):
    result = workShift.getWorkShift(idWorkShift)

    return result


@blueprint.route('/companies/<int:idCompany>/users/<int:idUser>/workShifts', methods=['POST'])
@jwt_refresh_token_required
def postWorkShift(idCompany: int, idUser: int):
    summary = request.form.get("summary")
    description = request.form.get("description")
    start_datetime = request.form.get("start_datetime")
    end_datetime = request.form.get("end_datetime")
    start_location = request.form.get("startLocation")
    end_location = request.form.get("endLocation")

    result = workShift.postWorkShift(idCompany, idUser, summary, description, start_datetime, end_datetime,
                                     start_location, end_location)

    return result


@blueprint.route('/workShifts/<int:idWorkShift>', methods=['PUT'])
@jwt_refresh_token_required
def updateWorkShift(idWorkShift: int):
    summary = request.form.get("summary")
    description = request.form.get("description")
    start_datetime = request.form.get("start_datetime")
    end_datetime = request.form.get("end_datetime")
    start_location = request.form.get("startLocation")
    end_location = request.form.get("endLocation")

    result = workShift.updateWorkShift(idWorkShift, summary, description, start_datetime, end_datetime, start_location,
                                       end_location)

    return result


@blueprint.route('/companies/<int:idCompany>/workShifts', methods=['GET'])
@jwt_required
def getWorkShifts(idCompany: int):
    result = workShift.getWorkShifts(idCompany)

    return result

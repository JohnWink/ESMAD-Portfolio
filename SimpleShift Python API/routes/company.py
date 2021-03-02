import flask
from flask import request
from controllers import company

blueprint = flask.Blueprint('company', __name__)


@blueprint.route('/companies', methods=["POST"])
def postCompany():
    name = request.form.get("name")
    package = request.form.get("package")

    result = company.postCompany(name, package)

    return result

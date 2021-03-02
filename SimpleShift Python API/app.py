from flask import Flask
import db_session as db
from flask_cors import CORS
import os
from flask_jwt_extended import JWTManager




app = Flask(__name__, template_folder= "views")
app.config.from_object('config.Config')

# Make this long, random, and secret!
jwt = JWTManager(app)



CORS(app, resources={r"/*": {"origins": "*"}})

def main():
    register_blueprints()
    setup_db()

def setup_db():
    db_file = os.path.join(
        os.path.dirname(__file__),
        'db',
        'mydb.sqlite')
    db.global_init(db_file, app.config.get("DB_URL"))

def register_blueprints():
    from routes import user
    from routes import company
    from routes import workShift
    from routes import work_shift_user

    app.register_blueprint(user.blueprint)
    app.register_blueprint(company.blueprint)
    app.register_blueprint(workShift.blueprint)
    app.register_blueprint(work_shift_user.blueprint)

main()

if __name__ == '__main__':
    app.run()

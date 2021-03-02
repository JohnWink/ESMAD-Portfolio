from os import environ, path
from dotenv import load_dotenv  # package is called python-dotenv
import db_session as db


basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))
DEVORPROD = environ.get('DEVORPROD')


basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, '.env'))

class Config:
    JWT_SECRET_KEY = environ.get("JWT_SECRET_KEY")

    DB_URL = environ.get("DB_URL")


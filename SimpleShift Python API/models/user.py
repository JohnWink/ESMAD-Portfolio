import sqlalchemy as sa
import sqlalchemy.orm as orm
from models import company
from models.modelbase import SqlAlchemyBase

sa.String = sa.Text


class User(SqlAlchemyBase):
    __tablename__ = 'user'
    __table_args__ = {'extend_existing': True}

    idUser = sa.Column(sa.Integer, primary_key=True, unique=True)
    role = sa.Column(sa.String, nullable=True)
    name = sa.Column(sa.String, nullable=True)
    password = sa.Column(sa.String, nullable=True)
    email = sa.Column(sa.String, nullable=True)
    phone = sa.Column(sa.String, nullable=True)
    prefered_contact = sa.Column(sa.String, nullable=True)
    messenger_name = sa.Column(sa.String, nullable=True)
    time_zone = sa.Column(sa.String, nullable=True)
    status = sa.Column(sa.String, default="pending")
    idCompany = sa.Column(sa.Integer, sa.ForeignKey('company.idCompany'))

    def __repr__(self):
        return "<User {}>".format(self.idUser)

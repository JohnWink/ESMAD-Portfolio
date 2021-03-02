import sqlalchemy as sa
import sqlalchemy.orm as orm
from models.modelbase import SqlAlchemyBase
sa.String = sa.Text


class Company(SqlAlchemyBase):
    __tablename__ = "company"
    __table_args__ = {'extend_existing': True}

    idCompany = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    name = sa.Column(sa.String, nullable=True)
    created = sa.Column(sa.DateTime)
    edited = sa.Column(sa.DateTime, nullable=True)
    package = sa.Column(sa.String)
    status = sa.Column(sa.String)

    def __repr__(self):
        return "<company {}>".format(self.idCompany)



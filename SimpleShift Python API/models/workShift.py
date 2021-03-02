import sqlalchemy as sa
import sqlalchemy.orm as orm
from models.modelbase import SqlAlchemyBase

sa.String = sa.Text

class WorkShift(SqlAlchemyBase):

    __tablename__ = "work_shift"
    __table_args__ = {'extend_existing': True}

    id_work_shift: int = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    start_datetime: str = sa.Column(sa.DateTime(timezone=True), nullable=True)
    end_datetime: str = sa.Column(sa.DateTime(timezone=True), nullable=True)
    start_datetime_strict: bool = sa.Column(sa.Boolean, nullable=True)
    end_datetime_strict: bool = sa.Column(sa.Boolean, nullable=True)
    start_location: str = sa.Column(sa.String, nullable=True)
    end_location: str = sa.Column(sa.String, nullable=True)
    summary: str = sa.Column(sa.String, nullable=True)
    description: str = sa.Column(sa.String, nullable=True)
    idCompany: int = sa.Column(sa.Integer, sa.ForeignKey('company.idCompany'))
    idUser: int = sa.Column(sa.Integer, sa.ForeignKey('user.idUser'))


def __repr__(self):
    return "<work_shift {}>".format(self.id_work_shift)

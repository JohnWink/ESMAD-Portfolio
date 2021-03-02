import sqlalchemy as sa
import sqlalchemy.orm as orm
from models.modelbase import SqlAlchemyBase

sa.String = sa.Text

class Work_Shift_User(SqlAlchemyBase):

    __tablename__ = "work_shift_user"
    __table_args__ = {'extend_existing': True}

    id_work_shift_user: int = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    idUser: int = sa.Column(sa.Integer, sa.ForeignKey('user.idUser'))
    id_work_shift: int = sa.Column(sa.Integer, sa.ForeignKey('work_shift.id_work_shift'))
    start_time: str = sa.Column(sa.DateTime(timezone=True), nullable=True)
    end_time:str= sa.Column(sa.DateTime(timezone=True), nullable=True)
    status:str = sa.Column(sa.String(300), nullable=True, default="pending")
    notes:str = sa.Column(sa.String(300), nullable=True)



def __repr__(self):
    return "<work_shift_user {}>".format(self.id_work_shift_user)

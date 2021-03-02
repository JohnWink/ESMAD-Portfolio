import sqlalchemy as sa
import sqlalchemy.orm as orm
from models.modelbase import SqlAlchemyBase
from sqlalchemy import exc

factory = None


def global_init(db_file: str, db_url: str):
    global factory


    if factory:
        return
    if not db_file or not db_file.strip():
        raise Exception("You must specify a db file")


    try:
        conn_str = db_url
        engine = sa.create_engine(conn_str, echo=True)
        engine.connect()

    except exc.SQLAlchemyError:
        pass
        conn_str = 'sqlite:///' + db_file.strip()
        engine = sa.create_engine(conn_str, echo=True)


    #engine = sa.create_engine(conn_str, echo=True)

    factory = orm.sessionmaker(bind=engine)


    # noinspection PyUnresolvedReferences
    import models.all_models

    SqlAlchemyBase.metadata.create_all(engine)
    print("working so far here")

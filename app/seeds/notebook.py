from app.models import db, Notebook, environment, SCHEMA


def seed_notebook():
    notebook1 = Notebook(
        user_id=1, title='Test Notebook')
    notebook2 = Notebook(
        user_id=2, title='Demo Notebook')
    notebook3 = Notebook(
        user_id=3, title='Example Notebook')

    db.session.add(notebook1)
    db.session.add(notebook2)
    db.session.add(notebook3)
    db.session.commit()


def undo_notebook():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notebooks")

    db.session.commit()

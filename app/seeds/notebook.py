from app.models import db, Notebook, environment, SCHEMA


def seed_notebook():
    notebook1 = Notebook(
        user_id=1, title='Default Notebook', is_default=True)
    notebook2 = Notebook(
        user_id=1, title='Demo Notebook')
    notebook3 = Notebook(
        user_id=1, title='Example Notebook')
    notebook4 = Notebook(
        user_id=1, title='Test2 Notebook')

    notebook5 = Notebook(
        user_id=2, title='Demo2 Notebook', is_default=True)
    notebook6 = Notebook(
        user_id=2, title='Example2 Notebook')
    notebook7 = Notebook(
        user_id=2, title='Test3 Notebook')
    notebook8 = Notebook(
        user_id=2, title='Demo3 Notebook')

    notebook9 = Notebook(
        user_id=3, title='Example3 Notebook', is_default=True)
    notebook10 = Notebook(
        user_id=3, title='Test4 Notebook')
    notebook11 = Notebook(
        user_id=3, title='Demo4 Notebook')
    notebook12 = Notebook(
        user_id=3, title='Example4 Notebook')

    db.session.add(notebook1)
    db.session.add(notebook2)
    db.session.add(notebook3)
    db.session.add(notebook4)
    db.session.add(notebook5)
    db.session.add(notebook6)
    db.session.add(notebook7)
    db.session.add(notebook8)
    db.session.add(notebook9)
    db.session.add(notebook10)
    db.session.add(notebook11)
    db.session.add(notebook12)
    db.session.commit()


def undo_notebook():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notebooks")

    db.session.commit()

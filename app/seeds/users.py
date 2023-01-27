from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    pickle = User(
        username='pickle', email='pickle@aa.io', password='password')
    daisy = User(
        username='daisy', email='daisy@aa.io', password='password')
    bella = User(
        username='bella', email='bella@aa.io', password='password')

    db.session.add(pickle)
    db.session.add(daisy)
    db.session.add(bella)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()

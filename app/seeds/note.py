from app.models import db, Note, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_notes():
    note1 = Note(
        user_id=1, notebook_id=1, title="learn JS", body="start with the functions and objects and move on with loops")

    note2 = Note(
        user_id=1, notebook_id=1, title="Travel list", body="best islands to visit in the world")

    note3 = Note(
        user_id=1, notebook_id=1, title="Dog Breeds", body="Dog breeds that won't shed too much, and are good with kids")

    note4 = Note(
        user_id=2, notebook_id=1, title="Perfume list", body=" list of perfumes that are good for summer")

    note5 = Note(
        user_id=2, notebook_id=1, title="Jokes", body="funny jokes to tell your friends")

    note6 = Note(
        user_id=3, notebook_id=1, title="under 5 min breakfast", body="overnight oats, smoothies, and more")

    note7 = Note(
        user_id=3, notebook_id=1, title="wine collection", body="chardonay, merlot, and more")


    notes = [note1, note2, note3, note4, note5, note6, note7]
    [db.session.add(note)for note in notes]
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

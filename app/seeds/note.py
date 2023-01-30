from app.models import db, Note, environment, SCHEMA


# Adds a demo notes, you can add other notes here if you want
def seed_notes():
    #user-1
    note1 = Note(
        user_id=1, notebook_id=1, title="learn JS", body="start with the functions and objects and move on with loops")
    note2 = Note(
        user_id=1, notebook_id=1, title="Travel list", body="best islands to visit in the world")
    note3 = Note(
        user_id=1, notebook_id=1, title="Dog Breeds", body="Dog breeds that won't shed too much, and are good with kids")
    note4 = Note(
        user_id=1, notebook_id=4, title="movie list", body=" list of movies that are good for summer")
    note5 = Note(
        user_id=1, notebook_id=2, title="cleaning", body="clean the house, go to the gym, and more")
    note6 = Note(
        user_id=1, notebook_id=2, title="python tasks", body="list of python tasks to do")

    #user-2
    note7 = Note(
        user_id=2, notebook_id=5, title="cat Breeds", body="cat breeds that are good with kids")
    note8 = Note(
        user_id=2, notebook_id=6, title="Perfume list", body=" list of perfumes that are good for summer")
    note9 = Note(
        user_id=2, notebook_id=7, title="Jokes", body="funny jokes to tell your friends")
    note10 = Note(
        user_id=2, notebook_id=8, title="under 5 min breakfast", body="overnight oats, smoothies, and more")

    #user-3
    note11 = Note(
        user_id=3, notebook_id=9, title="wine collection", body="chardonay, merlot, and more")
    note12 = Note(
        user_id=3, notebook_id=10, title="to do for the day", body="clean the house, go to the gym, and more")
    note13 = Note(
        user_id=3, notebook_id=10, title=" css cheat sheets", body=" css flexbox, grid, and more")


    notes = [note1, note2, note3, note4, note5, note6, note7, note8, note9, note10, note11, note12, note13]
    [db.session.add(note)for note in notes]
    db.session.commit()


def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM notes")

    db.session.commit()

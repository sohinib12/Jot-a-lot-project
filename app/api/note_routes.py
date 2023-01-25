from flask import Blueprint, Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_required, current_user
from app.models import db, Note

note_routes = Blueprint('notes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@note_routes.route('/')
@login_required
def get_all_notes():
    """
    Get all notes
    """
    notes = Note.query.filter(Note.user_id == current_user.id).all()
    return {"notes": [note.to_dict() for note in notes]}

@note_routes.route('/<int:id>')
@login_required
def get_one_note(id):
    """
    Get one note
    """
    note = Note.query.get(id)
    return note.to_dict()

@note_routes.route('/', methods=['POST'])
@login_required
def create_note():
    """
    Create a note
    """
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note = Note(
            title=form.data['title'],
            content=form.data['content'],
            user_id=current_user.id,
            notebook_id=form.data['notebook_id']
        )
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@note_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_note(id):
    """
    Update a note
    """
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        note = Note.query.get(id)
        note.title = form.data['title']
        note.content = form.data['content']
        note.notebook_id = form.data['notebook_id']
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@note_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
    """
    Delete a note
    """
    note = Note.query.get(id)
    db.session.delete(note)
    db.session.commit()
    return {'message': 'Note deleted'}

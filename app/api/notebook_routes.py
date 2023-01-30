from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Notebook
from app.forms import NotebookForm


noteBook_routes = Blueprint('notebooks', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@noteBook_routes.route('/')
@login_required
def get_all_notebooks():
    """
    Get all notebooks
    """
    notebooks = Notebook.query.filter(
        Notebook.user_id == current_user.id).all()
    return {"notebooks": [notebook.to_dict() for notebook in notebooks]}


@noteBook_routes.route('/<int:id>')
@login_required
def get_one_notebook(id):
    """
    Get one notebook
    """
    notebook = Notebook.query.get(id)
    if current_user.id != notebook.user_id:
        return {'error': 'Unauthorized'}, 401

    notes = [note.to_dict() for note in notebook.notes]

    if not notebook:
        return {'error': 'Notebook was not found'}, 404

    return jsonify({
        'Notebook': {
            'id': notebook.id,
            'title': notebook.title,
            'created_at': notebook.created_at,
            'updated_at': notebook.updated_at,
            'notes': notes
        }})


@noteBook_routes.route('/', methods=['POST'])
@login_required
def create_notebook():
    """
    Create a notebook
    """
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        notebook = Notebook(
            title=form.data['title'],
            user_id=current_user.id,
        )
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 405


@noteBook_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_notebook(id):
    """
    Update a notebook
    """
    notebook = Notebook.query.get(id)
    print("notebookId", notebook)
    if current_user.id != notebook.user_id:
        return {'error': 'You are not the owner'}, 405
    if not notebook:
        return {'error': 'Not found'}, 402
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        notebook.title = form.data['title']
        db.session.commit()
        return notebook.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@noteBook_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_notebook(id):
    """
    Delete a notebook
    """
    notebook = Notebook.query.get(id)
    if current_user.id != notebook.user_id:
        return {'error': 'Unauthorized'}, 401
    if not notebook:
        return {'error': 'Notebook not found'}, 404
    db.session.delete(notebook)
    db.session.commit()
    return {'message': 'Notebook deleted'}

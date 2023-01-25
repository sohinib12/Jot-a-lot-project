from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length

class NoteForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()], Length(min=1, max=255))
    body = TextAreaField('body')
    notebook_id = IntegerField('notebook_id')

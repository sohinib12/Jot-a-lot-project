from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class ScratchpadForm(FlaskForm):
    content = TextAreaField('content', validators=[DataRequired(), Length(min=1, max=1000)])

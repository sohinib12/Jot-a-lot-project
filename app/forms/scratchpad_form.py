from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class ScratchpadForm(FlaskForm):
    content = TextAreaField('content', validators=[ Length(min=0, max=1000)])

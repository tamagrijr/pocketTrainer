from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from app.models import Workout


class CreateWorkoutForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    exampleLink = StringField('exampleLink')
    public = BooleanField('public', validators=[DataRequired()])

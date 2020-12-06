from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Workout, Category, db

workout_routes = Blueprint('workouts', __name__)


@workout_routes.route('/')
# @login_required
def workouts():
    workouts = Workout.query.all()
    return {"workouts": [workout.to_dict() for workout in workouts]}


@workout_routes.route('/categories')
# @login_required
def categories():
  categories = Category.query.all()
  return { 'categories': [category.to_dict() for category in categories]}


@workout_routes.route('/user/<int:id>')
# @login_required
def userWorkouts(id):
  userWorkouts = Workout.query.filter(Workout.userId == id).all()
  return { 'userWorkouts': [workout.to_dict() for workout in userWorkouts]}

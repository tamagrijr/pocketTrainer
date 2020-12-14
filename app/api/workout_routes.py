from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Workout, Category, db
from app.forms import CreateWorkoutForm

workout_routes = Blueprint('workouts', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@workout_routes.route('/')
# @login_required
def workouts():
    workouts = Workout.query.all()
    return {"workouts": [workout.to_dict() for workout in workouts]}


@workout_routes.route('/categories')
# @login_required
def categories():
    categories = Category.query.all()
    return {'categories': [category.to_dict() for category in categories]}


@workout_routes.route('/user/<int:id>/get')
# @login_required
def userWorkouts(id):
    userWorkouts = Workout.query.filter(Workout.userId == id).all()
    return {'userWorkouts': [workout.to_dict() for workout in userWorkouts if workout.removed == False]}


@workout_routes.route('/approved')
# @login_required
def approved_workoutes():
    approved_workoutes = Workout.query.filter(Workout.approved == True).all()
    return {'approvedWorkouts': [workout.to_dict() for workout in approved_workoutes if workout.removed == False]}


@workout_routes.route('/categories')
# @login_required
def workoutCategories():
  categories = Category.query.all()
  return [category.to_dict() for category in categories]


@workout_routes.route('user/<int:id>/create', methods=['GET', 'POST'])
# @login_required
def createWorkout(id):
    req_data = request.get_json()
    form = CreateWorkoutForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form['name'].data = req_data['name']
    form['description'].data = req_data['description']
    form['exampleLink'].data = req_data['exampleLink']
    form['public'].data = req_data['public']
    if form.validate_on_submit():
        workout = Workout(
            name=form.data['name'],
            userId=id,
            description=form.data['description'],
            exampleLink=form.data['exampleLink'],
            public=form.data['public'],
            categoryId=req_data['categoryId']
        )
        db.session.add(workout)
        db.session.commit()
        return workout.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@workout_routes.route('user/<int:userId>/workout/<int:workoutId>/update', methods=['GET', 'PUT'])
# @login_required
def updateWorkout(userId, workoutId):
    try:
        workout = Workout.query.get(workoutId)
        req_data = request.get_json()
        form = CreateWorkoutForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        form['name'].data = req_data['name']
        form['description'].data = req_data['description']
        form['exampleLink'].data = req_data['exampleLink']
        form['public'].data = req_data['public']
        if form.validate_on_submit():
            workout.name = form['name'].data
            workout.description = form['description'].data
            workout.exampleLink = form['exampleLink'].data
            workout.public = form['public'].data
            workout.categoryId = req_data['categoryId']
            db.session.add(workout)
            db.session.commit()
            return workout.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}
    except:
        return "Workout Does Not Exist"


@workout_routes.route('user/<int:userId>/workout/<int:workoutId>/delete', methods=['GET', 'PUT'])
# @login_required
def delete_workout(userId, workoutId):
  try:
    workout = Workout.query.get(workoutId)
    workout.removed=True
    workout.public=False
    db.session.add(workout)
    db.session.commit()
    return "Successfully Deleted Workout"
  except:
    return "Workout Does Not Exists"

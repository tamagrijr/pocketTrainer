from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Routine, Upvote, Session, Exercise, UserRoutine, UserSession, UserExercise

routine_routes = Blueprint('routines', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@routine_routes.route('/')
# @login_required
def routines():
    routines = Routine.query.all()
    return {"routines": [routine.to_dict() for routine in routines]}


@routine_routes.route('/user/<int:id>')
# @login_required
def userRoutines(id):
    user_routines = UserRoutine.query.filter(
        UserRoutine.userId == id, UserRoutine.removed != True).all()
    return {
        'user_routines': [user_routine.to_dict() for user_routine in user_routines]
    }


@routine_routes.route('/user/<int:userId>/routine/<int:routineId>/upvote')
# @login_required
def upvote(userId, routineId):
    try:
        upvote = Upvote.query.filter(
            Upvote.userId == userId, Upvote.routineId == routineId).one()
        db.session.delete(upvote)
        db.session.commit()
        return "Downvoted"
    except:
        upvote = Upvote(
            userId=userId,
            routineId=routineId
        )
        db.session.add(upvote)
        db.session.commit()
        return "Upvoted"


@routine_routes.route('/user/<int:userId>/routine/<int:routineId>/follow')
# @login_required
def follow(userId, routineId):
    try:
        user_routine = UserRoutine.query.filter(
            UserRoutine.userId == userId, UserRoutine.routineId == routineId).one()
        db.session.delete(user_routine)
        db.session.commit()
        return "Unfollowed"
    except:
        user_routine = UserRoutine(
            userId=userId,
            routineId=routineId
        )
        db.session.add(user_routine)
        db.session.commit()
        return "Followed"


@routine_routes.route('/user/<int:userId>/routine/<int:routineId>/remove')
# @login_required
def remove_routine(userId, routineId):
    try:
        routine = Routine.query.get(routineId)
        user_routine = UserRoutine.query.filter(UserRoutine.userId == userId, UserRoutine.routineId == routineId).one()
        routine.removed = True
        db.session.delete(user_routine)
        db.session.commit()
        return "Routine Removed"
    except:
        return "Failed to Remove Routine"


@routine_routes.route('/user/<int:userId>/routine/<int:routineId>/set_active')
# @login_required
def set_active_routine(userId, routineId):
    try:
        try:
            active_routine = UserRoutine.query.filter(UserRoutine.userId == userId, UserRoutine.active == True).one()
            active_routine.active = False
            db.session.commit()
        except:
            pass
        new_active_routine = UserRoutine.query.filter(UserRoutine.userId == userId, UserRoutine.routineId == routineId).one()
        new_active_routine.active = True
        db.session.commit()
        return "Successfully Set Active Routine"
    except:
        return "Failed to Activate Routine"


@routine_routes.route('/user/<int:userId>/routine/<int:routineId>/set_inactive')
# @login_required
def deactivate_routine(userId, routineId):
    try:
        active_routine = UserRoutine.query.filter(UserRoutine.userId == userId, UserRoutine.active == True).one()
        active_routine.active = False
        db.session.commit()
        return "Successful Deactivation"
    except:
        return "Failed To Deactivate"


@routine_routes.route('/routine/<int:routineId>/view')
# @login_required
def routine_view(routineId):
    try:
        routine = Routine.query.get(routineId)
        return routine.to_dict()
    except:
        return "Failed To Load Routine Data"

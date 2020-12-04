from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

test_routes = Blueprint('test', __name__)

@test_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@test_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

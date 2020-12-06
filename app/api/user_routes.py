from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Follow, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/profile_info')
# @login_required
def profile_info(id):
    user = User.query.get(id)
    return user.profile_info()


@user_routes.route('/<int:id>/edit_profile', methods=['GET', 'PUT'])
# @login_required
def edit_profile(id):
    user = User.query.get(id)
    req_data = request.get_json()
    user.username = req_data['username']
    user.avatar = req_data['ava']
    user.bio = req_data['bio']
    user.email = req_data['email']
    user.faceBook = req_data['fb']
    user.insta = req_data['ig']
    user.youTube = req_data['yt']
    db.session.add(user)
    db.session.commit()
    return user.profile_info()


@user_routes.route('follower/<int:followerId>/following/<int:followingId>/follow')
# @login_required
def follow(followerId, followingId):
    try:
        checkFollow = Follow.query.filter(Follow.followerId == followerId, Follow.followingId == followingId).one()
        if checkFollow:
            return "Already Following"
    except:
        follow = Follow(
            followerId=followerId,
            followingId=followingId,
        )
        db.session.add(follow)
        db.session.commit()
        return follow.to_dict()


@user_routes.route('follower/<int:followerId>/following/<int:followingId>/unfollow')
# @login_required
def unFollow(followerId, followingId):
    try:
        follow = Follow.query.filter(Follow.followerId == followerId, Follow.followingId == followingId).one()
        db.session.delete(follow)
        db.session.commit()
        return "Deleted"
    except:
        return "Not Following"

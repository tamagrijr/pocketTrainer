export const SET_CURRENT_USER_WORKOUTS = 'SET_CURRENT_USER_WORKOUTS'
export const SET_WORKOUT_CATEGORIES = 'SET_WORKOUT_CATEGORIES'

export const setUserWorkouts = (workouts) => {
  return { type: SET_CURRENT_USER_WORKOUTS, workouts };
};
export const setWorkoutCategories = (categories) => {
  return { type: SET_WORKOUT_CATEGORIES, categories }
}

export const fetchWorkoutCategories = async () => {
  const response = await fetch('/api/workouts/categories', {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json()
  return result;
}

export const fetchUserWorkouts = async (id) => {
  const response = await fetch(`/api/workouts/user/${id}/get`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER_WORKOUTS: {
      return {
        ...state,
        ...action.workouts,
      };
    }
    case SET_WORKOUT_CATEGORIES: {
      return {
        ...state,
        ...action.categories,
      };
    }
    default:
      return state;
  }
}

export const SET_CURRENT_USER_WORKOUTS = 'SET_CURRENT_USER_WORKOUTS'

export const setUserWorkouts = (workouts) => {
  return { type: SET_CURRENT_USER_WORKOUTS, workouts };
};

export const fetchUserWorkouts = async (id) => {
  const response = await fetch(`/api/workouts/user/${id}`, {
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
    default:
      return state;
  }
}

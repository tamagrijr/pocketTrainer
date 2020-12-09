export const SET_CURRENT_USER_ROUTINES = 'SET_CURRENT_USER_ROUTINES'
export const SET_ROUTINE_VIEW = 'SET_ROUTINE_VIEW'

export const setUserRoutines = (routines) => {
  return { type: SET_CURRENT_USER_ROUTINES, routines };
};
export const setRoutineView = (routine) => {
  return { type: SET_ROUTINE_VIEW, routine}
}

export const fetchUserRoutines = async (id) => {
  const response = await fetch(`/api/routines/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json()
  return result;
}
export const fetchRoutineView = async (id) => {
  const response = await fetch(`/api/routines/routine/${id}/view`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json()
  return result
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER_ROUTINES: {
      return {
        ...state,
        ...action.routines,
      };
    }
    case SET_ROUTINE_VIEW: {
      return {
        ...state,
        'routine_view': action.routine
      }
    }
    default:
      return state;
  }
}

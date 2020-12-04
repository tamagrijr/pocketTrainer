export const SET_CURRENT_PROFILE = 'SET_CURRENT_PROFILE'

export const setCurrentProfile = (user) => {
  return { type: SET_CURRENT_PROFILE, user}
};

export const fetchCurrentProfile = async (id) => {
  const response = await fetch(`/api/users/${id}/profile_info`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_PROFILE: {
      return{
        ...state,
        ...action.user
      }
    }
    default:
      return state;
  }
}

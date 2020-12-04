export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = (user) => {
  return { type: SET_CURRENT_USER, user };
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        ...action.user,
      };
    }
    default:
      return state;
  }
}

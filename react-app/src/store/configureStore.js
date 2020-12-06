import { createStore, combineReducers, compose } from "redux";
// import thunk from "redux-thunk";
import user from "./user";
import profile from './profile';
import workouts from './workout';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  user,
  profile,
  workouts,
});

const configureStore = (initialState) => {
  return createStore(reducer, initialState, composeEnhancers());
};

export default configureStore;

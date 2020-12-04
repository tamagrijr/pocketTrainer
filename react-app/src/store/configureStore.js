import { createStore, applyMiddleware, combineReducers, compose } from "redux";
// import thunk from "redux-thunk";
import user from "./user";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  user,
});

const configureStore = (initialState) => {
  return createStore(reducer, initialState, composeEnhancers());
};

export default configureStore;

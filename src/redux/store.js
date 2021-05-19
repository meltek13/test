import { createStore, combineReducers } from "redux";
import userReducer from "./usersLog/userReducer";
import currentUserReducer from "./usersLog/currentUserReduce";

const allReducers = combineReducers({
  currentUserReducer,
  userReducer,
});

const Store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;

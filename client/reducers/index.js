import { combineReducers } from "redux";
import {currentUser, IssuesInfo, imgReducer} from "./currentUser";

const rootReducer = combineReducers({
  currentUser,
  IssuesInfo,
  imgReducer
});

export default rootReducer;
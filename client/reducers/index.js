import { combineReducers } from "redux";
import {currentUser, IssuesInfo} from "./currentUser";




const rootReducer = combineReducers({
  currentUser,
  IssuesInfo
});

export default rootReducer;
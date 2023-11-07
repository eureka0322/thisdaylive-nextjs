import { combineReducers } from "redux";
import accountRedcer from "./accountRedcer";

export default combineReducers({
  account: accountRedcer,
});

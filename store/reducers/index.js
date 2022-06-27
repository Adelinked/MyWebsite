import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";
import userReducer from "./userReducer";
import appReducer from "./appReducer";

export default combineReducers({
  projects: projectsReducer,
  user: userReducer,
  app: appReducer,
});

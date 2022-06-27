import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import projectsReducer from "./projectsReducer";
import userReducer from "./userReducer";
import appReducer from "./appReducer";

export default combineReducers({
  cart: cartReducer,
  projects: projectsReducer,
  user: userReducer,
  app: appReducer,
});

import { LOADING_APP, FIX_NAV_BAR } from "../types";

const initialState = {
  loading: false,
  fixNavBar: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_APP:
      return {
        ...state,
        loading: action.payload,
      };
    case FIX_NAV_BAR:
      return {
        ...state,
        fixNavBar: action.payload,
      };
    default:
      return state;
  }
}

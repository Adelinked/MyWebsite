export const setAppLoading = (loading) => async (dispatch) => {
  dispatch({ type: "LOADING_APP", payload: loading });
};

export const setNavBar = (fixed) => async (dispatch) => {
  dispatch({ type: "FIX_NAV_BAR", payload: fixed });
};

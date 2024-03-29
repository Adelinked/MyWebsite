export const setProject = (p, id) => async (dispatch) => {
  dispatch({ type: p, payload: id });
};

export const setCurrProject = (id) => async (dispatch) => {
  dispatch({ type: "SET_CURR_PROJECT", payload: id });
};


export const setInitProjects = (projects) => async (dispatch) => {
  dispatch({ type: "SET_INIT_PROJECTS", payload: projects });
};

export const setProjects = (projects) => async (dispatch) => {

  dispatch({ type: "SET_PROJECTS", payload: projects });
};

export const setFilter = (filter) => async (dispatch) => {
  dispatch({ type: "SET_FILTER", payload: filter });
};

export const clearFilter = () => async (dispatch) => {
  dispatch({ type: "CLEAR_FILTER" });
};

export const setSort = (sort) => async (dispatch) => {
  dispatch({ type: "SET_SORT", payload: sort });
};

export const setProjectsDisplay = (display) => async (dispatch) => {
  dispatch({ type: "SET_PROJECTS_DISPLAY", payload: display });
};

export const loadingProjects = () => async (dispatch) => {
  dispatch({ type: "LOADING_PROJECTS", payload: [] });
};

export const showPrjCmd = (showCmd) => async (dispatch) => {
  dispatch({ type: "SHOW_CMD", payload: showCmd });
};

export const showMorePrj = () => async (dispatch) => {
  dispatch({ type: "SHOW_MORE", payload: [] });
};

export const setProjectsNumLoad = (projectsNumberLoad) => async (dispatch) => {
  dispatch({ type: "PROJECTS_NUM_LOAD", payload: projectsNumberLoad });
};

export const fetchProjects = (p) => async (dispatch) => {
  dispatch(loadingCart());
  //const url = p === 1 ? "http://localhost:3000/api/" : "./api/";
  //const url = "http://localhost:3000/api/products";
  const url = "https://fakestoreapi.com/products";
  const response = await fetch(url);
  const cart = await response.json();

  dispatch({ type: "FETCH_PROJECTS", payload: projects });
};

import {
  LOADING_PROJECTS,
  FETCH_PROJECTS,
  SET_INIT_PROJECTS,
  SET_PROJECTS,
  REMOVE_PROJECT,
  CLEAR_PROJECTS,
  SET_CURR_PROJECT,
  SET_SORT,
  SET_PROJECTS_DISPLAY,
  SET_FILTER,
  CLEAR_FILTER,
  SHOW_CMD,
  SHOW_MORE,
  PROJECTS_NUM_LOAD,
} from "../types";

const initialState = {
  loading: false,
  initProjectsData: [],
  projects: [],
  show: false,
  current: "",
  display: null,
  sort: "0",
  filter: { title: "", category: "" },
  showCmd: false,
  showMore: false,
  projectsNumLoad: 3,

};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_PROJECTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROJECTS:
      return {
        ...state,
        loading: false,
        projects: action.payload,
      };
    case SET_INIT_PROJECTS:
      return {
        ...state,
        initProjectsData: action.payload,
      };
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };

    case SET_SORT:
      return {
        ...state,
        sort: action.payload,
      };

    case SET_PROJECTS_DISPLAY:
      return { ...state, display: action.payload };

    case SET_FILTER /* moved the filter logic to apply it locally */:
      /*let newFiltredProd = [...state.products];
      const { title, category, price } = action.payload;
      if (title) {
        newFiltredProd = newFiltredProd.filter((i) =>
          i.title.toLowerCase().includes(title.toLowerCase())
        );
      }
      if (category && category.length > 0) {
        newFiltredProd = newFiltredProd.filter((i) => i.category === category);
      }
      if (price > 0) {
        newFiltredProd = newFiltredProd.filter((i) => i.price <= price);
      }*/
      return {
        ...state,
        filter: action.payload,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filter: { title: "", category: "" },
      };
    case REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((i) => i.id !== action.payload),
      };

    case CLEAR_PROJECTS:
      return {
        ...state,
        projects: [],
      };

    case SET_CURR_PROJECT:
      return {
        ...state,
        current: action.payload,
      };
    case SHOW_CMD:
      return {
        ...state,
        showCmd: action.payload,
      };

    case SHOW_MORE:
      return {
        ...state,
        showMore: !state.showMore,
      };
    case PROJECTS_NUM_LOAD:
      return {
        ...state,
        projectsNumLoad: action.payload,
      };

    default:
      return state;
  }
}

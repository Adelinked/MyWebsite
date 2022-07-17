import {
  LOADING_PROJECTS,
  FETCH_PROJECTS,
  SET_PROJECTS,
  REMOVE_PROJECT,
  CLEAR_PROJECTS,
  SET_CURR_PROJECT,
  SORT_PROJECTS,
  SET_PROJECTS_DISPLAY,
  SET_FILTER,
  CLEAR_FILTER,
  SHOW_CMD,
} from "../types";

const initialState = {
  loading: false,
  projects: [],
  filtredProjects: [],
  show: false,
  current: "",
  display: null,
  sort: "0",
  filter: { title: "", category: "" },
  showCmd: true,
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
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case SORT_PROJECTS:
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
        showCmd: !state.showCmd,
      };

    default:
      return state;
  }
}

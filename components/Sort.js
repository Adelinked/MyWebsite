import { useDispatch, useSelector } from "react-redux";
import { setSort, setProjects } from "../store/actions/projectsAction";
import { sortProjects, filterProjects } from "../utils/functions";

export default () => {
  const dispatch = useDispatch();
  const { sort, projects, initProjectsData } = useSelector((state) => state.projects);

  const handleChange = (e) => {
    const newSort = e.target.value;
    dispatch(setSort(newSort));
    if (newSort !== "0")
      dispatch(setProjects(sortProjects(projects, newSort)))
    else
      dispatch(setProjects(sortProjects(projects, 0, initProjectsData)))
  }
  return (
    <>
      <label>
        Sort:
        <select
          onChange={handleChange}
          value={sort}
          style={{ margin: "0 5px" }}
        >
          <option value="0">None</option>
          <option value="1">By Name (A/Z)</option>
          <option value="2">By Name (Z/A)</option>
        </select>
      </label>
    </>
  );
};

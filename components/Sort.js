import { useDispatch, useSelector } from "react-redux";
import { sortProjects } from "../store/actions/projectsAction";

export default () => {
  const dispatch = useDispatch();
  const { sort } = useSelector((state) => state.projects);
  return (
    <>
      <label>
        Sort:
        <select
          onChange={(e) => {
            dispatch(sortProjects(e.target.value));
          }}
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

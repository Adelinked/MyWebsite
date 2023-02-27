import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearFilter, setProjects } from "../../store/actions/projectsAction";
import styles from "./Filter.module.css";
import { sortProjects, filterProjects } from "../../utils/functions";

export default () => {
  const { filter, initProjectsData, projects, sort, projectsNumLoad } = useSelector(
    (state) => state.projects
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;

    const name = target.name;
    dispatch(setFilter({ ...filter, [name]: value, }));

    const newFilter = { [name]: value };
    let rendred = filterProjects(projects, newFilter);
    rendred = rendred.length >= projectsNumLoad ? rendred : filterProjects(initProjectsData, newFilter).slice(0, projectsNumLoad);
    rendred = sortProjects(rendred, sort);
    dispatch(setProjects(rendred));
  };

  const categories = initProjectsData
    .reduce((acc, curr) => {
      acc.push(...curr.categories);
      return acc;
    }, [])
    .reduce((acc, curr) => {
      if (acc.indexOf(curr) < 0) {
        acc.push(curr);
      }
      return acc;
    }, []);



  return (
    <div className={styles.filterContainer}>
      <label className={styles.formLabel}> Filters:</label>

      <form
        className={styles.filterForm}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          className="search"
          name="title"
          type="text"
          placeholder="Search"
          label="Title"
          id="title"
          value={filter.title}
          onChange={handleChange}

        />

        {categories && categories.length > 0 && (
          <>
            <label style={{ display: "block" }}>
              Category:
              <select
                onChange={handleChange}
                name="category"
                id="category"
                value={filter.category}
              >
                <option value="all">All</option>
                <>{categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                </>
              </select>
            </label>
          </>
        )}
        <button
          className={styles.clearFilter}
          onClick={() => {
            dispatch(clearFilter());
            dispatch(setProjects(sortProjects(initProjectsData.slice(0, projectsNumLoad)), sort))
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

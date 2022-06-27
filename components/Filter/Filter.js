import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearFilter } from "../../store/actions/projectsAction";
import styles from "./Filter.module.css";
export default () => {
  const { filter, filtredProjects, projects } = useSelector(
    (state) => state.projects
  );
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;

    const name = target.name;
    dispatch(
      setFilter({
        ...filter,
        [name]: value,
      })
    );
  };

  const categories = projects
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
                <option value="">All</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}
        <button
          className={styles.clearFilter}
          onClick={() => {
            dispatch(clearFilter());
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

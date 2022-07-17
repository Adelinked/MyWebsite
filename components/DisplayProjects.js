import { useDispatch, useSelector } from "react-redux";
import { setProjectsDisplay } from "../store/actions/projectsAction";
import styles from "../styles/Projects.module.css";
import { useLocalStorageValue } from "@mantine/hooks";
import { FaWindows, FaList } from "react-icons/fa";

export default () => {
  const dispatch = useDispatch();
  const { display } = useSelector((state) => state.projects);
  const [displayLocal, setDisplayLocal] = useLocalStorageValue({
    key: "display",
  });
  return (
    <div>
      <span
        className={styles.displayBut}
        style={{
          color: display === "0" ? "var(--color-font)" : "",
          fontSize: display === "0" ? "3rem" : "",
        }}
        onClick={() => {
          dispatch(setProjectsDisplay("0"));
          setDisplayLocal({ display: "0" });
        }}
      >
        <FaWindows />
      </span>
      <span
        className={styles.displayBut}
        style={{
          color: display === "1" ? "var(--color-font)" : "",
          fontSize: display === "1" ? "3rem" : "",
        }}
        onClick={() => {
          dispatch(setProjectsDisplay("1"));
          setDisplayLocal({ display: "1" });
        }}
      >
        <FaList />
      </span>
    </div>
  );
};

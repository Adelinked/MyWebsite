import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import styles from "../styles/Projects.module.css";
import axios from "axios";
import Project from "../components/Project";
import Sort from "../components/Sort";
import DisplayProjects from "../components/DisplayProjects";
import { useDispatch, useSelector } from "react-redux";
import { setProjects, showPrjCmd } from "../store/actions/projectsAction";
import { useEffect, useState } from "react";
import Filter from "../components/Filter/Filter";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, filter, display, sort, showCmd } = useSelector(
    (state) => state.projects
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const url = "./api?d=projects";
        const data = await axios.get(url, { signal: controller.signal });
        dispatch(setProjects(data.data));
        setLoading(false);
        controller = null;
      } catch (e) {}
    })();
    return () => {
      controller?.abort();
    };
  }, []);

  let sortedProjects = [...projects];

  if (sort === "1") {
    /* A - Z */
    sortedProjects = sortedProjects.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  }
  if (sort === "2") {
    /* Z - A */
    sortedProjects = sortedProjects.sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
  }

  let filtredProjects = [...sortedProjects];

  const { title, category } = filter;
  if (title) {
    filtredProjects = filtredProjects.filter((i) =>
      i.title.toLowerCase().includes(title.toLowerCase())
    );
  }
  if (category && category.length > 0) {
    filtredProjects = filtredProjects.filter((i) =>
      i.categories.includes(category)
    );
  }

  return (
    <>
      <Head>
        <title>Adelinked | Projects</title>
        <meta name="description" content="Ecomerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <article className={styles.projectsPageDiv}>
        <h2 className={styles.projectHeroText}>My Projects</h2>

        <div className={styles.rightDiv}>
          {showCmd ? (
            <>
              {" "}
              <span className={styles.prjCmdSpan}>
                <span className={styles.prjCmdClose}>
                  <span
                    className="fa fa-close"
                    title="close filter box"
                    onClick={() => dispatch(showPrjCmd())}
                  />
                </span>
              </span>
              <div className={styles.sortDiv} id="cmdDiv">
                <Sort />
                <Filter />
                <DisplayProjects />
              </div>
            </>
          ) : (
            <span className={styles.prjCmdSpan}>
              <span className={styles.prjCmdOpen}>
                <span
                  className="fa fa-arrow-down"
                  title="show filters"
                  onClick={() => dispatch(showPrjCmd())}
                />
              </span>
            </span>
          )}

          {!loading && (
            <>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "2.2rem",
                  color: "var(--color-font)",
                }}
              >
                {filtredProjects.length > 0
                  ? "Displayed: " + filtredProjects.length
                  : "No Projects to display"}
              </div>

              <div
                className={
                  display === "0"
                    ? styles.projectsContainer
                    : styles.projectsDetailed
                }
              >
                {filtredProjects.map((p) => (
                  <Project key={p.id} {...p} />
                ))}
              </div>
            </>
          )}
          {loading && (
            <div className={styles.loading}>...loading, please wait</div>
          )}
        </div>
      </article>

      <Footer />
    </>
  );
};

export default Projects;

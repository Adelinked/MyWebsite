import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import styles from "../styles/Projects.module.css";
import Sort from "../components/Sort";
import DisplayProjects from "../components/DisplayProjects";
import { useDispatch, useSelector } from "react-redux";
import { setProjects, showPrjCmd } from "../store/actions/projectsAction";
import { useEffect } from "react";
import Filter from "../components/Filter/Filter";
import { useLocalStorageValue } from "@mantine/hooks";
import { setProjectsDisplay } from "../store/actions/projectsAction";
import { FaArrowDown, FaTimes } from "react-icons/fa";

import dynamic from "next/dynamic";

const Project = dynamic(() => import("../components/Project"), {
  ssr: false,
});

const Projects = ({ projectsData }) => {
  const dispatch = useDispatch();
  const { projects, filter, display, sort, showCmd } = useSelector(
    (state) => state.projects
  );

  useEffect(() => {
    dispatch(setProjects(projectsData));
  }, []);

  let sortedProjects = projects?.length > 0 ? [...projects] : [...projectsData];

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

  const [displayLocal, setDisplayLocal] = useLocalStorageValue({
    key: "display",
  });

  useEffect(() => {
    if (!display) dispatch(setProjectsDisplay(displayLocal?.display ?? "0"));
    if (!displayLocal) setDisplayLocal({ display: "0" });
  }, []);

  return (
    <>
      <Head>
        <title>Adelinked | Projects</title>
        <meta name="description" content="Ecomerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <article className={styles.projectsPageDiv}>
        <h2 className={styles.projectHeroText}>My Projects </h2>

        <div className={styles.rightDiv}>
          {showCmd ? (
            <>
              {" "}
              <span className={styles.prjCmdSpan}>
                <span className={styles.prjCmdClose}>
                  <FaTimes
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
                <FaArrowDown
                  title="show filters"
                  onClick={() => dispatch(showPrjCmd())}
                />
              </span>
            </span>
          )}

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
              {filtredProjects.map((p, index) => (
                <Project key={p.id} {...p} num={index} />
              ))}
            </div>
          </>
        </div>
      </article>

      <Footer />
    </>
  );
};

export default Projects;

export async function getStaticProps() {
  const projectsData = (await import("../data/projects")).projectsData;

  return { props: { projectsData: projectsData } };
}

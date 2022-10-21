import Head from "next/head";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo, useRef } from "react";
import { useLocalStorageValue } from "@mantine/hooks";
import { FaArrowDown, FaTimes } from "react-icons/fa";
import throttle from "lodash.throttle";

import Navbar from "../components/NavBar";
import Filter from "../components/Filter/Filter";
import Sort from "../components/Sort";
import DisplayProjects from "../components/DisplayProjects";
import Meta from "../components/Meta";
import useOnScreen from "../utils/useOnScreen";
import { getItemsNumber } from "../utils/functions";
import styles from "../styles/Projects.module.css";
import { setProjects, showPrjCmd } from "../store/actions/projectsAction";
import { setProjectsDisplay } from "../store/actions/projectsAction";

const Project = dynamic(() => import("../components/Project"), {
  ssr: false,
});
const Footer = dynamic(() => import("../components/Footer"), {
  ssr: false,
});

const Projects = ({ projectsData }) => {
  const [windowWidth, setWindowWidth] = useState();
  const [projectsNumLoad, setProjectsNumLoad] = useState();
  const [showMore, setShowMore] = useState(false);
  const bottomProjectsRef = useRef();
  const projectsBottomRefValue = useOnScreen(bottomProjectsRef);
  const dispatch = useDispatch();
  function loadMore() {
    const projectsLen = projects.length;
    dispatch(
      setProjects([
        ...projects,
        ...projectsData.slice(projectsLen, projectsLen + projectsNumLoad),
      ])
    );
  }

  useEffect(() => {
    if (projects == null || projects.length === projectsData.length) return;
    if (showMore && projectsBottomRefValue) {
      loadMore();
    }
  }, [projectsBottomRefValue]);

  useEffect(() => {
    setWindowWidth(window?.innerWidth);
  }, []);

  useEffect(() => {
    setProjectsNumLoad(getItemsNumber(windowWidth));
  }, [windowWidth]);

  useEffect(() => {
    if (!windowWidth) return;
    if (projects && projects.length > 0) return;
    dispatch(setProjects(projectsData.slice(0, projectsNumLoad)));
    if (showMore && projectsBottomRefValue) {
      loadMore();
    }
  }, [projectsNumLoad]);

  const handleResize = () => {
    setWindowWidth(window?.innerWidth);
  };

  const throttleResizeHandler = useMemo(() => throttle(handleResize, 300));

  useEffect(() => {
    window.addEventListener("resize", throttleResizeHandler);
    return function cleanup() {
      throttleResizeHandler?.cancel();
      window.removeEventListener("resize", throttleResizeHandler);
    };
  });

  const { projects, filter, display, sort, showCmd } = useSelector(
    (state) => state.projects
  );

  /*useEffect(() => {
    dispatch(setProjects(projectsData));
  }, []);*/

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
      <Meta />
      <Head>
        <title>Adelinked | Projects</title>
        <meta name="description" content="Adelinked website - projects page" />
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
                    onClick={() => {
                      dispatch(showPrjCmd());
                    }}
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
        <button
          ref={bottomProjectsRef}
          style={{ margin: "20px 0" }}
          onClick={() => {
            setShowMore((showMore) => !showMore);
            if (!showMore) loadMore();
            else dispatch(setProjects(projectsData.slice(0, projectsNumLoad)));
          }}
        >
          {!showMore ? "More" : "Less"}
        </button>
      </article>

      <Footer refProp={bottomProjectsRef} />
    </>
  );
};

export default Projects;

export async function getStaticProps() {
  const projectsData = (await import("../data/projects")).projectsData;

  return { props: { projectsData: projectsData } };
}

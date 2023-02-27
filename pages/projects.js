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
import { getItemsNumber, sortProjects, filterProjects } from "../utils/functions";
import styles from "../styles/Projects.module.css";
import {
  setInitProjects,
  setProjects,
  showPrjCmd,
  showMorePrj,
  setProjectsDisplay,
  setProjectsNumLoad
} from "../store/actions/projectsAction";
const Project = dynamic(() => import("../components/Project"), {
  ssr: false,
});
const Footer = dynamic(() => import("../components/Footer"), {
  ssr: false,
});

import { FaGithubSquare } from "react-icons/fa";
import { MY_GITHUB } from "../data/variables";

const Projects = ({ projectsData }) => {
  const [windowWidth, setWindowWidth] = useState();

  const bottomProjectsRef = useRef();
  const projectsBottomRefValue = useOnScreen(bottomProjectsRef);

  const dispatch = useDispatch();
  const { projects, filter, display, sort, showCmd, showMore, projectsNumLoad } =
    useSelector((state) => state.projects);


  useEffect(() => {
    if (projects == null || projects.length === projectsData.length) return;
    if (showMore && projectsBottomRefValue) {
      loadMore();
    }
  }, [projectsBottomRefValue]);

  useEffect(() => {
    setWindowWidth(window?.innerWidth);
    dispatch(setInitProjects(projectsData));
    loadInitProjects();
  }, []);

  useEffect(() => {
    dispatch(setProjectsNumLoad(getItemsNumber(windowWidth) ?? 3));
  }, [windowWidth]);

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

  function loadMore() {
    let newData;
    const previous = filterProjects(projects, filter);
    newData = [
      ...previous,
      ...filterProjects(projectsData.filter(i => !previous.includes(i)), filter).slice(0, projectsNumLoad),
    ]
    newData = sortProjects(newData, sort);
    dispatch(setProjects(newData));
  }

  const handleShowButton = () => {
    dispatch(showMorePrj());
    if (!showMore) loadMore();
    else
      loadInitProjects();
  }

  const handleShowCmd = () => {

    dispatch(showPrjCmd(!showCmd))
    const mylocalStorage = JSON.parse(localStorage.getItem("Adelinked"))

    localStorage.setItem("Adelinked", JSON.stringify({ ...mylocalStorage, showCmd: !showCmd }));
  }

  const loadInitProjects = () => {
    let initprojects = filterProjects(projectsData, filter);
    initprojects = sortProjects(initprojects, sort).slice(0, projectsNumLoad ?? 3);
    dispatch(setProjects(initprojects));
  }
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
                    onClick={handleShowCmd}
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
                  onClick={handleShowCmd}
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
              {projects?.length > 0
                ? "Displayed: " + projects?.length
                : "No Projects to display"}
            </div>

            <div
              className={
                display === "0"
                  ? styles.projectsContainer
                  : styles.projectsDetailed
              }
            >
              {projects?.map((p) => (
                <Project key={p.id} {...p} />
              ))}
            </div>
          </>
        </div>
        {
          <div className={styles.showAndGithub}>

            {(projects.length <= projectsNumLoad && projects.length == filterProjects(projectsData, filter).length) ? null :
              <button
                onClick={handleShowButton}
                className={styles.lessMoreButton}
              >
                {!showMore && (projects.length < filterProjects(projectsData, filter).length) ? "View More" : "View Less"}
              </button>
            }
            {projects.length === filterProjects(projectsData, filter).length &&
              <a
                style={{ fontSize: "30px" }}
                className={styles.githubMore}
                href={MY_GITHUB}
                title="Git hub"
                target="_blank"
              >
                <FaGithubSquare />
              </a>}
          </div>
        }
      </article>
      <div style={{ height: "170px" }} />
      <div
        style={{ height: "5px", marginTop: "10px" }}
        ref={bottomProjectsRef}
      ></div>
      <Footer />
    </>
  );
};

export default Projects;

export async function getStaticProps() {
  const data = (await import("../data/projects")).projectsData;

  const projectsData = [...data.slice(3, 6), ...data.slice(0, 3), ...data.slice(7)];
  return { props: { projectsData: projectsData } };
}

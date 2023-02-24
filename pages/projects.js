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

import {
  FaGithubSquare,
} from "react-icons/fa";
import {
  MY_GITHUB,
} from "../data/variables";

const Projects = ({ projectsData }) => {
  const [filtredProjects, setFiltredProjects] = useState();
  const [windowWidth, setWindowWidth] = useState();
  const bottomProjectsRef = useRef();
  const projectsBottomRefValue = useOnScreen(bottomProjectsRef);
  const dispatch = useDispatch();
  const { projects, filter, display, sort, showCmd, showMore, projectsNumLoad } =
    useSelector((state) => state.projects);

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
    dispatch(setInitProjects(projectsData));
    if (projects && projects.length > 0) return;
    dispatch(setProjects(projectsData.slice(0, projectsNumLoad)));
  }, []);



  useEffect(() => {
    if (!windowWidth) return;
    if (projects && projects.length > 0) return;
    dispatch(setProjects(projectsData.slice(0, projectsNumLoad)));
    if (showMore && projectsBottomRefValue) {
      loadMore();
    }
  }, [projectsNumLoad]);

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

  function filterSortProjects() {
    let sortedProjects =
      projects?.length > 0 ? [...projects] : [...projectsData];

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
    return filtredProjects;
  }

  useEffect(() => {
    setFiltredProjects(filterSortProjects());
  }, [projects, filter, sort]);

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
              {filtredProjects?.length > 0
                ? "Displayed: " + filtredProjects?.length
                : "No Projects to display"}
            </div>

            <div
              className={
                display === "0"
                  ? styles.projectsContainer
                  : styles.projectsDetailed
              }
            >
              {filtredProjects?.map((p, index) => (
                <Project key={p.id} {...p} />
              ))}
            </div>
          </>
        </div>
        {
          <button
            onClick={() => {
              dispatch(showMorePrj());
              if (!showMore) loadMore();
              else
                dispatch(setProjects(projectsData.slice(0, 3)));
            }}
            className={styles.lessMoreButton}
          >
            {!showMore ? "View More" : "View Less"}
            {filtredProjects?.length === projectsData.length && <a
              style={{ fontSize: "30px" }}
              className={styles.githubMore}
              href={MY_GITHUB}
              title="Git hub"
              target="_blank"
            >
              <FaGithubSquare />
            </a>}
          </button>
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

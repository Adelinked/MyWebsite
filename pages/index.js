import Head from "next/head";
import dynamic from "next/dynamic";

import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppLoading } from "../store/actions/appAction";

import styles from "../styles/Home.module.css";
import Project from "../components/Project";
import SkillComp from "../components/SkillComp";
import { MY_PHOTO } from "../data/variables";
import useOnScreen from "../utils/useOnScreen";
import Meta from "../components/Meta";
const Game = dynamic(() => import("../components/Game"), {
  ssr: true,
});

const Index = ({ projectsData, skillsData }) => {
  const [projectsDataDisplay, setprojectsDataDisplay] = useState(null);
  const [skillsDataDisplay, setSkillsDataDisplay] = useState(null);

  const [gameDisplay, setGameDisplay] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const projectsRef = useRef(null);
  const projectsRefValue = useOnScreen(projectsRef);
  const skillsRef = useRef(null);
  const skillsRefValue = useOnScreen(skillsRef);

  const gameRef = useRef();
  const gameRefValue = useOnScreen(gameRef);

  useEffect(() => {
    if (projectsDataDisplay) return;
    if (projectsRefValue) setprojectsDataDisplay(projectsData);
  }, [projectsRefValue]);

  useEffect(() => {
    if (skillsDataDisplay) return;
    if (skillsRefValue) setSkillsDataDisplay(skillsData);
  }, [skillsRefValue]);

  useEffect(() => {
    if (gameDisplay) return;
    if (gameRefValue) {
      setGameDisplay(true);
    }
  }, [gameRefValue]);

  return (
    <>
      <Meta />
      <Head>
        <title>Adelinked website</title>
        <meta name="description" content="Adelinked website - home page" />
      </Head>

      <article className={styles.container}>
        <header className={styles.indexHeader}>
          <div className={styles.indexTextDiv}>
            <h2 className={styles.indexTitles}>Hey, I am Adelinked</h2>

            <p className={styles.heroText}>
              I'm a software engineer who has renewed interest in web
              development that's why I spend most of my day, experimenting with
              HTML, CSS, Javascript and ReactJs. I enjoy coding and the
              challenge of learning something new everyday.
            </p>
            <button
              style={{ marginTop: "15px" }}
              onClick={() => {
                dispatch(setAppLoading(true));
                router.push("/about");
              }}
            >
              More about me
            </button>
          </div>
          <div className={styles.indexImgDiv}>
            <div className={styles.myImage}>
              <Image
                priority
                alt="Adelinked photo"
                src={MY_PHOTO}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
        </header>
        <section className={styles.indexProjectsDiv}>
          <div className={styles.indexTextProDiv}>
            <h2 className={styles.indexTitles}>Some of my projects</h2>
          </div>

          <div className={styles.indexProjectsImgDiv}>
            {projectsDataDisplay?.map((p) => (
              <Project key={p.id} {...p} fromIndex />
            ))}
          </div>

          <button
            onClick={() => {
              dispatch(setAppLoading(true));
              router.push("/projects");
            }}
            ref={projectsRef}
          >
            All projects
          </button>
        </section>
        <section className={styles.indexProjectsDiv}>
          <div className={styles.indexTextProDiv} style={{ padding: "5px" }}>
            <h2 className={styles.indexTitles}>Skills</h2>
          </div>
          <div className={styles.indexSkillsDiv}>
            {skillsDataDisplay?.map((i) => (
              <SkillComp key={i.num} {...i} />
            ))}
          </div>
          <button
            onClick={() => {
              dispatch(setAppLoading(true));
              router.push("/resume");
            }}
            style={{ margin: "20px 0" }}
            ref={skillsRef}
          >
            My resume
          </button>
        </section>
        <div className={styles.indexProjectsDiv} ref={gameRef}>
          {gameDisplay ? <Game /> : null}
        </div>
      </article>
    </>
  );
};

export default Index;

export async function getStaticProps(context) {
  const data = await import("../data/projects");
  const projectsData = data.projectsData.slice(0, 3);
  const skillsData = data.skillsData;
  return { props: { projectsData: projectsData, skillsData: skillsData } };
}

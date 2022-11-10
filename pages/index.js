import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
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

const Index = ({ projectsData, skillsData }) => {
  const [loading, setLoading] = useState(false);
  const [projectsDataDisplay, setprojectsDataDisplay] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  const projectsRef = useRef();
  const projectsRefValue = useOnScreen(projectsRef);

  useEffect(() => {
    if (projectsDataDisplay) return;

    if (projectsRefValue) {
      (async () => {
        const randomize = (await import("../utils/functions")).randomize;
        setprojectsDataDisplay(randomize(projectsData));

      })()
    }

  }, [projectsRefValue]);

  return (
    <>
      <Meta />
      <Head>
        <title>Adelinked website</title>
        <meta name="description" content="Adelinked website - home page" />
      </Head>
      <Navbar />
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
          {!loading ? (
            <div className={styles.indexProjectsImgDiv}>
              {projectsDataDisplay?.slice(1, 4).map((p) => (
                <Project key={p.id} {...p} fromIndex />
              ))}
            </div>
          ) : (
            <div>...loading</div>
          )}

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
        <section className={styles.indexProjectsDiv} >
          <div className={styles.indexTextProDiv} style={{ padding: "5px" }}>
            <h2 className={styles.indexTitles}>Skills</h2>
          </div>
          <div className={styles.indexSkillsDiv}>
            {skillsData.map((i) => (
              <SkillComp key={i.num} {...i} />
            ))}
          </div>
          <button
            onClick={() => {
              dispatch(setAppLoading(true));
              router.push("/resume");
            }}
            style={{ margin: "20px 0" }}
          >
            My resume
          </button>
        </section>
      </article>
      <Footer />
    </>
  );
};

export default Index;

export async function getStaticProps(context) {
  const data = (await import("../data/projects"));
  const projectsData = data.projectsData;
  const skillsData = data.skillsData;
  return { props: { projectsData: projectsData, skillsData: skillsData } };
}

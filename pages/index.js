import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Project from "../components/Project";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppLoading } from "../store/actions/appAction";
import { randomize } from "../utils/functions";
import SkillComp from "../components/SkillComp";

const Index = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setLoading(true);
      const url = "./api?d=projects";
      const data = await axios.get(url, { signal: controller.signal });

      setProjects(randomize(data.data));
      controller = null;
      setLoading(false);
    })();
    return () => controller?.abort();
  }, []);

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const url = "./api?d=skills";
        const data = await axios.get(url, { signal: controller.signal });
        setSkills(data.data);
        setLoading(false);
        controller = null;
      } catch (e) {}
    })();
    return () => {
      controller?.abort();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Adelinked | Home</title>
        <meta name="description" content="Adelinked website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <article className={styles.container}>
        <header className={styles.indexHeader}>
          <div className={styles.indexTextDiv}>
            <h2 className={styles.indexTitles}>Hey, I am Adelinked</h2>
            <p className={styles.heroText}>
              I'm a software engineer who started gaining interrest for web
              developement that's why I spend most of my day, experimenting with
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
            <img className={styles.myImage} src="/adelinked.jpg"></img>
          </div>
        </header>
        <div className={styles.indexProjectsDiv}>
          <div className={styles.indexTextProDiv}>
            <h2 className={styles.indexTitles}>Some of my projects</h2>
          </div>
          {!loading ? (
            <div className={styles.indexProjectsImgDiv}>
              {projects.slice(1, 4).map((p) => (
                <Project key={p.id} {...p} fromIndex={true} />
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
          >
            All projects
          </button>
        </div>
        <div className={styles.indexProjectsDiv}>
          <div className={styles.indexTextProDiv} style={{ padding: "5px" }}>
            <h2 className={styles.indexTitles}>Skills</h2>
          </div>
          <div className={styles.indexSkillsDiv}>
            {skills.map((i) => (
              <SkillComp key={i.num} {...i} />
            ))}
          </div>
          <button
            onClick={() => {
              dispatch(setAppLoading(true));
              router.push("/Resume");
            }}
            style={{ margin: "20px 0" }}
          >
            My resume
          </button>
        </div>
      </article>
      <Footer />
    </>
  );
};

export default Index;

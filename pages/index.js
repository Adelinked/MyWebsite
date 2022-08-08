import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import Project from "../components/Project";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAppLoading } from "../store/actions/appAction";
import SkillComp from "../components/SkillComp";
import Image from "next/image";
const Index = ({ projectsData, skillsData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

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
            <div className={styles.myImage}>
              <Image
                alt="Adelinked photo"
                src="/adelinked.jpg"
                layout="fill"
                objectFit="contain"
                priority
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
              {projectsData.slice(1, 4).map((p) => (
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
        </section>
        <section className={styles.indexProjectsDiv}>
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
  // const random = (await import("../utils/functions")).randomize;
  //const projectsData = random((await import("../data/projects")).projectsData);

  const projectsData = (await import("../data/projects")).projectsData;
  const skillsData = (await import("../data/projects")).skillsData;
  return { props: { projectsData: projectsData, skillsData: skillsData } };
}

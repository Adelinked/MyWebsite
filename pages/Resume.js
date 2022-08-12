import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import {
  MY_EMAIL,
  MY_FCC_LINK,
  MY_GITHUB,
  MY_LINKED_IN,
  MY_TWITTER,
} from "../data/variables";
const Resume = () => {
  return (
    <>
      <Head>
        <title>Adelinked website | Resume </title>
        <meta name="description" content="Adelinked website resume page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <article className="aboutDiv">
        <header className="aboutTextDiv">
          <h2 className="aboutHeroText">Resume</h2>
          <h3 className="aboutSecTitle">Adelinked</h3>
          <p className="aboutParagraphs"> A software engineer </p>
          <ul className="aboutParagraphs">
            <li style={{ marginTop: "20px" }}>
              GitHub -{" "}
              <Link href={MY_GITHUB}>
                <a target="_blank" rel="noreferrer">
                  Adelinked
                </a>
              </Link>{" "}
            </li>
            <li>
              <Link href={MY_LINKED_IN}>
                <a target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href={MY_TWITTER}>
                <a target="_blank" rel="noreferrer">
                  Twitter
                </a>
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href={MY_EMAIL}>
                <a target="_blank" rel="noreferrer">
                  Email
                </a>
              </Link>{" "}
            </li>
          </ul>
        </header>{" "}
        <section className="aboutTextDiv">
          <h3 className="aboutSecTitle">Experience</h3>
          <ul className="aboutParagraphs">
            <li style={{ marginBottom: "10px" }}>
              <span className="aboutSubTit">Web Developer,</span> Freelance
              <br />
              12/2021 – present
              <ul>
                <li style={{ marginBottom: "10px" }}>
                  Coded websites using HTML5, CSS3 and modern JavaScript
                  frameworks.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Developed testing code for web-based applications.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Followed best practices for software development and web
                  security.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Adhered to SEO best practices while designing sites.
                </li>
              </ul>
            </li>
          </ul>
          <ul className="aboutParagraphs">
            <li style={{ marginBottom: "10px" }}>
              <span className="aboutSubTit">Software Developer,</span> Algiers
              Univercity
              <br />
              06/2007 – present
              <ul>
                <li style={{ marginBottom: "10px" }}>
                  Updated old code bases to modern development standards,
                  improving functionality.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Developed clear specifications for project plans using
                  customer requirements.
                </li>
                <li style={{ marginBottom: "10px" }}>
                  Wrote clear, clean code for various projects.
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <section className="aboutTextDiv">
          <h3 className="aboutSecTitle">Skills</h3>

          <ul className="aboutParagraphs">
            <li style={{ marginBottom: "10px" }}>
              <span className="aboutSubTit">Languages: </span>
              JavaScript (React/Redux), Node.js,TypeScript, SQL, HTML5, CSS3,
              JSON, C.
            </li>
            <li>
              <span className="aboutSubTit">Concepts: </span>Web Application
              Development, Design Patterns (REST API Design, MVC), Databases
              (MongoDb, SQL), Authentication and Security (OAuth2, JWT),
              Linux/UNIX Administration, Version Control (Git), Testing (Unit,
              Component, Integration, End-to-end), Core Web Vitals...
            </li>
          </ul>
        </section>
        <section className="aboutTextDiv">
          <h3 className="aboutSecTitle">Projects</h3>
          <p className="aboutParagraphs">
            See{" "}
            <Link href={MY_GITHUB}>
              <a className="aboutLinks" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Link>{" "}
            for all open-source projects.
          </p>
        </section>
        <section className="aboutTextDiv">
          <h3 className="aboutSecTitle">Education</h3>
          <p className="aboutParagraphs">
            <span className="aboutSubTit">
              Master's Degree in Computer Science
            </span>
            <br />
            Algiers University: 2001-2007
          </p>
        </section>
        <section className="aboutTextDiv">
          <h3 className="aboutSecTitle">Certificates</h3>
          <ul className="aboutParagraphs">
            <li style={{ marginBottom: "10px" }}>
              Responsive Web Design (
              <a target="_blank" rel="noreferrer" href={MY_FCC_LINK}>
                freeCodeCamp
              </a>
              )
            </li>
            <li style={{ marginBottom: "10px" }}>
              JavaScript Algorithms and Data Structures (
              <a target="_blank" rel="noreferrer" href={MY_FCC_LINK}>
                freeCodeCamp
              </a>
              )
            </li>
            <li style={{ marginBottom: "10px" }}>
              Front End Development Libraries (
              <a target="_blank" rel="noreferrer" href={MY_FCC_LINK}>
                freeCodeCamp
              </a>
              )
            </li>
            <li style={{ marginBottom: "10px" }}>
              Quality Assurance (
              <a target="_blank" rel="noreferrer" href={MY_FCC_LINK}>
                freeCodeCamp
              </a>
              )
            </li>
          </ul>
        </section>
      </article>

      <Footer />
    </>
  );
};

export default Resume;

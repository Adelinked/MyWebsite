import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";

const About = () => {
  return (
    <>
      <Head>
        <title>Adelinked | Resume</title>
        <meta name="description" content="Ecomerce app" />
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
              <Link href="https://github.com/adelinked">
                <a target="_blank" rel="noreferrer">
                  Adelinked
                </a>
              </Link>{" "}
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/adel-allam-2325a1180/">
                <a target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="https://twitter.com/AAdelinked">
                <a target="_blank" rel="noreferrer">
                  Twitter
                </a>
              </Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="mailto:adel.adelinked@gmail.com">
                <a target="_blank" rel="noreferrer">
                  Email
                </a>
              </Link>{" "}
            </li>
          </ul>
        </header>{" "}
        <section className="aboutTextDiv">
          <h3 className="aboutSecTitle">Background</h3>
          <p className="aboutParagraphs">
            With more than 14 years working in the IT field where software
            developement represents the biggest part.
          </p>
        </section>
        <section className="aboutTextDiv">
          <h3 className="aboutSecTitle">Skills</h3>

          <ul className="aboutParagraphs">
            <li style={{ marginBottom: "10px" }}>
              <span className="aboutSubTit">Languages</span> - Node.js,
              JavaScript (React/Redux), TypeScript, SQL, PHP, Python, HTML5,
              CSS3, JSON, C, Java
            </li>
            <li>
              <span className="aboutSubTit">Concepts</span> - Web Application
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
            <Link href="https://github.com/Adelinked">
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
            Masters Degree in Computer Science: 2001-2007
          </p>
        </section>
      </article>

      <Footer />
    </>
  );
};

export default About;

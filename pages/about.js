import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import { useDispatch } from "react-redux";
import { setAppLoading } from "../store/actions/appAction";
import {
  MY_EMAIL,
  MY_GITHUB,
  MY_LINKED_IN,
  MY_TWITTER,
} from "../data/variables";

const About = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Head>
        <title>Adelinked | About me</title>
        <meta name="description" content="Ecomerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <article className="aboutDiv">
        <header className="aboutTextDiv">
          <h2 className="aboutHeroText">About me</h2>
          <p>
            Hey, I'm Adelinked! A software engineer who started gaining
            interrest for web developement especially the frontend that's why I
            spend most of my day, experimenting with HTML, CSS, Javascript and
            ReactJs. I enjoy coding and the challenge of learning something new
            everyday.
          </p>
          <p>
            {" "}
            This is my spot on the web for projects I've created and anything
            else I want to show the world. Check out the{" "}
            <Link href={"./projects"}>
              <a className="aboutLinks">projects</a>
            </Link>{" "}
            page to see a highlight of the open-source projects I've made.
          </p>
        </header>{" "}
        <section className="aboutTextDiv">
          <h3 className="aboutSecTitle">Connect</h3>
          <p className="aboutParagraphs">
            You can contact me by{" "}
            <Link href={`mailto:${MY_EMAIL}`}>
              <a className="aboutLinks">email</a>
            </Link>{" "}
            to say hi! I always appreciate meeting new people.{" "}
          </p>
          <ul className="aboutParagraphs">
            <li className="listItem">
              {" "}
              <Link href={MY_GITHUB}>
                <a target="_blank" rel="noreferrer">
                  GitHub
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
              <Link href={MY_LINKED_IN}>
                <a target="_blank" rel="noreferrer">
                  Linkedin
                </a>
              </Link>{" "}
            </li>
          </ul>
        </section>
        <section className="aboutTextDiv">
          <h3 className="aboutSecTitle">Random facts</h3>
          <div className="aboutParagraphs">
            <ul>
              <li>
                I built my first website in 2005 a weather forcast mobile
                website.
              </li>
              <li>I speak Arabic and French in addition to English.</li>
              <li>My favorite Tv Series is Breaking Bad.</li>
              <li>My current favorite type of game is strategy-based.</li>
              <li>
                My favorite type of music is rock music and favorite sport is
                soccer.
              </li>
            </ul>
          </div>
        </section>
        <section className="aboutTextDiv">
          <h3 className="aboutSecTitle">Tools</h3>
          <div className="aboutParagraphs">
            <ul>
              <li>
                This website is hosted on{" "}
                <Link href="https://netlify.com">
                  <a className="aboutLinks" target="_blank" rel="noreferrer">
                    Netlify
                  </a>
                </Link>{" "}
                and uses the{" "}
                <Link href="https://nextjs.org">
                  <a className="aboutLinks" target="_blank" rel="noreferrer">
                    NextJs
                  </a>
                </Link>{" "}
                framework
              </li>
            </ul>
          </div>
        </section>
        <section className="aboutTextDiv">
          <h3 className="aboutSecTitle">Misc</h3>
          <div className="aboutParagraphs">
            <ul>
              <li>
                <Link href="./resume">
                  <a
                    onClick={() => {
                      dispatch(setAppLoading(true));
                    }}
                  >
                    Resume
                  </a>
                </Link>{" "}
              </li>
            </ul>
          </div>
        </section>
      </article>

      <Footer />
    </>
  );
};

export default About;

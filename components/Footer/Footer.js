import styles from "./footer.module.css";
import {
  FaEnvelope,
  FaGithubSquare,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useAppContext } from "../../context";

import Image from "next/image";
import {
  MY_EMAIL,
  MY_GITHUB,
  MY_LINKED_IN,
  MY_TWITTER,
} from "../../data/variables";
export default ({ refProp }) => {
  const { globalState, setGlobalState } = useAppContext();
  return (
    <>
      <div className={styles.footerDiv} >
        <p className={styles.footerParagraph}>
          Designed and coded by Adelinked{" "}
          <a
            style={{ fontSize: "22px", marginLeft: "5px" }}
            href={MY_LINKED_IN}
            title="LinkedIn"
            target="_blank"
          >
            <FaLinkedin />
          </a>
          <a
            style={{ fontSize: "22px", marginLeft: "5px" }}
            href={MY_TWITTER}
            title="Twitter"
            target="_blank"
          >
            <FaTwitter />
          </a>
          <a
            style={{ fontSize: "22px", marginLeft: "5px" }}
            href={MY_EMAIL}
            title="Send an email"
            target="_blank"
          >
            <FaEnvelope />
          </a>
        </p>
        <div className={styles.iconsDiv}>
          {" "}
          <a
            style={{ marginRight: "5px" }}
            href="https://nextjs.org"
            title="Developed using NextJs"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={
                globalState === "light"
                  ? `/nextJsBlack.png`
                  : `/nextJsWhite.png`
              }
              alt="nextJs logo"
              width={40}
              height={40}
            />
          </a>
          <a
            style={{ fontSize: "30px" }}
            href={MY_GITHUB}
            title="Git hub"
            target="_blank"
          >
            <FaGithubSquare />
          </a>
          <a
            style={{ marginRight: "5px" }}
            href="https://netlify.com"
            title="deployed with Netlify"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/netlify.png"
              alt="netlify logo"
              width={48}
              height={45}
            />
          </a>
        </div>
      </div>

    </>
  );
};

import styles from "./footer.module.css";
import { FaEnvelope, FaGithubSquare } from "react-icons/fa";

import Image from "next/image";
export default function Footer() {
  return (
    <>
      <div className={styles.footerDiv}>
        <p className={styles.footerParagraph}>
          Designed and coded by Adelinked{" "}
          <a
            style={{ fontSize: "22px", marginLeft: "5px" }}
            href="mailto:adel.adelinked@gmail.com"
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
            <Image src="/NextJs.png" alt="nextJs logo" width={60} height={30} />
          </a>
          <a
            style={{ fontSize: "30px" }}
            href="https://github.com/Adelinked"
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
}

import "font-awesome/css/font-awesome.min.css";
import styles from "./footer.module.css";
export default function Footer() {
  return (
    <>
      <div className={styles.footerDiv}>
        <p>
          Designed and coded by Adelinked{" "}
          <a
            style={{ fontSize: "22px", marginLeft: "15px" }}
            href="mailto:adel.adelinked@gmail.com"
            title="Send an email"
            target="_blank"
          >
            <i className="fa fa-envelope"></i>
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
            <img src="/nextjs.png" />
          </a>
          <a
            style={{ fontSize: "30px" }}
            href="https://github.com/Adelinked"
            title="Git hub"
            target="_blank"
          >
            <i className="fa fa-github"></i>
          </a>
          <a
            style={{ marginRight: "5px" }}
            href="https://netlify.com"
            title="deployed with Netlify"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/netlify.png" />
          </a>
        </div>
      </div>
    </>
  );
}

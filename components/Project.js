import styles from "../styles/Projects.module.css";
import "font-awesome/css/font-awesome.min.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCurrProject } from "../store/actions/projectsAction";
import { useLocalStorageValue } from "@mantine/hooks";
import { setAppLoading } from "../store/actions/appAction";

export default function Project(props) {
  const {
    title,
    description,
    image,
    categories,
    id,
    srcUrl,
    depUrl,
    demoUrl,
    fromIndex = false,
  } = props;
  const [currProdLocal, setCurrProdLocal] = useLocalStorageValue({
    key: "currProd",
  });
  const dispatch = useDispatch();
  const { projects, display } = useSelector((state) => state.projects);
  const { loading } = useSelector((state) => state.app);

  return (
    <div className={styles.projectPad}>
      {display === "0" || fromIndex /* without details*/ ? (
        <>
          <div className={styles.projectTitleDiv}>
            <h3>{title}</h3>
          </div>
          <div className={styles.imgDiv}>
            <img className={styles.image} src={image} alt={title}></img>
            {depUrl && (
              <Link href={depUrl}>
                <a
                  title="view the project deployed"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span
                    className={
                      display === "0" || fromIndex
                        ? styles.projectButton
                        : styles.projectButtonDet
                    }
                  >
                    <i className="fa fa-eye"></i>
                  </span>
                </a>
              </Link>
            )}
          </div>
          <div className={styles.catDiv}>
            {categories &&
              categories.map((c) => (
                <span key={c} className={styles.catSpan}>
                  {c}
                </span>
              ))}
          </div>
          <div className={styles.projectIconsDiv}>
            {srcUrl && (
              <Link href={srcUrl}>
                <a title="view source code" target="_blank" rel="noreferrer">
                  <span className={styles.prjSrcIcon}>
                    <i className="fa fa-github" />
                  </span>
                </a>
              </Link>
            )}
            {depUrl && (
              <Link href={depUrl}>
                <a
                  title="view the app deployed"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={styles.prjSrcIcon}>
                    <i className="fa fa-eye" />
                  </span>
                </a>
              </Link>
            )}
            {demoUrl && (
              <Link href={srcUrl}>
                <a title="view source code" target="_blank" rel="noreferrer">
                  <span className={styles.prjSrcIcon}>
                    <i className="fa fa-youtube" />
                  </span>
                </a>
              </Link>
            )}
          </div>
        </>
      ) : (
        <div className={styles.withDescription}>
          <div className={styles.imgDivDet}>
            <img className={styles.image} src={image} alt={title} />
            {depUrl && (
              <Link href={depUrl}>
                <a
                  title="view the project deployed"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span
                    className={
                      display === "0" || fromIndex
                        ? styles.projectButton
                        : styles.projectButtonDet
                    }
                  >
                    <i className="fa fa-eye"></i>
                  </span>
                </a>
              </Link>
            )}
            <div className={styles.catDiv}>
              {categories &&
                categories.map((c) => (
                  <span key={c} className={styles.catSpan}>
                    {c}
                  </span>
                ))}
            </div>
            <div className={styles.projectIconsDiv}>
              {srcUrl && (
                <Link href={srcUrl}>
                  <a title="view source code" target="_blank" rel="noreferrer">
                    <span className={styles.prjSrcIcon}>
                      <i className="fa fa-github" />
                    </span>
                  </a>
                </Link>
              )}
              {depUrl && (
                <Link href={depUrl}>
                  <a
                    title="view the app deployed"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className={styles.prjSrcIcon}>
                      <i className="fa fa-eye" />
                    </span>
                  </a>
                </Link>
              )}
              {demoUrl && (
                <Link href={srcUrl}>
                  <a title="view source code" target="_blank" rel="noreferrer">
                    <span className={styles.prjSrcIcon}>
                      <i className="fa fa-youtube" />
                    </span>
                  </a>
                </Link>
              )}
            </div>
          </div>

          <div className={styles.description}>
            <div className={styles.projectTitleDiv}>
              <h3 style={{ textAlign: "left" }}>{title}</h3>
            </div>
            <p className={styles.descriptionText}>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

import styles from "../styles/Projects.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { FaEye, FaGithubSquare, FaYoutube } from "react-icons/fa";
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
    num,
    fromIndex = false,
  } = props;

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
            <div className={styles.prjImg}>
              <Image
                src={image}
                alt={`${title} project image`}
                layout="fill"
                objectFit="cover"
                priority={num === 0}
              />
            </div>
            {depUrl && (
              <Link href={depUrl}>
                <a
                  title={`View ${title} deployed`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span
                    className={
                      display === "1" || fromIndex
                        ? styles.projectButtonDet
                        : styles.projectButton
                    }
                  >
                    <FaEye />
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
                <a
                  title={`View ${title} source code`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={styles.prjSrcIcon}>
                    <FaGithubSquare />
                  </span>
                </a>
              </Link>
            )}
            {depUrl && (
              <Link href={depUrl}>
                <a
                  title={`View ${title} deployed`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={styles.prjSrcIcon}>
                    <FaEye />
                  </span>
                </a>
              </Link>
            )}
            {demoUrl && (
              <Link href={srcUrl}>
                <a
                  title={`View ${title} demo`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={styles.prjSrcIcon}>
                    <FaYoutube />
                  </span>
                </a>
              </Link>
            )}
          </div>
        </>
      ) : (
        <div className={styles.withDescription}>
          <div className={styles.imgDivDet}>
            <div className={styles.prjImgDet}>
              <Image src={image} alt={title} layout="fill" objectFit="cover" />
            </div>
            {depUrl && (
              <Link href={depUrl}>
                <a
                  title={`View ${title} deployed`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span
                    className={
                      display === "1" || fromIndex
                        ? styles.projectButtonDet
                        : styles.projectButton
                    }
                  >
                    <FaEye />
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
                  <a
                    title={`View ${title} source code`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className={styles.prjSrcIcon}>
                      <FaGithubSquare />
                    </span>
                  </a>
                </Link>
              )}
              {depUrl && (
                <Link href={depUrl}>
                  <a
                    title={`View ${title} deployed`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className={styles.prjSrcIcon}>
                      <FaEye />
                    </span>
                  </a>
                </Link>
              )}
              {demoUrl && (
                <Link href={srcUrl}>
                  <a title="view source code" target="_blank" rel="noreferrer">
                    <span className={styles.prjSrcIcon}>
                      <FaYoutube />
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
            <p
              className={styles.descriptionText}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

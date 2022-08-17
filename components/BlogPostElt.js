import Link from "next/link";
import styles from "../styles/Blog.module.css";
import { formatDate } from "../lib/dates";

export default ({ title, id, date, category, ...rest }) => {
  console.log(rest);
  return (
    <>
      <Link href={`./posts/${id}`}>
        <a>
          <div className={styles.blogPostTitle}>
            <p className={styles.postTitle}>{title}</p>

            <div className={styles.postSubTitle}>
              <span>Published on {formatDate(date)}</span>
              <span className={styles.tagSpan}>{category}</span>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

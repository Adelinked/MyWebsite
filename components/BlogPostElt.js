import Link from "next/link";
import styles from "../styles/Blog.module.css";
import { formatDate } from "../lib/dates";

export default ({ title, id, date, category, categoryPage }) => {
  return (
    <>
      <Link href={`/blog/${id}`}>
        <a>
          <div className={styles.blogPostTitle}>
            <p className={styles.postTitle}>{title}</p>

            <div className={styles.postSubTitle}>
              <time>Published on {formatDate(date)}</time>
              {!categoryPage && (
                <span className={styles.tagSpan}>{category}</span>
              )}
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};

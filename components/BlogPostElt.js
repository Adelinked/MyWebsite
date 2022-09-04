import Link from "next/link";
import styles from "../styles/Blog.module.css";
import { formatDate, completeDate } from "../lib/dates";

export default ({
  title,
  id,
  date,
  category,
  categoryPage,
  isCompleteDate,
  noDate,
}) => {
  return (
    <>
      <Link href={`/blog/${id}`}>
        <a>
          <div className={styles.blogPostTitle}>
            <p className={styles.postTitle}>{title}</p>

            <div className={styles.postSubTitle}>
              {!noDate && (
                <>
                  {isCompleteDate ? (
                    <time>Published on {completeDate(date)}</time>
                  ) : (
                    <time>Published on {formatDate(date)}</time>
                  )}
                </>
              )}
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

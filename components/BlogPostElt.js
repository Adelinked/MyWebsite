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

      <div className={styles.blogPostTitle}>
        <Link href={`/blog/${id}`}>
          <a>
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
                <span style={{ alignItems: "flex-end" }}/*className={styles.tagSpan}*/>{category}</span>
              )}
            </div>
          </a>
        </Link>
      </div>

    </>
  );
};

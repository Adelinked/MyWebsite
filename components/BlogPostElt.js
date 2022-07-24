import Link from "next/link";
export default ({ title, id, date }) => {
  return (
    <>
      <Link href={`./posts/${id}`}>
        <a>
          <p>{date}</p>
          <p>{title}</p>
        </a>
      </Link>
    </>
  );
};

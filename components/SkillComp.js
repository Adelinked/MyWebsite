import styles from "../styles/Home.module.css";
import Image from "next/image";
const SkillComp = ({ title, image }) => {
  //<img style={{ marginRight: "2px", borderRadius: "5px" }} src={image} />

  return (
    <span className={styles.skillSpan}>
      <span className={styles.skillImg}>
        <Image alt={title} src={image} width={20} height={20} />
      </span>
      {title}
    </span>
  );
};

export default SkillComp;

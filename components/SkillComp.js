import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useAppContext } from "../context";


const SkillComp = ({ title, image, image2 }) => {
  //<img style={{ marginRight: "2px", borderRadius: "5px" }} src={image} />
  const { globalState, setGlobalState } = useAppContext();

  return (
    <span className={styles.skillSpan}>
      <span className={styles.skillImg}>
        <Image
          alt={title}
          src={
            image2 ? (globalState === "light-theme" ? image2 : image) : image
          }
          width={20}
          height={20}
        />
      </span>
      {title}
    </span>
  );
};

export default SkillComp;

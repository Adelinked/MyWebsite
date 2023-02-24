import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useAppContext } from "../context";


const SkillComp = ({ title, image, image2 }) => {
  const { globalState, setGlobalState } = useAppContext();

  return (
    <span className={styles.skillSpan}>
      <span className={styles.skillImg}>
        <Image
          alt={title}
          src={
            image2 ? (globalState === "light" ? image2 : image) : image
          }
          width={20}
          height={20}
        />
      </span>
      <span>{title}</span>
    </span>
  );
};

export default SkillComp;

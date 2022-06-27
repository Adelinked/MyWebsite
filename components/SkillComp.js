import styles from "../styles/Home.module.css";
const SkillComp = ({ title, image }) => {
  return (
    <span className={styles.skillSpan}>
      <img style={{ marginRight: "2px", borderRadius: "5px" }} src={image} />
      {title}
    </span>
  );
};

export default SkillComp;

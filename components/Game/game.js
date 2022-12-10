
import { useEffect, useRef } from "react";
import styles from "../../styles/Home.module.css";

const Game = () => {
  const gameContainerRef = useRef(null);
  useEffect(() => {
    const element = gameContainerRef.current;
    setTimeout(() => {
      element.style.scale = "1";
    }, 200);


  }, [])

  return <><div className={styles.indexTextProDiv} style={{ padding: "5px" }}>
    <h2 className={styles.indexTitles}>Play a game</h2>
  </div>
    <div className={styles.gameContainer} ref={gameContainerRef} >
      <iframe
        className={styles.game}
        src="https://adelinked-rock-paper-scissors.netlify.app/"
      ></iframe>
    </div>
  </>

}
export default Game;
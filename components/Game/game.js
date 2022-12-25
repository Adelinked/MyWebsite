import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

const Game = () => {
  const [loading, setLoading] = useState(true);
  const gameContainerRef = useRef(null);
  const iframeRef = useRef(null);
  useEffect(() => {
    const iframe = iframeRef.current;
    iframe.onload = function () {
      setLoading(false);
    }
    const element = gameContainerRef.current;
    setTimeout(() => {
      element.style.scale = "1";
    }, 200);
  }, []);

  return (
    <>
      <div className={styles.indexTextProDiv} style={{ padding: "5px" }}>
        <h2 className={styles.indexTitles}>Play a game</h2>
      </div>
      <div className={styles.gameContainer} ref={gameContainerRef}>
        {loading ? (
          <div className={styles.loadingImage}>
            <Image
              src="/loading-92.gif"
              alt="loading image"
              layout="fill"
            />
          </div>
        ) : null}
        <iframe
          ref={iframeRef}
          className={styles.game}
          fetchpriority={true}
          loading="lazy"
          scrolling="no"
          title="rock paper scissors lizard spock game"
          src="https://adelinked-rock-paper-scissors.netlify.app/"
        />
      </div>
    </>
  );
};
export default Game;

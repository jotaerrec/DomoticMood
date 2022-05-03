import React from "react";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.background}>
      <img src={window.location.origin + "/img/676481.jpg"} alt="" />
      <div className={styles.layer}></div>
    </div>
  );
};

export default Home;

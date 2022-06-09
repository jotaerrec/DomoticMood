import React, { useState, useContext } from "react";
import { ScreenContext } from "../../context/Screen/ScreenContext";
import styles from "./styles.module.scss";

const TopCard = (data) => {
  const { screen, setDisplayName } = useContext(ScreenContext);
  const [hamburger, setHamburger] = useState({
    open: data.hamburger,
  });

  const hamburgerOpen = () => {
    var stateH = !hamburger.open;
    setHamburger({ open: stateH });
    if (stateH) {
      return setDisplayName("MENU");
    }
    if (screen === "MENU") {
      return setDisplayName("HOME");
    }
  };

  let cardTitle = "DomoticMood";
  return (
    <div className={styles.topCard}>
      <div className={styles.cardTitle}>
        <div className={styles.circulo}></div>
        <h1> {cardTitle} </h1>
      </div>
      <div
        className={styles.hamburger}
        onClick={() => {
          hamburgerOpen();
        }}
      >
        <div className={hamburger.open ? styles.changeBar1 : styles.bar1}></div>
        <div className={hamburger.open ? styles.changeBar2 : styles.bar2}></div>
        <div className={hamburger.open ? styles.changeBar3 : styles.bar3}></div>
      </div>
    </div>
  );
};

export default TopCard;

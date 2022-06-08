import React, { useContext, useState } from "react";
import { CardMenu } from "../CardMenu/index";
import CardScreen from "../CardScreen";
import { HomeCard } from "../HomeCard/index";
import { ScreenContext } from "../../context/Screen/ScreenContext";
import { HOME, MENU } from "../../context/types";
import styles from "./styles.module.scss";
export const Card = () => {
  const { screen, setDisplayName } = useContext(ScreenContext);
  const [hamburger, setHamburger] = useState({
    open: false,
  });
  let cardTitle = "DomoticMood";
  const switchScreen = () => {
    switch (screen) {
      case HOME:
        cardTitle = "DomoticMood";
        return <HomeCard className={styles.homeCard} />;
      case MENU:
        cardTitle = "DomoticMood";
        return <CardMenu className={styles.cardMenu} />;
      default:
        console.log(screen);
        if (hamburger.open) setHamburger({ open: false });
        return (
          <CardScreen
            className={styles.homeCard}
            data={{
              section: screen,
            }}
          />
        );
    }
  };
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

  return (
    <div className={styles.Card}>
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
          <div
            className={hamburger.open ? styles.changeBar1 : styles.bar1}
          ></div>
          <div
            className={hamburger.open ? styles.changeBar2 : styles.bar2}
          ></div>
          <div
            className={hamburger.open ? styles.changeBar3 : styles.bar3}
          ></div>
        </div>
      </div>
      {switchScreen()}
    </div>
  );
};

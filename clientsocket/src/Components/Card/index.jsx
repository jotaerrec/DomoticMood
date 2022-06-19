import React, { useContext, useState, useEffect } from "react";
import { CardMenu } from "../CardMenu/index";
import CardScreen from "../CardScreen";
import { HomeCard } from "../HomeCard/index";
import { ScreenContext } from "../../context/Screen/ScreenContext";
import { HOME, MENU, LOGIN } from "../../context/types";
import styles from "./styles.module.scss";
import TopCard from "../TopCard";
import LoginCard from "../Login";

export const Card = () => {
  const { screen, setDisplayName } = useContext(ScreenContext);
  const [hamburger, setHamburger] = useState({
    open: false,
  });
  const [token, setToken] = useState(null);
  const switchScreen = () => {
    switch (screen) {
      case HOME:
        console.log("holaj");
        return (
          <>
            <TopCard data={{ hamburger: false }} />
            <HomeCard className={styles.homeCard} />
          </>
        );
      case MENU:
        return (
          <>
            <TopCard data={{ hamburger: true }} />
            <CardMenu className={styles.cardMenu} />
          </>
        );
      case LOGIN:
        return (
          <>
            <LoginCard />
          </>
        );
      default:
        console.log(screen);
        if (hamburger.open) setHamburger({ open: false });
        return (
          <>
            <TopCard data={{ hamburger: false }} />
            <CardScreen
              className={styles.homeCard}
              data={{
                section: screen,
              }}
            />
          </>
        );
    }
  };
  const verifyToken = () => {
    if (!localStorage.getItem("x-access-token")) {
      return setDisplayName(LOGIN);
    }
    return setDisplayName(HOME);
  };

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("x-access-token")));
    verifyToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={styles.Card}>{switchScreen()}</div>;
};

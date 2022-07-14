import React, { useContext, useState, useEffect } from "react";
import { CardMenu } from "../CardMenu/index";
import CardScreen from "../CardScreen";
import axios from "axios";
import { HomeCard } from "../HomeCard/index";
import { ScreenContext } from "../../context/Screen/ScreenContext";
import { AddScreen } from "../AddScreen/index.jsx";
import { HOME, MENU, LOGIN, ADDSCREEN } from "../../context/types";
import styles from "./styles.module.scss";
import TopCard from "../TopCard";
import LoginCard from "../Login";
import { Switch } from "../Switch";
import { URL_API } from "../../context/types";

export const Card = () => {
  // Variables
  const { screen, props, setDisplayName } = useContext(ScreenContext);
  const [hamburger, setHamburger] = useState({
    open: false,
  });
  const token = localStorage.getItem("x-access-token");

  // Funciones
  const switchScreen = () => {
    switch (screen) {
      case HOME:
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
            <LoginCard args={{ erorr: props }} />
          </>
        );
      case ADDSCREEN:
        return (
          <>
            <TopCard data={{ hamburger: false }} />
            <AddScreen />
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
  const verifyToken = async () => {
    if (token && token !== "undefined") {
      console.log("verificando token");
      try {
        let res = await axios({
          url: URL_API + "/validateToken/",
          method: "get",
          timeout: 8000,
          headers: {
            "Content-Type": "application/json",
            "x-access-token": JSON.parse(
              localStorage.getItem("x-access-token")
            ),
          },
        });

        console.log(res.status);
        if (res.status !== 202) {
          return setDisplayName(
            LOGIN,
            "Token invalido, inicia sesion nuevamente. Por favor"
          );
        }
        return setDisplayName(HOME);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("x-access-token");
        return setDisplayName(
          LOGIN,
          "Token invalido, inicia sesión nuevamente. Por favor"
        );
      }
    } else return setDisplayName(LOGIN);
  };
  useEffect(() => {
    verifyToken();
  }, [token]);
  return <div className={styles.Card}>{switchScreen()}</div>;
};

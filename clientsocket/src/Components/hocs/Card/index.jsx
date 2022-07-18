import React, { useContext, useState, useEffect } from "react";
import { CardMenu } from "../../layout/Menu/index";
import CardScreen from "../../layout/Room";
import axios from "axios";
import { HomeCard } from "../../layout/Home/";
import { ScreenContext } from "../../../context/Screen/ScreenContext";
import { AddScreen } from "../../layout/Create/index.jsx";
import { HOME, MENU, LOGIN, ADDSCREEN } from "../../../context/types";
import styles from "./styles.module.scss";
import TopCard from "../../common/Nav";
import LoginCard from "../../layout/Login";
import { URL_API } from "../../../context/types";

export const Card = () => {
  // Variables
  const { screen, notifications, setDisplayName } = useContext(ScreenContext);
  const [hamburger, setHamburger] = useState({
    open: false,
  });
  const token = localStorage.getItem("x-access-token");
  console.log(notifications);
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
            <LoginCard args={{ notifications: notifications }} />
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
    if (token && typeof token !== "undefined") {
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
          localStorage.removeItem("x-access-token");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return <div className={styles.Card}>{switchScreen()}</div>;
};

import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CardMenu } from "Layout/Menu/";
import { HomeCard } from "Layout/Home/";
import { AddScreen } from "Layout/Create/";
import { CardScreen } from "Layout/Room";
import { LoginCard } from "Layout/Login";
import { Profile } from "Layout/Profile/";
import socket from "Controllers/socketapi.js";
import { ScreenContext } from "Context/Screen/ScreenContext";
import { HOME, MENU, LOGIN, ADDSCREEN, PROFILE } from "Context/types";
import styles from "./styles.module.scss";
import TopCard from "Common/Nav";
import { URL_API } from "Context/types";

export const Card = () => {
  // Variables
  const { screen, notifications, setDisplayName } = useContext(ScreenContext);
  const [hamburger, setHamburger] = useState({
    open: false,
  });
  const token = localStorage.getItem("x-access-token");
  // Funciones
  socket.on("UserConfigure", async (data) => {
    socket.emit("ConfigureUser", token);
  });

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
      case PROFILE:
        return (
          <>
            <TopCard data={{ hamburger: false }} />
            <Profile />
          </>
        );
      default:
        if (hamburger.open) setHamburger({ open: false });
        return (
          <>
            <TopCard data={{ hamburger: false }} />
            <CardScreen className={styles.homeCard} screen={screen} />
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

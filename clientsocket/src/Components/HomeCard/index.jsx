import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import { Switch } from "../Switch/";
import { Slider } from "../Slider";
const URL_API = "http://localhost:3001";

export const HomeCard = () => {
  const [token, setToken] = useState();
  const [data, setData] = useState([{}]);
  const dataSwitch = {
    tittle: "Alarma 1",
    value: true,
    order: 1,
  };
  const getElements = async () => {
    try {
      let res = await axios({
        url: URL_API + "/pins/",
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.status);
      }
      // Don't forget to return something
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    const tokenTemp = await JSON.parse(localStorage.getItem("items"));
    setToken(tokenTemp);
    await getElements();
  });

  return (
    <>
      <div className={styles.homeCard}>
        <ol className={styles.switches}>
          {data.map((e, i) => {
            if (e.type === "output") {
              switch (e.typeUse) {
                case "relay":
                  <Switch
                    data={{
                      tittle: e.tittle,
                      value: e.value,
                      order: e.pin,
                      rooms: e.rooms,
                    }}
                  />;
                  return;
                case "dimmer":
                  <Slider
                    data={{
                      tittle: e.tittle,
                      value: e.value,
                      order: e.pin,
                      rooms: e.rooms,
                    }}
                  />;
                  return;
              }
            }
            if (e.type === "input") {
              switch (e.typeUse) {
                case "sensor":
                  return (
                    <>
                      <span>Name: {e.tittle}</span>
                      <span>value: {e.value}</span>
                    </>
                  );
              }
            }
          })}
          <Switch data={dataSwitch} />
          <Switch data={{ tittle: "Alarma 2", value: false, order: 2 }} />
        </ol>
      </div>
    </>
  );
};

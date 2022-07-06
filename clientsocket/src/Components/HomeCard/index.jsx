import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import { Switch } from "../Switch/";
import { Slider } from "../Slider";
const URL_API = "http://192.168.0.45:8080";

export const HomeCard = () => {
  const [data, setData] = useState();
  const getElements = async () => {
    try {
      let res = await axios({
        url: URL_API + "/pins/",
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
      });
      if (res.status === 200) {
        if (res.data.error === "token invalido") {
          localStorage.removeItem("x-access-token");
          window.location.reload();
        }
        if (!res.data.length) {
          return setData("");
        }
        // Don't forget to return something
        setData(res.data);
      } else {
        setData("");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const renderData = () => {
    if (data) {
      return (
        <div className={styles.homeCard}>
          <ol className={styles.switches}>
            {data.forEach((e, i) => {
              if (e.type === "output") {
                if (e.typeUse === "relay") {
                  return (
                    <Switch
                      data={{
                        tittle: e.tittle,
                        value: e.value,
                        order: e.pin,
                        rooms: e.rooms,
                      }}
                    />
                  );
                } else {
                  return (
                    <Slider
                      data={{
                        tittle: e.tittle,
                        value: e.value,
                        order: e.pin,
                        rooms: e.rooms,
                      }}
                    />
                  );
                }
              }
              if (e.type === "input") {
                if (e.typeUse === "sensor") {
                  return (
                    <>
                      <span>Name: {e.tittle}</span>
                      <span>value: {e.value}</span>
                    </>
                  );
                }
              }
            })}
          </ol>
        </div>
      );
    } else {
      return (
        <>
          <div className={styles.notFoundDiv}>
            <h1 className={styles.notFound}>No hay elementos activos</h1>
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getElements();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{renderData()}</>;
};

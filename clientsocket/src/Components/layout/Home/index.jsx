import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import { Switch } from "../../common/Switch";
import { Slider } from "../../common/Slider";
import { URL_API } from "../../../context/types";

export const HomeCard = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem("pins")));
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
      if (res.status === 202) {
        localStorage.setItem("pins", JSON.stringify(res.data));
        return setData(res.data); // Don't forget to return something
      }
      localStorage.removeItem("pins");
      setData("");
    } catch (err) {
      console.error(err);
      setData("");
      localStorage.removeItem("pins");
    }
  };
  const renderData = () => {
    if (data) {
      return (
        <div className={styles.homeCard}>
          <ol className={styles.switches}>
            {data.map((e, i) => {
              console.log(e);
              if (e.type === false) {
                if (e.typeUse === "relay") {
                  return (
                    <>
                      <Switch
                        data={{
                          tittle: e.name,
                          value: e.value,
                          order: e.pin,
                          rooms: e.rooms,
                        }}
                      />
                    </>
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
              if (e.type === true) {
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
            {console.log(data)}
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
      console.log(data);
      let date = localStorage.getItem("dateGetPins");
      console.log(date);
      const actualDate = new Date();
      if (date && typeof date !== "undefined") {
        const diference = (actualDate.getTime() - date) / 1000;
        if (diference < 30) return data;
      }
      console.log("va una peti", actualDate.getTime() - date);
      localStorage.setItem("dateGetPins", actualDate.getTime());
      return await getElements();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{renderData()}</>;
};

import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { Switch } from "Common/Switch";
import { Slider } from "Common/Slider";
import { Sensor } from "Common/Sensor";
import { getPins } from "Services/";
import { Loading } from "Common/Loading";

export const HomeCard = () => {
  //Variables
  const [data, setData] = useState(JSON.parse(localStorage.getItem("pins")));
  const [renderData, setRenderData] = useState(<Loading />);
  const [loading, setLoading] = useState(true);
  //Funciones
  const getElements = async () => {
    try {
      let res = await getPins();
      if (res.status === 202) {
        if (res.data.pins.length === 0) {
          setData("");
        } else {
          await setData(res.data.pins);
          await localStorage.setItem("pins", JSON.stringify(res.data.pins));
        }

        setLoading(false);
        return localStorage.setItem("rooms", JSON.stringify(res.data.rooms));
      }

      localStorage.removeItem("pins");
      setLoading(false);
      setData("");
    } catch (err) {
      console.log(err);
      setData("");
      localStorage.removeItem("pins");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      //Verifica el tiempo que paso desde la ultima solicitud
      let date = localStorage.getItem("dateGetPins");
      const actualDate = new Date();
      if (date && typeof date !== "undefined") {
        setLoading(false);
        const diference = (actualDate.getTime() - date) / 1000;
        if (diference < 30) return data;
      }

      //Solicitud
      localStorage.setItem("dateGetPins", actualDate.getTime());
      await getElements();
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  ///

  useEffect(() => {
    if (!loading || data) {
      if (data) {
        setRenderData(
          <div className={styles.homeCard}>
            <ol className={styles.switches}>
              {
                // eslint-disable-next-line array-callback-return
                data.map((e, i) => {
                  if (e.type === false) {
                    if (e.typeUse === "relay") {
                      return (
                        <>
                          <Switch
                            data={{
                              tittle: e.name,
                              id: e.id,
                              value: e.value,
                              order: e.pin,
                              rooms: e.room,
                              important: e.important,
                              edit: false,
                              index: i,
                            }}
                          />
                        </>
                      );
                    } else {
                      return (
                        <Slider
                          data={{
                            tittle: e.name,
                            id: e.id,
                            value: e.value,
                            order: e.pin,
                            rooms: e.room,
                            important: e.important,
                            edit: false,
                            index: i,
                          }}
                        />
                      );
                    }
                  } else {
                    if (e.typeUse === "dht") {
                      return (
                        <Sensor
                          data={{
                            tittle: e.name,
                            id: e.id,
                            value: e.value,
                            order: e.pin,
                            rooms: e.room,
                            important: e.important,
                            edit: false,
                            index: i,
                          }}
                        />
                      );
                    }
                  }
                })
              }
            </ol>
          </div>
        );
      } else {
        setRenderData(
          <>
            <div className={styles.notFoundDiv}>
              <h1 className={styles.notFound}>No hay elementos activos</h1>
            </div>
          </>
        );
      }
    } else {
      setRenderData(<Loading />);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <>{renderData}</>;
};

import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { Switch } from "Common/Switch";
import { Slider } from "Common/Slider";
import { getPins } from "../../../services";

export const CardScreen = ({ screen }) => {
  //Variables
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem(`pins:${screen}`))
  );
  const [renderData, setRenderData] = useState();

  //funciones

  const getElements = async () => {
    //Obtiene elementos
    try {
      let res = await getPins(screen);
      //Verifica que devuelva los elementos
      if (res.status === 202) {
        if (res.data.pins.length === 0) {
          setData("");

          return;
        } else {
          setData(res.data.pins);
          console.log(data);
          localStorage.setItem(`pins:${screen}`, JSON.stringify(res.data.pins));

          return;
        }
      }

      localStorage.removeItem(`pins:${screen}`);
      setData("");
    } catch (err) {
      setData("");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      let date = localStorage.getItem(`dateGetPins:${screen}`);
      const actualDate = new Date();
      if (date && typeof date !== "undefined") {
        const diference = (actualDate.getTime() - date) / 1000;
        if (diference < 30) return data;
      }
      localStorage.setItem(`dateGetPins:${screen}`, actualDate.getTime());
      return await getElements();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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
                            value: e.value,
                            order: e.pin,
                            rooms: e.room,
                            important: e.important,
                            edit: true,
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
                          important: e.important,
                          rooms: e.room,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <>{renderData}</>;
};

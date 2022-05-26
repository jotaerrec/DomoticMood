import React from "react";
import styles from "./styles.module.scss";
import { Switch } from "../Switch/";
export const HomeCard = () => {
  const dataSwitch = {
    tittle: "Alarma 1",
    value: true,
    order: 1,
  };

  return (
    <>
      <div className={styles.homeCard}>
        <ol className={styles.switches}>
          <Switch data={dataSwitch} />
          <Switch data={{ tittle: "Alarma 2", value: false, order: 2 }} />
        </ol>
      </div>
    </>
  );
};

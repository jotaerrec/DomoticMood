import React from "react";
import styles from "./styles.module.scss";

export const Loading = () => {
  return (
    <div className={styles.loaderBackground}>
      <div className={styles.loader}></div>
    </div>
  );
};

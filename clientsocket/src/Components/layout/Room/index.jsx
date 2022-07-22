import React from "react";
import styles from "./styles.module.scss";
import { URL_API } from "Context/types";

const CardScreen = ({ data }) => {
  return <div className={styles.Data}>{data.section}</div>;
};

export default CardScreen;

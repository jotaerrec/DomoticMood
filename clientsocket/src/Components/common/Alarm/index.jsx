import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import socket from "../../../Controllers/socketapi";
import { URL_API } from "../../../context/types";

export const Switch = ({ data }) => {
  const inputRef = useRef();
  let value = data.value === 0 ? false : true;
  console.log(data);
  const changeState = async () => {
    value = !value;
    inputRef.current.checked = value;
    console.log(`Alarm=[${data.order}, ${value}]`);
    socket.emit("SwitchChange", `Switch=[${data.order},${value}]`);
  };
  return (
    <>
      <li className={styles.checkboxLi}>
        <label for="1">
          <span className={styles.spanTittle}>
            {data.tittle}{" "}
            <div>
              <p>Pin: {data.order}</p>
              <p>{data.rooms}</p>
            </div>
          </span>
          <button
            className={styles.liquidfill}
            id={data.order}
            onClick={changeState}
          ></button>
          <span
            className={styles.spanOrder}
            id={data.order}
            onClick={() => {
              activarRelay();
            }}
          ></span>
        </label>
      </li>
    </>
  );
};

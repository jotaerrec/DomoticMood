import React, { useRef } from "react";
import styles from "./styles.module.scss";
import socket from "../../../Controllers/socketapi";
import { URL_API } from "../../../context/types";

export const Switch = ({ data }) => {
  const inputRef = useRef();
  let value = data.value === 0 ? false : true;
  const rooms = () => {
    if (data.rooms) {
      return (
        <>
          <span>{data.rooms}</span>
        </>
      );
    }
  };
  const activarRelay = async () => {
    value = !value;
    inputRef.current.checked = value;
    console.log(`Switch=[${data.order}, ${value}]`);
    socket.emit("SwitchChange", `Switch=[${data.order}, ${value}]`);
  };
  console.log(data);
  return (
    <>
      <li className={styles.checkboxLi}>
        <input
          type="checkbox"
          id={`input` + data.order}
          checked={value}
          ref={inputRef}
        />
        <label for="1">
          <span className={styles.spanTittle}>
            {data.tittle} <p>{data.order}</p>{" "}
          </span>
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

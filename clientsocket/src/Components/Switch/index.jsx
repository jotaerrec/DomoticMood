import React, { useRef } from "react";
import styles from "./styles.module.scss";
import socket from "../../Controllers/socketapi";

export const Switch = ({ data }) => {
  const inputRef = useRef();
  let value = data.value;
  const rooms = () => {
    if (data.rooms) {
      return (
        <>
          <span>{data.rooms}</span>
        </>
      );
    }
  };
  const activarRelay = () => {
    value = !value;
    inputRef.current.checked = value;
    socket.emit("SwitchChange", `Switch=[${data.order}, ${value}]`);
  };
  return (
    <>
      {rooms()}
      <li className={styles.checkboxLi}>
        <input
          type="checkbox"
          id={`input` + data.order}
          checked={value}
          ref={inputRef}
        />
        <label for="1">
          <span>{data.tittle}</span>
          <span
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

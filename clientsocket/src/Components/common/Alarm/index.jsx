import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import socket from "../../../Controllers/socketapi";

export const Switch = ({ data }) => {
  //Variables
  const inputRef = useRef();
  const [value, setValue] = useState(data.value === 0 ? false : true);

  //Funciones
  const changeState = async () => {
    setValue(!value);
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
              changeState();
            }}
          ></span>
        </label>
      </li>
    </>
  );
};

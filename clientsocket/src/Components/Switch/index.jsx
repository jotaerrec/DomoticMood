import React, { useRef } from "react";
import styles from "./styles.module.scss";
export const Switch = ({ data }) => {
  const inputRef = useRef();
  let value = data.value;
  const activarRelay = (order) => {
    value = !value;
    inputRef.current.checked = value;
  };
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

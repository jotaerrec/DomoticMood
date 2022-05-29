import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import socket from "../../Controllers/socketapi";

export const Slider = ({ data }) => {
  const [Value, setValue] = useState(data.value);
  const inputRef = useRef();
  const handleChange = (newValue) => {
    setValue(inputRef.current.value);
  };
  return (
    <>
      <div className={styles.sliderContainer}>
        <span>{Value}</span>
        <input
          type="range"
          min="0"
          max="100"
          ref={inputRef}
          value={Value}
          onChange={handleChange}
          className={styles.range}
        />
      </div>
    </>
  );
};

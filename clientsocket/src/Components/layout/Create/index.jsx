import React, { useState } from "react";
import FormPin from "./Components/Pin";
import FormRoom from "./Components/Room";
import styles from "./styles.module.scss";

export const AddScreen = () => {
  //Variables
  const [buttonName, setButtonName] = useState("pin");
  //Funciones
  const changeButton = (nameOl) => {
    setButtonName(nameOl);
  };

  return (
    <>
      <div className={`${styles.cardMain} animate__animated animate__fadeIn`}>
        <div className={styles.cardAdd}>
          <ul className={styles.topCard}>
            <ol
              className={buttonName === "pin" ? `${styles.olButton}` : ``}
              onClick={() => {
                changeButton("pin");
              }}
            >
              <p name="pin">Create Pin</p>
            </ol>
            <ol
              className={buttonName === "room" ? `${styles.olButton}` : ``}
              name="room"
              onClick={() => {
                changeButton("room");
              }}
            >
              <p name="room">Create Room</p>
            </ol>
          </ul>
          <div className={styles.cardPin}>
            {buttonName === "pin" ? <FormPin /> : <FormRoom />}
          </div>
        </div>
      </div>
    </>
  );
};

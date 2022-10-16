import React, { useContext, useState } from "react";
import { ScreenContext } from "Context/Screen/ScreenContext";
import styles from "./styles.module.scss";

export const CardMenu = () => {
  //Variables
  const rooms = JSON.parse(localStorage.getItem("rooms"));
  const { setDisplayName } = useContext(ScreenContext);

  //Funciones

  const renderRooms = () => {
    //Renderiza las habitaciones
    return (
      <>
        <ul>
          {rooms.map((e, i) => {
            return (
              <>
                <li>
                  <button
                    onClick={(e) => {
                      setDisplayName(e.target.innerHTML);
                    }}
                  >
                    {e}
                  </button>
                </li>
              </>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <div className={styles.cardMenu}>
      {rooms.length > 0 ? renderRooms() : <h1>No tienes habitaciones.</h1>}
    </div>
  );
};

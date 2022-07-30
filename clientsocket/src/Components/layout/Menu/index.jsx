import React, { useContext, useState } from "react";
import { ScreenContext } from "Context/Screen/ScreenContext";
import styles from "./styles.module.scss";
import { URL_API } from "Context/types";

export const CardMenu = () => {
  const rooms = JSON.parse(localStorage.getItem("rooms"));
  console.log(rooms.length);
  const { setDisplayName } = useContext(ScreenContext);
  const renderRooms = () => {
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

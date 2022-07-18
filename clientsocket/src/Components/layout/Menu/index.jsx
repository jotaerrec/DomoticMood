import React, { useContext } from "react";
import { ScreenContext } from "../../../context/Screen/ScreenContext";
import styles from "./styles.module.scss";
import { URL_API } from "../../../context/types";

export const CardMenu = () => {
  const { setDisplayName } = useContext(ScreenContext);

  return (
    <div className={styles.cardMenu}>
      <ul>
        <li>
          <button
            onClick={(e) => {
              setDisplayName(e.target.innerHTML);
            }}
          >
            {" "}
            Living
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              setDisplayName(e.target.innerHTML);
            }}
          >
            {" "}
            Habitacion 1
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              setDisplayName(e.target.innerHTML);
            }}
          >
            {" "}
            Habitacion 2
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              setDisplayName(e.target.innerHTML);
            }}
          >
            {" "}
            Habitacion 3
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              setDisplayName(e.target.innerHTML);
            }}
          >
            {" "}
            Cocina{" "}
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              setDisplayName(e.target.innerHTML);
            }}
          >
            {" "}
            Habitacion 3
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              setDisplayName(e.target.innerHTML);
            }}
          >
            {" "}
            Cocina{" "}
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              setDisplayName(e.target.innerHTML);
            }}
          >
            {" "}
            Habitacion 3
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              setDisplayName(e.target.innerHTML);
            }}
          >
            {" "}
            Cocina{" "}
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              setDisplayName(e.target.innerHTML);
            }}
          >
            {" "}
            Habitacion 3
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              setDisplayName(e.target.innerHTML);
            }}
          >
            {" "}
            Cocina{" "}
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              setDisplayName(e.target.innerHTML);
            }}
          >
            {" "}
            Habitacion 3
          </button>
        </li>
        <li>
          <button
            onClick={(e) => {
              setDisplayName(e.target.innerHTML);
            }}
          >
            {" "}
            Cocina{" "}
          </button>
        </li>
      </ul>
    </div>
  );
};

import React, {useState, useContext} from "react";
import styles from "./styles.module.scss";
import {ScreenContext} from '../../context/ScreenContext';


export const CardMenu = () => {
  const [Screen, setScreen] = useState({
    on: "home",
  })
  return (
    <div className={styles.cardMenu}>
      <ul>
        <li>
          <button> Living</button>
        </li>
        <li>
          <button> Habitacion 1</button>
        </li>
        <li>
          <button> Habitacion 2</button>
        </li>
        <li>
          <button> Habitacion 3</button>
        </li>
        <li>
          <button> Cocina </button>
        </li>
        <li>
          <button> Habitacion 3</button>
        </li>
        <li>
          <button> Cocina </button>
        </li>
        <li>
          <button> Habitacion 3</button>
        </li>
        <li>
          <button> Cocina </button>
        </li>
        <li>
          <button> Habitacion 3</button>
        </li>
        <li>
          <button> Cocina </button>
        </li>
        <li>
          <button> Habitacion 3</button>
        </li>
        <li>
          <button> Cocina </button>
        </li>
      </ul>
    </div>
  );
};

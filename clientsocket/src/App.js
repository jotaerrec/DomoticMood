import { useState, useEffect } from "react";
import "./App.css";
import styles from "./styles.module.scss";

function App() {
  const [hamburger, setHamburger] = useState({
    open: false,
  });
  return (
    <div className={styles.Home}>
      <div className={styles.Card}>
        <div className={styles.topCard}>
          <div className={styles.cardTittle}>
            <div className={styles.circulo}></div>
            <h1> DomoticMood </h1>
          </div>
          <div
            className={styles.hamburger}
            onClick={() => {
              var stateH = hamburger.open;
              setHamburger({ open: !stateH });
            }}
          >
            <div
              className={hamburger.open ? styles.changeBar1 : styles.bar1}
            ></div>
            <div
              className={hamburger.open ? styles.changeBar2 : styles.bar2}
            ></div>
            <div
              className={hamburger.open ? styles.changeBar3 : styles.bar3}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

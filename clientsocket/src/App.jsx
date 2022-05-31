import { useState } from "react";
import "./App.css";
import styles from "./styles.module.scss";
import { CardMenu } from "./Components/CardMenu/index";
import { HomeCard } from "./Components/HomeCard/index";

const App = () => {
  const [hamburger, setHamburger] = useState({
    open: false,
  });
  return (
    <>
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
          {hamburger.open ? (
            <CardMenu className={styles.cardMenu} />
          ) : (
            <HomeCard className={styles.homeCard} />
          )}
          {/* 
          <div className={hamburger.open ? styles.cardNone : styles.homeCard}>
            <div>Alarma</div>
          </div>
          <div className={hamburger.open ? styles.cardMenu : styles.cardNone}>
            <CardMenu />
          </div> */}
        </div>
      </div>
    </>
  );
};
export default App;

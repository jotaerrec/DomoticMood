import { useState, useContext } from "react";
import { Card } from "./Components/Card";
import { ScreenController } from "./context/Screen/ScreenState";

import "./App.css";
import styles from "./styles.module.scss";


const App = () => {
  return (
    <>
      <div className={styles.Home}>
        <ScreenController>
          <Card />
        </ScreenController>
      </div>
    </>
  );
};
export default App;

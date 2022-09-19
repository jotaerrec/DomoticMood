import React, { useState, useContext } from "react";
import { ScreenContext } from "../../../context/Screen/ScreenContext";
import styles from "./styles.module.scss";
import { URL_API } from "../../../context/types";

const TopCard = (data) => {
  const { screen, setDisplayName } = useContext(ScreenContext);
  const [hamburger, setHamburger] = useState({
    open: data.hamburger,
  });
  const [add, setAdd] = useState(false);
  const [profile, setProfile] = useState(false);

  const hamburgerOpen = () => {
    let stateH = !hamburger.open;
    setHamburger({ open: stateH });
    if (stateH) {
      return setDisplayName("MENU");
    } else {
      return setDisplayName("HOME");
    }
  };

  const ProfileScreen = () => {
    let profileScreen = !profile;
    setProfile(profileScreen);
    if (profileScreen) {
      setDisplayName("PROFILE");
    } else {
      setDisplayName("HOME");
    }
  };

  const openScreenAdd = () => {
    let addScreen = !add;
    setAdd(addScreen);
    if (addScreen) {
      setDisplayName("ADDSCREEN");
      return setHamburger({ open: false });
    }
    if (screen === "ADDSCREEN") {
      setDisplayName("HOME");
    }
  };

  let cardTitle = "DomoticMood";
  return (
    <div className={styles.topCard}>
      <div
        className={styles.cardTitle}
        onClick={() => {
          setDisplayName("HOME");
          setHamburger({ open: false });
          setAdd(false);
        }}
      >
        <div className={styles.circulo}></div>
        <h1> {cardTitle} </h1>
      </div>
      <div className={styles.buttonDiv}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1024px"
          height="1024px"
          title="Logout"
          viewBox="0 0 1024 1024"
          className={styles.logout}
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          <path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z" />
        </svg>
        <div className={styles.profile} onClick={ProfileScreen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            width="45.532px"
            height="45.532px"
            viewBox="0 0 45.532 45.532"
          >
            <g>
              <path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765   S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53   c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012   c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592   c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z" />
            </g>
          </svg>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 251.882 251.882"
          className={add ? styles.rotate : ""}
          onClick={openScreenAdd}
        >
          <g>
            <path d="M215.037,36.846c-49.129-49.128-129.063-49.128-178.191,0c-49.127,49.127-49.127,129.063,0,178.19   c24.564,24.564,56.83,36.846,89.096,36.846s64.531-12.282,89.096-36.846C264.164,165.909,264.164,85.973,215.037,36.846z    M49.574,202.309c-42.109-42.109-42.109-110.626,0-152.735c21.055-21.054,48.711-31.582,76.367-31.582s55.313,10.527,76.367,31.582   c42.109,42.109,42.109,110.626,0,152.735C160.199,244.417,91.683,244.417,49.574,202.309z" />
            <path
              className={styles.add}
              d="M194.823,116.941h-59.882V57.059c0-4.971-4.029-9-9-9s-9,4.029-9,9v59.882H57.059c-4.971,0-9,4.029-9,9s4.029,9,9,9h59.882   v59.882c0,4.971,4.029,9,9,9s9-4.029,9-9v-59.882h59.882c4.971,0,9-4.029,9-9S199.794,116.941,194.823,116.941z"
            />
          </g>
        </svg>
        <div
          className={
            hamburger.open
              ? `${styles.hamburger} ${styles.selected}`
              : styles.hamburger
          }
          onClick={() => {
            hamburgerOpen();
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
        </div>{" "}
      </div>
    </div>
  );
};

export default TopCard;

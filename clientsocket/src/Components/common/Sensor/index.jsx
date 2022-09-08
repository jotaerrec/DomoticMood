import React, { useState, useRef, useEffect } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import socket from "Controllers/socketapi";
import { URL_API } from "../../../context/types";
import { gsap } from "gsap";

export const Sensor = ({ data }) => {
  const inputRef = useRef();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(data.value);
  const [tittle, setTittle] = useState(data.tittle);
  const [response, setResponse] = useState();
  console.log(data.tittle);
  useEffect(() => {
    socket.on(`SensorValue=${data.order}`, async (data) => {
      setValue(data);
    });
  }, []);

  const updateTittle = async () => {
    try {
      let res = await axios({
        url: URL_API + "/pins/",
        method: "put",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
        data: {
          pin: data.order,
          name: tittle,
        },
      });
      console.log(res);
      if (res.status === 202) {
        // test for status you want, etc
        setResponse({ error: "" });
        setEdit(false);
        return console.log(res.status);
      }
      setTittle(data.tittle);
      setEdit(false);
      return setResponse({ error: res.data.error });
      // Don't forget to return something
    } catch (err) {
      setResponse({ error: "Problema con la api" });
      setTittle(data.tittle);
      setEdit(false);
      console.log(err);
    }
  };
  const HandleChange = (e) => {
    setTittle(e.target.value);
  };
  return (
    <li className={styles.checkboxLi}>
      <input
        type="checkbox"
        id={`input` + data.order}
        checked={value}
        ref={inputRef}
      />
      <label for="1">
        <span className={styles.spanTittle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Layer_1"
            viewBox="0 0 502.001 502.001"
            onClick={() => {
              setEdit(true);
            }}
          >
            <g>
              <g>
                <g>
                  <path d="M489.809,32.002l-19.797-19.798C462.142,4.333,451.679,0,440.551,0s-21.59,4.333-29.459,12.202l-14.99,14.99     l-1.959-1.959c-3.905-3.904-10.235-3.905-14.143,0L62.146,343.088l0.011,0.004c-0.911,0.91-1.658,1.992-2.169,3.215     l-29.102,69.719L0.782,488.148c-1.562,3.742-0.71,8.056,2.157,10.923c1.913,1.914,4.472,2.93,7.073,2.93     c1.297,0,2.605-0.252,3.851-0.772l72.123-30.105c0.002-0.001,0.004-0.002,0.005-0.003l69.712-29.099     c1.223-0.51,2.305-1.257,3.215-2.168l0.004,0.011L476.778,122.01c1.875-1.875,2.929-4.419,2.929-7.071     c0-2.652-1.054-5.196-2.929-7.071l-1.959-1.959l14.99-14.989C506.052,74.676,506.052,48.246,489.809,32.002z M28.611,473.399     L43.596,437.5l20.915,20.914L28.611,473.399z M84.466,450.085l-32.541-32.54l20.772-49.763l61.532,61.531L84.466,450.085z      M151.852,418.65L83.36,350.159l271.839-271.84l68.492,68.492L151.852,418.65z M437.834,132.669l-68.492-68.492l17.73-17.73     l68.492,68.492L437.834,132.669z M475.666,76.776L460.822,91.62l-50.431-50.432l14.844-14.844     c4.091-4.091,9.53-6.344,15.316-6.344s11.227,2.253,15.317,6.344l19.797,19.797C484.111,54.588,484.111,68.33,475.666,76.776z" />
                  <path d="M255.258,199.397L110.627,344.029c-3.905,3.905-3.905,10.237,0,14.143c1.953,1.953,4.512,2.929,7.071,2.929     s5.118-0.977,7.071-2.929l144.632-144.633c3.905-3.905,3.905-10.237,0-14.142C265.495,195.492,259.165,195.492,255.258,199.397z" />
                  <path d="M300.255,154.4l-18.213,18.213c-3.905,3.905-3.905,10.237,0,14.143c1.953,1.952,4.512,2.929,7.071,2.929     s5.118-0.977,7.071-2.929l18.213-18.213c3.906-3.905,3.906-10.237,0.001-14.143C310.492,150.496,304.162,150.496,300.255,154.4z" />
                </g>
              </g>
            </g>
          </svg>
          {edit ? (
            <div className={styles.inputTittle}>
              <input
                onChange={HandleChange}
                value={tittle}
                name="tittle"
                id="tittle"
                type="text"
              />
              <div>
                <svg
                  className={styles.confirm}
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.0"
                  width="12pt"
                  height="12pt"
                  viewBox="0 0 1248.000000 1280.000000"
                  onClick={updateTittle}
                >
                  <g
                    transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                    stroke="none"
                  >
                    <path d="M10990 12794 c-148 -18 -348 -78 -471 -139 -171 -87 -363 -246 -469 -390 -25 -33 -1255 -1609 -2733 -3503 -1740 -2227 -2693 -3440 -2700 -3435 -55 33 -2153 1554 -2234 1620 -244 198 -479 321 -738 389 -135 35 -374 45 -519 20 -558 -95 -991 -521 -1103 -1084 -12 -61 -17 -136 -17 -252 -1 -179 18 -297 71 -444 36 -101 125 -270 181 -346 27 -36 462 -535 967 -1110 1869 -2125 2583 -2940 3089 -3522 l519 -597 27 37 c153 212 7390 10657 7431 10725 317 525 223 1224 -222 1653 -251 241 -556 370 -899 378 -80 3 -161 2 -180 0z" />
                  </g>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.reject}
                  viewBox="0 0 460.775 460.775"
                  onClick={() => {
                    setTittle(data.tittle);
                    setEdit(false);
                  }}
                >
                  <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                </svg>
              </div>
            </div>
          ) : (
            tittle
          )}
          <div>
            <p>Pin: {data.order}</p>
            <p>{data.rooms}</p>
          </div>
        </span>
        <div className={styles.center}>
          <div className={styles.speedometr}>
            <svg className={styles.speed} viewBox="0 0 400 342">
              <defs>
                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#00a8ff"></stop>
                  <stop offset="25%" stop-color="#01efac"></stop>
                  <stop offset="50%" stop-color="#14ff00"></stop>
                  <stop offset="75%" stop-color="#ffeb00"></stop>
                  <stop offset="100%" stop-color="#ff7300"></stop>
                </linearGradient>
              </defs>
              <defs>
                <linearGradient id="linear2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" stop-color="#fff" />

                  <stop offset="90%" stop-color="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <defs>
                <filter id="f4" x="0" y="0" width="200%" height="200%">
                  <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" />

                  <feGaussianBlur
                    result="blurOut"
                    in="matrixOut"
                    stdDeviation="25"
                  />
                  <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                </filter>
              </defs>
              <defs>
                <filter id="f1" x="0" y="0">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
                </filter>
              </defs>

              <path
                className={styles.arc2}
                id="arc2"
                transform="scale(0.9 0.9) translate(20 18)"
                stroke="url(#linear)"
                filter="url(#f1)"
                d="m 66.906305,293.33748 a 160.10918,160.10918 0 0 1 10e-7,-226.428566 a 160.10918,160.10918 0 0 1 226.428574,10e-7 a 160.10918,160.10918 0 0 1 -10e-6,226.428565"
              />
              <path
                className={styles.pathArc}
                id="path"
                d="m 66.906305,293.33748 a 160.10918,160.10918 0 0 1 10e-7,-226.428566 a 160.10918,160.10918 0 0 1 226.428574,10e-7 a 160.10918,160.10918 0 0 1 -10e-6,226.428565"
              />
              <path
                className={styles.arc}
                stroke="url(#linear)"
                id="arc"
                d="m 66.906305,293.33748 a 160.10918,160.10918 0 0 1 10e-7,-226.428566 a 160.10918,160.10918 0 0 1 226.428574,10e-7 a 160.10918,160.10918 0 0 1 -10e-6,226.428565"
              />

              <line
                className={styles.line}
                x1="53"
                y1="306"
                x2="180"
                y2="180"
              />
              {/*<polygon
                className={styles.polygonLine}
                id="bigLine"
                fill="url(#linear2)"
                points="180,168 180,192  65,188  65,172"
                transform="rotate(180 95 200  )"
              />*/}

              <line
                className={styles.metka}
                x1="180"
                y1="14"
                x2="180"
                y2="26"
                transform="rotate(226 180 180)"
              ></line>
              <line
                className={styles.metka}
                x1="180"
                y1="14"
                x2="180"
                y2="26"
                transform="rotate(270 180 180)"
              ></line>
              <line
                className={styles.metka}
                x1="180"
                y1="14"
                x2="180"
                y2="26"
                transform="rotate(315 180 180)"
              ></line>
              <line
                className={styles.metka}
                x1="180"
                y1="14"
                x2="180"
                y2="26"
                transform="rotate(405 180 180)"
              ></line>
              <line
                className={styles.metka}
                x1="180"
                y1="14"
                x2="180"
                y2="26"
                transform="rotate(450 180 180)"
              ></line>
              <line
                className={styles.metka}
                x1="180"
                y1="14"
                x2="180"
                y2="26"
                transform="rotate(494 180 180)"
              ></line>
              <line
                className={styles.metka}
                x1="180"
                y1="14"
                x2="180"
                y2="26"
              ></line>

              <text x="85" y="275" className={styles.number}>
                0
              </text>
              <text x="50" y="187" className={styles.number}>
                5
              </text>
              <text x="82" y="100" className={styles.number}>
                10
              </text>
              <text x="170" y="60" className={styles.number}>
                15
              </text>
              <text x="255" y="100" className={styles.number}>
                20
              </text>
              <text x="292" y="187" className={styles.number}>
                25
              </text>
              <text x="255" y="275" className={styles.number}>
                30
              </text>
            </svg>
            <input type="range" value={data.value} className={styles.range} />
            <div id="speed-number" className={styles.speedNumber}>
              {value}
            </div>
          </div>
        </div>
      </label>
    </li>
  );
};

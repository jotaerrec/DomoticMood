import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import socket from "../../../Controllers/socketapi";
import { updatePins } from "Services/";
import { updateImportant } from "../../../services";

export const Switch = ({ data }) => {
  // Variables
  const inputRef = useRef();
  const [edit, setEdit] = useState(false);
  const [tittle, setTittle] = useState(data.tittle);
  const [response, setResponse] = useState();
  const [important, setImportant] = useState(data.important);
  const [value, setValue] = useState(data.value === 0 ? false : true);

  const changeImportant = async () => {
    //Sacar o poner en destacado
    try {
      // Petición a api
      let res = await updateImportant(data.order, tittle, !important);

      if (res.status !== 202) {
        return setResponse({ error: res.data.error });
      }

      //No hubo errores
      setImportant(!important);
      setResponse({ error: "" });
    } catch (err) {
      // Error con la api
      setResponse({ error: "Problema con la api" });
      setTittle(data.tittle);
      setEdit(false);
      console.log(err);
    }
    let pins = JSON.parse(localStorage.getItem("pins"));
    if (important) {
      let pin = {
        id: data.id,
        pin: data.order,
        name: tittle,
        value: value,
        important: important,
        rooms: data.room,
      };
      pins.push(pin);
    } else {
      delete pins[data.index];
    }
  };
  const activarRelay = async () => {
    setValue(!value);
    inputRef.current.checked = value;
    socket.emit(
      "SwitchChange",
      `Switch=[${data.order},${value}]token:${JSON.parse(
        localStorage.getItem("x-access-token")
      )}`
    );
  };

  const updateTittle = async () => {
    //Actualizar nombre
    try {
      let res = await updatePins(data.order, tittle);
      if (res.status === 202) {
        setResponse({ error: "" });
        setEdit(false);
        return console.log(res.status);
      }
      setTittle(data.tittle);
      setEdit(false);
      return setResponse({ error: res.data.error });
    } catch (err) {
      setResponse({ error: "Problema con la api" });
      setTittle(data.tittle);
      setEdit(false);
      console.log(err);
    }
  };

  const HandleChange = (e) => {
    //Obtener el cambio de nombre
    setTittle(e.target.value);
  };

  const rejectChange = () => {
    //Cancelar cambios
    setTittle(data.tittle);
    setEdit(false);
  };
  return (
    <>
      <li className={styles.checkboxLi}>
        <input
          type="checkbox"
          id={`input` + data.order}
          checked={value}
          ref={inputRef}
        />
        <label for="1">
          <span className={styles.spanTittle}>
            {data.edit === true ? (
              <>
                <svg
                  className={important ? styles.starActive : styles.star}
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 526.673 526.673"
                  onClick={changeImportant}
                >
                  <g>
                    <g>
                      <path d="M526.673,204.221l-195.529-7.76L263.337,12.885l-67.798,183.577L0,204.221l153.635,121.202l-53.048,188.365    l162.75-108.664l162.75,108.664l-53.048-188.365L526.673,204.221z M392.683,467.808l-129.346-86.356L133.99,467.808    l42.163-149.692L54.058,221.779l155.404-6.163l53.875-145.885l53.885,145.885l155.394,6.163l-122.096,96.337L392.683,467.808z" />
                    </g>
                  </g>
                </svg>
                <svg
                  className={styles.edit}
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
              </>
            ) : (
              <>
                <svg
                  className={styles.starActive}
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 526.673 526.673"
                  onClick={changeImportant}
                >
                  <g>
                    <g>
                      <path d="M526.673,204.221l-195.529-7.76L263.337,12.885l-67.798,183.577L0,204.221l153.635,121.202l-53.048,188.365    l162.75-108.664l162.75,108.664l-53.048-188.365L526.673,204.221z M392.683,467.808l-129.346-86.356L133.99,467.808    l42.163-149.692L54.058,221.779l155.404-6.163l53.875-145.885l53.885,145.885l155.394,6.163l-122.096,96.337L392.683,467.808z" />
                    </g>
                  </g>
                </svg>
              </>
            )}

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
                    onClick={rejectChange}
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
          <span
            className={styles.spanOrder}
            id={data.order}
            onClick={activarRelay}
          ></span>
        </label>
      </li>
    </>
  );
};

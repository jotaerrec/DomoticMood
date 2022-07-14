import React, { useState } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import { URL_API } from "../../context/types";

export const AddScreen = () => {
  const [response, setResponse] = useState({
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    pin: "",
    type: "",
    typeUse: "",
    room: "",
  });
  const [buttonName, setButtonName] = useState("pin");
  const HandleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const changeButton = (nameOl) => {
    setButtonName(nameOl);
  };
  const createPin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await axios({
        url: URL_API + "/pins/",
        method: "post",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
        data: data,
      });
      console.log(res);
      if (res.status < 400 && !res.data.error) {
        // test for status you want, etc
        setResponse(res.data);

        console.log(res.status);
      }

      setLoading(false);
      return setResponse({ error: res.data.error });
      // Don't forget to return something
    } catch (err) {
      setResponse({ error: "Problema con la api" });
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      <div className={`${styles.cardMain} animate__animated animate__fadeIn`}>
        <div className={styles.cardAdd}>
          <ul className={styles.topCard}>
            <ol
              className={buttonName === "pin" ? `${styles.olButton}` : ``}
              onClick={() => {
                changeButton("pin");
              }}
            >
              <p name="pin">Create Pin</p>
            </ol>
            <ol
              className={buttonName === "room" ? `${styles.olButton}` : ``}
              name="room"
              onClick={() => {
                changeButton("room");
              }}
            >
              <p name="room">Create Room</p>
            </ol>
          </ul>
          <div className={styles.cardPin}>
            <form action="" onSubmit={createPin}>
              <h2>Agrega el pin y su funcion.</h2>
              <div className={styles.inputContainer}>
                <div className={styles.left}>
                  <label htmlFor="name">Nombre</label>
                  <input
                    onChange={(e) => HandleChange(e)}
                    value={data.name}
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Nombre..."
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.left}>
                  <label htmlFor="type">Tipo</label>
                  <select
                    id="type"
                    name="type"
                    onChange={(e) => HandleChange(e)}
                  >
                    <option value="" disabled selected hidden>
                      Tipo de pin
                    </option>
                    <option value="false">OUTPUT</option>
                    <option value="true">INPUT</option>
                  </select>
                </div>
              </div>
              {data.type === "true" ? (
                <div className={styles.inputContainer}>
                  <div className={styles.left}>
                    <label htmlFor="typeUse">Tipo de entrada</label>
                    <select
                      id="typeUse"
                      name="typeUse"
                      onChange={(e) => HandleChange(e)}
                    >
                      <option value="" disabled selected hidden>
                        Tipo de uso
                      </option>
                      <option value="sensor">Sensor</option>
                      <option value="dimmer">Dimmer</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className={styles.inputContainer}>
                  <div className={styles.left}>
                    <label htmlFor="typeUse">Tipo de salida</label>
                    <select
                      id="typeUse"
                      name="typeUse"
                      onChange={(e) => HandleChange(e)}
                    >
                      <option value="" disabled selected hidden>
                        Tipo de uso
                      </option>
                      <option value="relay">Relay</option>
                      <option value="alarm">Alarma</option>
                    </select>
                  </div>
                </div>
              )}
              <div className={styles.inputContainer}>
                <div className={styles.left}>
                  <label htmlFor="room">Habitación</label>
                  <input
                    onChange={(e) => HandleChange(e)}
                    value={data.room}
                    name="room"
                    id="room"
                    type="text"
                    placeholder="Habitación..."
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.left}>
                  <label htmlFor="pin">Pin</label>
                  <input
                    onChange={(e) => HandleChange(e)}
                    value={data.pin}
                    name="pin"
                    id="pin"
                    type="text"
                    placeholder="Pin..."
                    autoComplete="off"
                  />
                </div>
              </div>
              <button className={styles.buttonCreate} type="submit">
                {loading ? "Cargando..." : "Crear Pin"}
              </button>

              {response.error && (
                <div className={styles.toast}>{response.error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

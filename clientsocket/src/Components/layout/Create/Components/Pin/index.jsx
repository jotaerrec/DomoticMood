import React, { useState } from "react";
import styles from "./styles.module.scss";
import { newPin } from "Services/";
import { Loading } from "../../../../common/Loading";

const FormPin = () => {
  //Variables

  const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
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

  //Funciones
  const roomsItems = () => {
    //Recorre la habitación
    if (rooms.length > 0) {
      return (
        <>
          <option value="" disabled selected hidden>
            Habitación
          </option>
          {rooms.map((room, i) => (
            <option value={room} key={i}>
              {room}
            </option>
          ))}
        </>
      );
    } else {
      return (
        <>
          <option value="" disabled selected>
            No tienes habitaciones!
          </option>
        </>
      );
    }
  };

  const createPin = async (e) => {
    //Funcion para crear pin
    e.preventDefault();
    try {
      setLoading(true);
      let res = await newPin(data);
      if (res.status === 202 && !res.data.error) {
        // test for status you want, etc
        setResponse({ error: "" });
        console.log(res);
        let pinsRoom = {};
        localStorage.removeItem("dateGetPins");
        try {
          localStorage.removeItem(`dateGetPins:${data.room}`);
        } catch (error) {}
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

  const HandleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <form action="" onSubmit={createPin}>
      {loading ? (
        <Loading />
      ) : (
        <>
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
              <select id="type" name="type" onChange={(e) => HandleChange(e)}>
                <option value="" disabled selected hidden>
                  Tipo de pin
                </option>
                <option value="false">Salida</option>
                <option value="true">Entrada</option>
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
                  <option value="dht11">DHT11</option>
                  <option value="dht22">DHT22</option>
                  <option value="mq2">MQ2</option>
                  <option value="higrometro">HIGROMETRO</option>
                  <option value="llama">Sensor llama</option>
                  <option value="pir">PIR</option>
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
                </select>
              </div>
            </div>
          )}
          <div className={styles.inputContainer}>
            <div className={styles.left}>
              <label htmlFor="room">Habitación</label>
              <select id="room" name="room" onChange={(e) => HandleChange(e)}>
                {roomsItems()}
              </select>
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
        </>
      )}
    </form>
  );
};

export default FormPin;

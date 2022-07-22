import React, { useState } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import { URL_API } from "Context/types";

const FormRoom = () => {
  const [response, setResponse] = useState({
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
  });
  const createRoom = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await axios({
        url: URL_API + "/rooms/",
        method: "post",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
        data: data,
      });
      console.log(res);
      if (res.status === 201) {
        setResponse(res.data);
        let newRoom = JSON.parse(localStorage.getItem("rooms"));
        typeof newRoom === Array
          ? newRoom.concat(data.name)
          : (newRoom = [data.name]);
        localStorage.setItem(JSON.stringify(newRoom));
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
    <form action="" onSubmit={createRoom}>
      <h2>Agrega la Habitación.</h2>
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
      <button className={styles.buttonCreate} type="submit">
        {loading ? "Cargando..." : "Crear Habitación"}
      </button>

      {response.error && <div className={styles.toast}>{response.error}</div>}
    </form>
  );
};

export default FormRoom;

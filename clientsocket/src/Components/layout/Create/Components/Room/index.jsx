import React, { useState } from "react";
import styles from "./styles.module.scss";
import { newRoom } from "Services/";

const FormRoom = () => {
  //Varialbes
  const [response, setResponse] = useState({
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
  });

  //Funciones
  const createRoom = async (e) => {
    //Crear habitación
    e.preventDefault();
    try {
      setLoading(true);
      let res = await newRoom(data);

      if (res.status === 201) {
        setResponse(res.data);
        localStorage.setItem("rooms", JSON.stringify(res.data.rooms));
        setResponse({ error: "" });
      }

      setLoading(false);
      return setResponse({ error: res.data.error });
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

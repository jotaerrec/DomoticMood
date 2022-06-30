import React, { useState } from "react";
import styles from "./styles.module.scss";

export const AddScreen = () => {
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    pin: "",
    type: "",
    typeUse: "",
    room: "",
  });
  const HandleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className={`${styles.cardMain} animate__animated animate__fadeIn`}>
        <div className={styles.cardAdd}>
          <ul className={styles.topCard}>
            <ol className={styles.olButton}>
              <p>Create Pin</p>
            </ol>
            <ol>
              <p>Create Room</p>
            </ol>
          </ul>
          <div className={styles.cardPin}>
            <form action="">
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
                  <input
                    onChange={(e) => HandleChange(e)}
                    value={data.type}
                    name="type"
                    id="type"
                    type="text"
                    placeholder="Tipo..."
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.left}>
                  <label htmlFor="typeUse">Tipo de uso</label>
                  <input
                    onChange={(e) => HandleChange(e)}
                    value={data.typeUse}
                    name="typeUse"
                    id="typeUse"
                    type="text"
                    placeholder="Tipo de uso..."
                    autoComplete="off"
                  />
                </div>
              </div>
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

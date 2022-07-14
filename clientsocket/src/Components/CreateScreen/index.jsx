import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import { URL_API } from "../../context/types";

export const HomeCard = () => {
  const [response, setResponse] = useState();
  const [data, setData] = useState([
    {
      name: "",
      pin: "",
      type: null,
      typeUse: "",
      room: "",
    },
  ]);
  const dataSwitch = {
    tittle: "Alarma 1",
    value: true,
    order: 1,
  };
  const createPin = async () => {
    try {
      let res = await axios({
        url: URL_API + "/pins/",
        method: "post",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          "x-access-token": JSON.parse(localStorage.getItem("x-access-token")),
        },
        body: data,
      });
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.status);
      }
      // Don't forget to return something
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div>
        <li>
          <input type="text" value={data.name} placeholder="Name..." />
        </li>
        <li>
          <input type="text" value={data.pin} placeholder="Pin..." />
        </li>
        <li>
          <input type="text" value={data.type} placeholder="Type..." />
        </li>
        <li>
          <input
            type="text"
            value={data.typeUse}
            placeholder="Type the use..."
          />
        </li>
        <li>
          <input type="text" value={data.room} placeholder="Room..." />
        </li>
        <button type="submit" onSubmit={createPin}>
          Submit
        </button>
      </div>
    </>
  );
};

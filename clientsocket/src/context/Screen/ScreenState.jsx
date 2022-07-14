import React, { useState } from "react";
import { ScreenContext } from "./ScreenContext";

export const ScreenController = (props) => {
  const initialState = {
    displayName: "",
    props: "",
  };

  const [screen, setScreen] = useState(initialState);

  const setDisplayName = (name, arg) => {
    let props;
    !arg ? (props = "") : (props = arg);
    if (screen.displayName !== name) {
      setScreen({
        displayName: name,
        props: props,
      });
    }
  };

  return (
    <ScreenContext.Provider
      value={{
        screen: screen.displayName,
        props: props,
        setDisplayName,
      }}
    >
      {props.children}
    </ScreenContext.Provider>
  );
};

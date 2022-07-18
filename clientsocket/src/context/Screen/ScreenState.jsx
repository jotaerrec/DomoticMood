import React, { useState } from "react";
import { ScreenContext } from "./ScreenContext";

export const ScreenController = (props) => {
  const initialState = {
    displayName: "",
    notifications: "",
  };

  const [screen, setScreen] = useState(initialState);

  const setDisplayName = (name, arg) => {
    let notifications;
    !arg ? (notifications = "") : (notifications = arg);
    if (screen.displayName !== name) {
      setScreen({
        displayName: name,
        notifications: notifications,
      });
    }
  };

  return (
    <ScreenContext.Provider
      value={{
        screen: screen.displayName,
        notifications: screen.notifications,
        setDisplayName,
      }}
    >
      {props.children}
    </ScreenContext.Provider>
  );
};

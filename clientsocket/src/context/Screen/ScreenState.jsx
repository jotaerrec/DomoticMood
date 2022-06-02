import React, { useState } from 'react';
import { ScreenContext } from './ScreenContext';

export const ScreenController = (props) => {
  const initialState = {
    displayName: "HOME"
  }

  const [screen, setScreen] = useState(initialState)

  const setDisplayName = (name) => {
    if (screen.displayName != name) {
      setScreen({
        displayName: name
      })
    }

  }

  return (
    <ScreenContext.Provider
      value={{
        screen: screen.displayName,
        setDisplayName
      }}
    >
      {props.children}
    </ScreenContext.Provider>
  )
}

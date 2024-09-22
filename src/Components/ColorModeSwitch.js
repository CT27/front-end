// ColorModeSwitch.js
import React, { useContext } from "react";
import { ColorModeContext } from "./ColorModeContext";

const ColorModeSwitch = () => {
  const { isDarkMode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <button className="btn btn-secondary" onClick={toggleColorMode}>
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

export default ColorModeSwitch;

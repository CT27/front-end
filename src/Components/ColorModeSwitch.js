import React, { useContext } from "react";
import { ColorModeContext } from "./ColorModeContext";

const ColorModeSwitch = () => {
  const { isDarkMode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <button className="btn btn-secondary" onClick={toggleColorMode}>
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ColorModeSwitch;

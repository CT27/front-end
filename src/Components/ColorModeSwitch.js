import React, { useContext } from "react";
import { ColorModeContext } from "./ColorModeContext";
import "../index.css"; // Import your custom global styles first

const ColorModeSwitch = () => {
  const { isDarkMode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <label className="slider-switch">
      <input type="checkbox" checked={isDarkMode} onChange={toggleColorMode} />
      <span className="slider"></span>
    </label>
  );
};

export default ColorModeSwitch;

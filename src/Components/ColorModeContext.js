// ColorModeContext.js
import React, { createContext, useState, useEffect } from "react";

const ColorModeContext = createContext();

const ColorModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check the local storage and system preferences on first load
  useEffect(() => {
    const savedMode = localStorage.getItem("colorMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // If there's a saved mode, use it, otherwise use system preference
    const initialMode = savedMode ? savedMode === "dark" : prefersDark;
    setIsDarkMode(initialMode);

    // Apply the dark mode class if necessary
    if (initialMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  // Update the DOM and localStorage when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("colorMode", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleColorMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ColorModeContext.Provider value={{ isDarkMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export { ColorModeContext, ColorModeProvider };

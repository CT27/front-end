import React, { createContext, useState, useEffect } from "react";

const ColorModeContext = createContext();

const ColorModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode based on system preference or saved mode
  useEffect(() => {
    const savedMode = localStorage.getItem("colorMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const defaultDarkMode = savedMode === "dark" || (!savedMode && prefersDark);

    setIsDarkMode(defaultDarkMode);

    if (defaultDarkMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  // Toggle dark mode class on body and save preference to localStorage
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

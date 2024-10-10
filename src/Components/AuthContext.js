import React, { createContext, useState, useEffect } from "react";
import "../index.css"; // Import your global styles first
import "bootstrap/dist/css/bootstrap.min.css"; // Then Bootstrap

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Clear any old localStorage user data on app load
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userProfilePicture");

    // Check session storage for user data on initialization
    const storedUserData = JSON.parse(sessionStorage.getItem("userData"));

    if (storedUserData) {
      setUserData(storedUserData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setUserData(user);
    // Optionally store user data in sessionStorage for persistence between page reloads
    sessionStorage.setItem("userData", JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    // Clear session storage when logging out
    sessionStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

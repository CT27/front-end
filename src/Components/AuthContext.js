import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load userData from local storage on initialization
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedUserProfilePicture = localStorage.getItem("userProfilePicture");

    if (storedUserId && storedUserName && storedUserEmail) {
      setUserData({
        id: storedUserId,
        name: storedUserName,
        email: storedUserEmail,
        profilePicture: storedUserProfilePicture,
      });
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user) => {
    setIsAuthenticated(true);
    setUserData(user);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userProfilePicture", user.profilePicture || "");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userProfilePicture");
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

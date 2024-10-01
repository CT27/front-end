import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./index.css"; // Import your global styles first
import "bootstrap/dist/css/bootstrap.min.css";
import LoginSignup from "./Components/LoginSignup";
import Dashboard from "./Components/Dashboard";
import ForgotPassword from "./Components/ForgotPassword";
import Profile from "./Components/Profile";
import About from "./Components/About";
import Verification from "./Components/Verification";
import Contact from "./Components/Contact";
import { ColorModeContext } from "./Components/ColorModeContext"; // Import your ColorMode context

function App() {
  const { isDarkMode } = useContext(ColorModeContext); // Access the dark mode state

  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

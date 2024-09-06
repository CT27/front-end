import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

import { HiOutlineMail, HiOutlineUser, HiOutlineKey } from "react-icons/hi";
import axios from "axios";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, setUserData } = useContext(AuthContext); // Get login and setUserData from context
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    console.log("API URL:", apiUrl);
  }, [apiUrl]);
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email and password are required.");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        email,
        password,
      });

      const user = response.data.user;
      console.log("Login successful:", user);

      if (user && user.id) {
        // Update global user data and authentication status
        login(user);

        console.log("User data updated in context:", user);

        navigate("/dashboard", { state: user });
      } else {
        throw new Error("Invalid user data returned from API");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMessage(error.response?.data?.message || error.message);
    }
  };

  // const handleSignup = async () => {
  //   if (name === "" || password === "" || email === "") {
  //     setErrorMessage("Name, email, and password are required.");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(`${apiUrl}/api/signup`, {
  //       name,
  //       email,
  //       password,
  //     });
  //     console.log("Signup response:", response.data);

  //     const newUser = response.data.user;

  //     if (newUser && newUser.id) {
  //       // Store in localStorage
  //       localStorage.setItem("userId", newUser.id);
  //       localStorage.setItem("userName", newUser.name);
  //       localStorage.setItem("userEmail", newUser.email);
  //       localStorage.setItem(
  //         "userProfilePicture",
  //         newUser.profilePicture || ""
  //       );

  //       // Update global user data
  //       setUserData(newUser);

  //       console.log("Stored user data in local storage: ", {
  //         userId: newUser.id,
  //         userName: newUser.name,
  //         userEmail: newUser.email,
  //         userProfilePicture: newUser.profilePicture || "",
  //       });

  //       navigate("/login"); // Redirect to login page instead of dashboard
  //     } else {
  //       throw new Error("Invalid user data returned from API");
  //     }
  //   } catch (error) {
  //     console.error("Signup error:", error.message);
  //     setErrorMessage(error.response?.data?.message || error.message);
  //   }
  // };

  const handleSignup = async () => {
    if (name === "" || password === "" || email === "") {
      setErrorMessage("Name, email, and password are required.");
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/api/signup`, {
        name,
        email,
        password,
      });
      console.log("Signup response:", response.data);

      const newUser = response.data.user;

      if (newUser && newUser.id) {
        // Store in localStorage
        localStorage.setItem("userId", newUser.id);
        localStorage.setItem("userName", newUser.name);
        localStorage.setItem("userEmail", newUser.email);
        localStorage.setItem(
          "userProfilePicture",
          newUser.profilePicture || ""
        );

        // Update global user data and log the user in
        login(newUser);

        console.log("User signed up and logged in:", newUser);

        navigate("/dashboard", { state: newUser }); // Redirect to dashboard
      } else {
        throw new Error("Invalid user data returned from API");
      }
    } catch (error) {
      console.error("Signup error:", error.message);
      setErrorMessage(error.response?.data?.message || error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "Login") {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-lg login-signup-card">
        <div className="text-center mb-4">
          <h1>{action}</h1>
          <hr className="my-4" />
        </div>
        <div className="d-flex justify-content-center mb-3">
          <button
            type="button"
            className={`btn ${
              action === "Sign Up"
                ? "btn-light text-dark"
                : "btn-dark text-white"
            }`}
            onClick={() => setAction("Sign Up")}
          >
            Sign Up
          </button>
          <button
            type="button"
            className={`btn ms-2 ${
              action === "Login" ? "btn-light text-dark" : "btn-dark text-white"
            }`}
            onClick={() => setAction("Login")}
          >
            Login
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {action === "Sign Up" && (
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                <HiOutlineUser className="me-2" /> Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              <HiOutlineMail className="me-2" /> Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              <HiOutlineKey className="me-2" /> Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {action === "Login" && (
            <div className="mb-3 text-end">
              <Link to="/forgotpassword" className="text-dark">
                Lost password? Click Here
              </Link>
            </div>
          )}
          <div className="d-grid">
            <button type="submit" className="btn btn-dark text-white">
              Submit
            </button>
          </div>
          {errorMessage && (
            <div className="alert alert-danger mt-3">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;

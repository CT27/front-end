import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../index.css"; // Import your custom global styles first
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Import AuthContext

const EditProfile = ({ userData, onProfileUpdated }) => {
  const [user, setUser] = useState({ ...userData });
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { setUserData } = useContext(AuthContext); // Access setUserData from context

  useEffect(() => {
    if (!userData) {
      console.log("No user ID provided.");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users/${userData.id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userData, apiUrl]);

  const handleSave = async () => {
    try {
      const updatedUser = { ...user };

      // Avoid sending empty password
      if (!user.password) {
        delete updatedUser.password;
      }

      const response = await axios.put(
        `${apiUrl}/api/users/${user.id}`,
        updatedUser
      );
      console.log("Profile updated successfully:", response.data);

      setUserData(response.data); // Update the user data in context
      onProfileUpdated(response.data); // Call the parent function to handle the update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="card p-4 edit-profile-card text-center shadow-sm">
      <div className="card-title text-center">
        <h2>Edit Profile</h2>
        <hr />
      </div>

      {/* Name Field */}
      <div className="mb-4 text-start">
        <label className="form-label" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>

      {/* Email Field */}
      <div className="mb-4 text-start">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>

      {/* Profile Picture Field */}
      <div className="mb-4 text-start">
        <label className="form-label" htmlFor="profilePicture">
          Profile Picture URL
        </label>
        <input
          type="text"
          id="profilePicture"
          className="form-control"
          name="profilePicture"
          value={user.profilePicture}
          onChange={handleChange}
        />
      </div>

      {/* Password Field */}
      <div className="mb-4 text-start">
        <label className="form-label" htmlFor="password">
          New Password (optional)
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          name="password"
          value={user.password || ""}
          onChange={handleChange}
          placeholder="Enter new password or leave blank"
        />
      </div>

      {/* Buttons */}
      <div className="d-grid gap-2">
        <button className="btn btn-dark text-white w-100" onClick={handleSave}>
          Save
        </button>
        <button
          className="btn btn-dark text-white w-100"
          onClick={() => {
            onProfileUpdated(userData);
            navigate("/dashboard", { state: userData });
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProfile;

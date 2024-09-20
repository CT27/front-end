import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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

      if (!user.password) {
        delete updatedUser.password;
      }

      const response = await axios.put(
        `${apiUrl}/api/users/${user.id}`,
        updatedUser
      );
      console.log("Profile updated successfully:", response.data);

      setUserData(response.data);

      onProfileUpdated(response.data);
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
    // <div className="edit-profile-wrapper">
    <div className="card p-5">
      <div className="text-center mb-4">
        <h2 className="card-title">Edit Profile</h2>
        <hr />
      </div>
      <div className="mb-3">
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
      <div className="mb-3">
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
      <div className="mb-3">
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
      <div className="mb-3">
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
          placeholder="Enter new password or leave blank to keep current password"
        />
      </div>
      <div className="d-grid gap-2">
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => {
            onProfileUpdated(userData);
            navigate("/dashboard", { state: userData });
          }}
        >
          Cancel
        </button>
      </div>
    </div>
    // </div>
  );
};

export default EditProfile;
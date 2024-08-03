import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    email: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!userId) {
      console.log("No user ID provided.");
      return;
    }

    const fetchUser = async () => {
      try {
        console.log("Fetching user data for ID:", userId);
        console.log("API URL:", `${apiUrl}/api/users/${userId}`);
        const response = await axios.get(`${apiUrl}/api/users/${userId}`);
        console.log("User data fetched successfully:", response.data);
        setUser(response.data);
        setUpdatedDetails({
          name: response.data.name,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        console.error("Error details:", error.response || error.message);
      }
    };

    fetchUser();
  }, [userId, apiUrl]);

  const handleSave = async () => {
    try {
      const updatedUser = { ...user, ...updatedDetails };
      console.log("Updating user data:", updatedUser);
      await axios.patch(`${apiUrl}/api/users/${userId}`, updatedUser);
      console.log("User data updated successfully.");
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log("User data in Profile component:", user);

  return (
    <div className="profile-wrapper">
      <div className="container mt-5 d-flex justify-content-center bg-white-card">
        <div className="card p-4 shadow-lg profile-card">
          <div className="text-center mb-4">
            <h2 className="card-title">Profile</h2>
            <hr />
          </div>
          {isEditing ? (
            <div>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  name="name"
                  value={updatedDetails.name}
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
                  value={updatedDetails.email}
                  onChange={handleChange}
                />
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-details">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <p>ID: {user.id}</p>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-dark text-white"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={handleSignOut}
                >
                  <FaSignOutAlt className="me-2" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

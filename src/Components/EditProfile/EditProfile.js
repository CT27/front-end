import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ userData, onProfileUpdated }) => {
  const [user, setUser] = useState(userData);
  // const [user, setUpdatedDetails] = useState({
  //   name: "",
  //   email: "",
  //   profilePicture: "",
  // });

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      console.log("No user ID provided.");
      return;
    }

    const fetchUser = async () => {
      try {
        console.log("Fetching user data for ID:", userData);
        console.log("API URL:", `${apiUrl}/api/users/${userData.id}`);
        const response = await axios.get(`${apiUrl}/api/users/${userData.id}`);
        console.log("User data fetched successfully:", response.data);
        setUser(response.data);
        // setUpdatedDetails({
        //   name: response.data.name,
        //   email: response.data.email,
        //   profilePicture: response.data.profilePicture || "",
        // });
      } catch (error) {
        // console.error("Error fetching user data:", error);
        // console.error("Error details:", error.response || error.message);
      }
    };

    fetchUser();
  }, [userData, apiUrl]);

  const handleSave = async () => {
    // try {
    //   // const updatedUser = { ...user, ...user };
    //   console.log("Updating user data:", updatedUser);
    //   await axios.patch(`${apiUrl}/api/users/${userData}`, updatedUser);
    //   console.log("User data updated successfully.");
    //   setUser(updatedUser);
    onProfileUpdated(user); // Call the callback function
    // } catch (error) {
    //   console.error("Error updating user details:", error);
    //   }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-profile-wrapper">
      <div className="container mt-5 d-flex justify-content-center bg-white-card">
        <div className="card p-4 shadow-lg profile-card">
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
      </div>
    </div>
  );
};

export default EditProfile;

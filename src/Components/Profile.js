import React, { useState } from "react";
import EditProfile from "./EditProfile";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(userData); // Store user data to display when not editing

  const handleProfileUpdated = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    // <div className="profile-wrapper mx-3">
    // <div className="container mt-1 d-flex justify-content-center bg-white-card mx-1">
    <div className="card p-5 profile-card ">
      {!isEditing ? (
        <>
          {/* <div className="text-center mb-5"> */}
          <h3 className="card-title">Profile</h3>
          <hr />
          {/* </div> */}
          {user && (
            <div className="profile-details">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <p>
                Profile Picture: <img src={user.profilePicture} alt="Profile" />
              </p>
              <p>ID: {user.id}</p>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-dark text-white"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <EditProfile
          userData={userData}
          onProfileUpdated={handleProfileUpdated}
        />
      )}
    </div>
    // </div>
    // </div>
  );
};

export default Profile;

import React, { useState } from "react";
import EditProfile from "./EditProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";

const Profile = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null); // Store user data to display when not editing

  const handleProfileUpdated = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="profile-wrapper">
      <div className="container mt-5 d-flex justify-content-center bg-white-card">
        <div className="card p-4 shadow-lg profile-card">
          {!isEditing ? (
            <>
              <div className="text-center mb-4">
                <h2 className="card-title">Profile</h2>
                <hr />
              </div>
              {user && (
                <div className="profile-details">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                  <p>
                    Profile Picture:{" "}
                    <img src={user.profilePicture} alt="Profile" />
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
              userId={userId}
              onProfileUpdated={handleProfileUpdated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

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
    <div className="card p-4 profile-card text-center shadow-sm">
      {!isEditing ? (
        <>
          <h3 className="card-title">Profile</h3>
          <hr />
          {user && (
            <div className="profile-details">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="rounded mb-3"
                style={{ width: "150x", height: "150px", objectFit: "cover" }}
              />
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <p>ID: {user.id}</p>
              <button
                className="btn btn-dark text-white w-100"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
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
  );
};

export default Profile;

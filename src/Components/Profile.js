import React, { useState } from "react";
import EditProfile from "./EditProfile";
import "../index.css"; // Import your global styles first
import "bootstrap/dist/css/bootstrap.min.css"; // Then Bootstrap

const Profile = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(userData); // Store user data to display when not editing

  const handleProfileUpdated = (updatedUser) => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="card p-4 profile-card">
      {!isEditing ? (
        <>
          <h3 className="card-title text-center">Profile</h3>
          <hr />
          {user && (
            <div className="profile-details">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <p>
                Profile Picture:{" "}
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="img-fluid rounded-circle"
                  style={{ maxWidth: "150px" }}
                />
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
  );
};

export default Profile;

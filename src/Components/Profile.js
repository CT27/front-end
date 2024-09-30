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
    <div className="p4 profile-card">
      {!isEditing ? (
        <>
          <h3 className="card-title text-center">Profile</h3>
          <hr />
          {user && (
            <div className="profile-details">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
              <img
                src={user.profilePicture}
                alt="Profile"
                className="img-fluid rounded mb-3"
                style={{ maxWidth: "150px" }}
              />
              <p>ID: {user.id}</p>
              <button
                className="btn btn-primary w-80
                "
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

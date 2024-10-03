import React, { useState, useContext } from "react";
import "../index.css"; // Import your custom global styles first
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import TimeLogForm from "./TimeLogForm";
import Reports from "./Reports";
import Profile from "./Profile";
import EditProfile from "./EditProfile"; // Added EditProfile for example
import { AuthContext } from "./AuthContext";

// Reusable Tile Button Component
const TileButton = ({ label, selectedTile, onClick }) => (
  <div className="col-md-6 mb-3">
    <div
      className={`card p-4 shadow-sm text-center ${
        selectedTile === label ? "tile-selected" : "tile"
      }`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <h5>{label}</h5>
    </div>
  </div>
);

const Dashboard = () => {
  const [selectedTile, setSelectedTile] = useState("Timesheet");
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const { userData } = useContext(AuthContext); // Access userData from AuthContext

  const handleProfileUpdated = (updatedUser) => {
    // Handle profile update and close the edit mode
    setIsEditing(false);
  };

  const content = selectedTile === "Timesheet" ? <TimeLogForm /> : <Reports />;

  return (
    <div className="dashboard-container">
      <Header />
      <div className="container mt-4">
        <div className="row">
          {/* Sidebar/Profile Column */}
          <div className="col-md-3 mb-4">
            {userData && (
              <>
                {!isEditing ? (
                  // Profile wrapped with a card
                  <div className="card text-center profile-card">
                    <Profile userData={userData} />
                  </div>
                ) : (
                  // Render EditProfile without any extra wrapping card
                  <div className="edit-profile-card">
                    <EditProfile
                      userData={userData}
                      onProfileUpdated={handleProfileUpdated}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Main Content Column */}
          <div className="col-md-9">
            <div className="row">
              {["Timesheet", "Reports"].map((tile) => (
                <TileButton
                  key={tile}
                  label={tile}
                  selectedTile={selectedTile}
                  onClick={() => setSelectedTile(tile)}
                />
              ))}
            </div>
            <div className="card p-4 shadow-sm content-area">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

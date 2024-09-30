import React, { useState, useContext } from "react";
import "../index.css"; // Import your custom global styles first
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import TimeLogForm from "./TimeLogForm";
import Reports from "./Reports";
import Profile from "./Profile";
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
  const { userData } = useContext(AuthContext); // Access userData from AuthContext

  const content = selectedTile === "Timesheet" ? <TimeLogForm /> : <Reports />;

  return (
    <div className="dashboard-container">
      <Header />
      <div className="container mt-4">
        <div className="row">
          {/* Sidebar/Profile Column */}
          <div className="col-md-3 mb-4">
            {userData && (
              <div className="card text-center">
                <Profile userData={userData} />
              </div>
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

            {/* Dynamic Content Area */}
            <div className="card p-4 shadow-sm content-area">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

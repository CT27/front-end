import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import Header from "../Header/Header";
import TimeLogForm from "../TimeLogForm/TimeLogForm";
import Reports from "../Reports/Reports";
import Profile from "../Profile/Profile";
import { AuthContext } from "../AuthContext";

const Dashboard = () => {
  const [selectedTile, setSelectedTile] = useState("Timesheet");
  const { userData } = useContext(AuthContext); // Access userData from AuthContext

  let content;
  if (selectedTile === "Timesheet") {
    content = <TimeLogForm />;
  } else if (selectedTile === "Reports") {
    content = <Reports />;
  }

  return (
    <div className="dashboard-container">
      <Header />
      <div className="row h-100">
        <div className="col-md-3">
          {userData && <Profile userData={userData} />}{" "}
          {/* Pass userData to Profile component */}
        </div>
        <div className="col-md-9">
          <div className="tiles-container row mb-4">
            {["Timesheet", "Reports"].map((tile) => (
              <div key={tile} className="col-md-6 mb-3">
                <div
                  className={`p-3 tile ${
                    selectedTile === tile ? "tile-selected" : ""
                  }`}
                  onClick={() => setSelectedTile(tile)}
                >
                  <span className="tile-label">{tile}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="content-area">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

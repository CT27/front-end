import React, { useState, useContext } from "react";
import "../index.css"; // Import your custom global styles first
import "bootstrap/dist/css/bootstrap.min.css"; // Then Bootstrap
import Header from "./Header";
import TimeLogForm from "./TimeLogForm";
import Reports from "./Reports";
import Profile from "./Profile";
import { AuthContext } from "./AuthContext";

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
      <div className="container mt-4">
        {" "}
        {/* Changed w-85 to container for consistency */}
        <div className="row">
          {/* Sidebar/Profile Column */}
          <div className="col-md-3 mb-4">
            {" "}
            {/* Added mb-4 for consistent spacing */}
            {userData && (
              <div className="card shadow-sm p-3 bg-white rounded">
                {" "}
                {/* Reduced shadow intensity */}
                <Profile userData={userData} />
              </div>
            )}
          </div>

          {/* Main Content Column */}
          <div className="col-md-9">
            <div className="row">
              {["Timesheet", "Reports"].map((tile) => (
                <div key={tile} className="col-md-6 mb-3">
                  <div
                    className={`card p-4 shadow-sm text-center ${
                      selectedTile === tile ? "tile-selected" : "tile"
                    }`} // Use shadow-sm for lighter shadow effect
                    onClick={() => setSelectedTile(tile)}
                  >
                    <h5 className="tile-label">{tile}</h5>
                  </div>
                </div>
              ))}
            </div>

            {/* Main content area */}
            <div className="card p-4 shadow-sm content-area">
              {" "}
              {/* Reduced padding for cleaner look */}
              {content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

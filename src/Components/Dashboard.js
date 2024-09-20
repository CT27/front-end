import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
      <div className="row mt-5">
        <div className="col-md-3">
          {userData && (
            <div className="card shadow p-3 mb-4 bg-white rounded">
              <Profile userData={userData} />
            </div>
          )}
        </div>
        <div className="col-md-9">
          <div className="row">
            {["Timesheet", "Reports"].map((tile) => (
              <div key={tile} className="col-md-6 mb-3">
                <div
                  className={`card p-4 shadow-lg text-center ${
                    selectedTile === tile ? "tile-selected" : "tile"
                  }`}
                  onClick={() => setSelectedTile(tile)}
                >
                  <h5 className="tile-label">{tile}</h5>
                </div>
              </div>
            ))}
          </div>
          <div className="content-area card p-4 shadow-lg mt-4">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

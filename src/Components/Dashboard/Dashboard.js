import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import Header from "../Header/Header";
import TimeLogForm from "../TimeLogForm/TimeLogForm";
import Reports from "../Reports/Reports";
import Profile from "../Profile/Profile";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [selectedTile, setSelectedTile] = useState("Timesheet");
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  console.log(location.state);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedUserProfilePicture = localStorage.getItem("userProfilePicture");

    if (storedUserId) {
      setUserData({
        id: storedUserId,
        name: storedUserName,
        email: storedUserEmail,
        profilePicture: storedUserProfilePicture,
      });
    } else {
      console.log("User ID not found in local storage");
    }
  }, []);

  // useEffect(() => {
  //   const storedUserId = localStorage.getItem("userId");
  //   if (storedUserId) {
  //     console.log("User ID found in local storage:", storedUserId);
  //   } else {
  //     console.log("User ID not found in local storage");
  //   }
  // }, []);

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
          {userData && <Profile userData={userData} />}
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

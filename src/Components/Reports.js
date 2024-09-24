import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../index.css"; // Import your global styles first
import "bootstrap/dist/css/bootstrap.min.css"; // Then Bootstrap
import { AuthContext } from "./AuthContext"; // Import AuthContext to react to user changes

const RATE_PER_HOUR = 35;

const Reports = () => {
  const [reports, setReports] = useState([]);
  const { userData } = useContext(AuthContext); // Use AuthContext to detect user data changes
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        if (userData && userData.id) {
          const response = await axios.get(
            `${apiUrl}/api/users/${userData.id}`
          );
          const userTimesheets = response.data.timesheets || [];
          setReports(userTimesheets);
        }
      } catch (error) {
        console.error("Error fetching timesheets:", error);
      }
    };

    fetchTimesheets();
  }, [userData, apiUrl]); // Fetch timesheets whenever userData or apiUrl changes

  return (
    <div className="container mt-4">
      <div className="table-responsive border p-3 rounded shadow-sm">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Hours</th>
              <th>Event</th>
              <th>Authorizer</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{report.date}</td>
                <td>{report.hours}</td>
                <td>{report.event}</td>
                <td>{report.authorizer}</td>
                <td>${(report.hours * RATE_PER_HOUR).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;

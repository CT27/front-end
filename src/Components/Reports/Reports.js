import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reports.css";

const RATE_PER_HOUR = 35;

const Reports = () => {
  const [reports, setReports] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL; // Use apiUrl from environment variables

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const response = await axios.get(`${apiUrl}/api/users/${userId}`);
          const userTimesheets = response.data.timesheets || [];
          setReports(userTimesheets);
        }
      } catch (error) {
        console.error("Error fetching timesheets:", error);
      }
    };

    fetchTimesheets();
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <div className="table-responsive border p-4 rounded shadow-sm">
        <table className="table table-striped">
          <thead>
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

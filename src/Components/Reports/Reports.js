import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reports.css";

const RATE_PER_HOUR = 35;

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      const timesheetSubmissions =
        JSON.parse(localStorage.getItem(`timesheetSubmissions_${userId}`)) ||
        [];
      setReports(timesheetSubmissions);
    }
  }, []);

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

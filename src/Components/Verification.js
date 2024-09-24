import React from "react";
import Header from "./Header";
import "../index.css"; // Import your global styles first
import "bootstrap/dist/css/bootstrap.min.css"; // Then Bootstrap

const Verification = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="card p-4 shadow-sm">
          <h2>Verification</h2>
          <p>
            To verify your details, please visit our verification partner{" "}
            <a
              href="https://www.eftsure.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              eftsure
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Verification;

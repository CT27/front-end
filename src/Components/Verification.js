import React from "react";
import Header from "./Header";

const Verification = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="content-area">
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

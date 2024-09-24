import React from "react";
import "../index.css"; // Import your global styles first
import "bootstrap/dist/css/bootstrap.min.css"; // Then Bootstrap
import Header from "./Header";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="card p-4 shadow-sm">
          <h2>Contact EventStaffPro</h2>
          <p>
            Email:{" "}
            <a href="mailto:contact@eventstaffpro.com">
              contact@eventstaffpro.com
            </a>
          </p>
          <p>
            Phone: <a href="tel:+1234567890">+123 456 7890</a>
          </p>
          <p>Address: 123 Event Street, EventCity, EV 12345</p>
        </div>
      </div>
    </>
  );
};

export default Contact;

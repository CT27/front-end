import React from "react";
import "../index.css"; // Import your global styles first
import "bootstrap/dist/css/bootstrap.min.css"; // Then Bootstrap
import Header from "./Header";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="content-area">
          <h2>Contact EventStaffPro</h2>
          <p>Email: contact@eventstaffpro.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Event Street, EventCity, EV 12345</p>
        </div>
      </div>
    </>
  );
};

export default Contact;

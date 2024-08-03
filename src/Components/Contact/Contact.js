import React from "react";
import Header from "../Header/Header";
import "./Contact.css";

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

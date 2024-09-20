import React from "react";
import Header from "./Header";

const About = () => {
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="content-area">
          <h2>About EventStaffPro</h2>
          <p>
            EventStaffPro is a platform for event staff to manage their
            timesheets and submit them for approval.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;

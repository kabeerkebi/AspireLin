import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import User from "../pages/interface/User";
import Employer from "../pages/interface/Employer";
import "../pages/interface/interfacebar.css";
import image1 from "../assets/Interface/download (4).png";
import Footer from "../pages/Footer";

const Interface = () => {
  const [btnfirst, setbtnfirst] = useState(true);
  const [btnsecound, setbtnsecound] = useState(false);

  const gotoemployer = () => {
    setbtnfirst(false);
    setbtnsecound(true);
  };

  const gotocandidate = () => {
    setbtnfirst(true);
    setbtnsecound(false);
  };

  return (
    <>
      <div
        style={{
          background: "#d6e5f7",
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "10px",
          marginBottom: "-25px",
        }}
      >
        <div style={{ flex: 1 }}>
          <div className="interface-logo-div">
            <img src={image1} className="interface-logo" alt="logo" />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className={btnfirst ? "btnswitch2" : "btnswitch1"}
            onClick={gotocandidate}
          >
            Candidate
          </button>
          <button
            className={btnsecound ? "btnswitch2" : "btnswitch1"}
            onClick={gotoemployer}
          >
            Employer
          </button>
        </div>
      </div>
      <Routes>
        <Route path="/" element={btnfirst ? <User /> : <Employer />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Interface;

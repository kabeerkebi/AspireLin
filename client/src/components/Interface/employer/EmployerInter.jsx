import React from "react";
import { useNavigate } from "react-router-dom";
import Employrerimage from "../../../assets/Interface/cuteimage-Photoroom.png-Photoroom.png";
import EmployerinterTwo from "./EmployerinterTwo";
const EmployerInter = () => {
  const navigate = useNavigate();
  const gototEmployerPage = () => {
    navigate("/employer/login");
  };
  return (
    <div>
      <div className="container-fluid p-5 main">
        <div className="row mt-4">
          <div className="col-lg-6 mt-lg-2 order-lg-2 order-1 d-flex align-items-center text-center">
            <div className="mx-auto">
              <img
                src={Employrerimage}
                alt=""
                className="img-fluid"
                style={{ maxHeight: "800px", width: "auto" }}
              />
            </div>
          </div>
          <div className="col-lg-6 order-lg-1 order-2 d-flex align-items-center text-center">
            <div className="mx-auto">
              <h5 className="find-your xl-mt-4">
                Let's hire your next great candidate. Fast.
              </h5>
              <button className="login-button" onClick={gototEmployerPage}>
                post a free job
              </button>
            </div>
          </div>
        </div>
      </div>
      <EmployerinterTwo />
    </div>
  );
};

export default EmployerInter;

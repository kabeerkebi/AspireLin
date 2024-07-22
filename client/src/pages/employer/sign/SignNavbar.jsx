import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import "./Sign.css";

const SignNavbar = () => {
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const gotoLogin = () => {
    navigate("/employer/login"); // Corrected path
    setRegister(false);
    setLogin(true);
  };

  const gotoRegister = () => {
    navigate("/employer/register"); // Corrected path
    setLogin(false);
    setRegister(true);
  };

  return (
    <>
      <div className="button-container mt-3">
        <button
          className={
            login
              ? "button-loginpage-after"
              : "employer-register-and-login-button button-loginpage"
          }
          onClick={gotoLogin}
        >
          Sign in
        </button>

        <button
          className={
            register
              ? "button-loginpage-after"
              : "employer-register-and-login-button button-loginpage"
          }
          onClick={gotoRegister}
        >
          Register
        </button>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default SignNavbar;

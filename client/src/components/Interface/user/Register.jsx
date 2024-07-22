import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import "./interfirst.css";
import { AxiosClient } from "../../../config/api";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { SaveCookie } from "../../../hooks/cookieHooks";
const Register = ({ Registervalue, tologin }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  AxiosClient.defaults.withCredentials = true;
  const buttonclick = (e) => {
    if (password === conformPassword) {
      e.preventDefault();
      AxiosClient
        .post("/register", {
          email,
          name,
          password,
        })
        .then((result) => {
          navigate("/user/jobfinder");
          enqueueSnackbar("REGISTER SUCCESS", { variant: "success" });
          SaveCookie("token", result.data.token);
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      e.preventDefault();
      console.log("check the pssword ");
      enqueueSnackbar(" CHECK THE PASSWORD", { variant: "error" });
    }
  };

  const Gotologin = () => {
    tologin();
  };
  const iconclick = () => {
    Registervalue(true);
  };
  return (
    <div className="addAccountsForm p-5">
      <div className="mt-5 mb-5 container d-flex justify-content-center align-items-flex-start ">
        <form
          className="login-form p-4 rounded shadow-sm position-relative"
          style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}
        >
          <div className="position-absolute top-0 end-0 p-2">
            <IoCloseCircle className="close-icon" onClick={iconclick} />
          </div>
          <h2 className=" mb-4 text-3xl font-extrabold leading-none tracking-tight">
            Register
          </h2>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Conform Password"
              onChange={(e) => setConformPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={buttonclick}
          >
            Register
          </button>
          <p className="mt-3">
            already have an account?{" "}
            <a
              className="btn"
              onClick={Gotologin}
              style={{ color: "#007bff", textDecoration: "none" }}
            >
              login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;

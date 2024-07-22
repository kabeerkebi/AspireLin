import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import "./interfirst.css";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { AxiosClient } from "../../../config/api";
import { SaveCookie, RemoveCookie } from "../../../hooks/cookieHooks";

const Login = ({ loginvalue, toregister }) => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  // axios.defaults.withCredentials = true;
  const buttonclick = (e) => {
    e.preventDefault();
    AxiosClient.post("/logindata", {
      email,
      password,
    })
      .then((res) => {
        if (res.data.success) {
          RemoveEmployercokies();

          enqueueSnackbar("login success ", { variant: "success" });
          SaveCookie("token", res.data.token);
        } else if (res.data === "notfound") {
          enqueueSnackbar("Data Not Found ", { variant: "warning" });
        } else {
          enqueueSnackbar("password is inncorrect ", { variant: "error" });
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const RemoveEmployercokies = async (e) => {
    await AxiosClient.get("/logindata/logout")
      .then(() => {
        RemoveCookie("employerToken");
        Removeadmincokies();
        navigate("user/jobfinder");
      })
      .catch((er) => console.log(er));
  };

  const Removeadmincokies = async (e) => {
    await AxiosClient.get("/adminlogin/logout")
      .then(() => {
        RemoveCookie("adminToken");
      })
      .catch((er) => console.log(er));
  };

  const iconclick = () => {
    loginvalue(true);
  };
  const Gotologin = () => {
    toregister();
  };
  return (
    <div className="addAccountsForm p-5">
      <div className="mt-4 mb-5 container d-flex justify-content-center align-items-flex-start ">
        <form
          className="login-form p-4 rounded shadow-sm position-relative"
          style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}
        >
          <div className="position-absolute top-0 end-0 p-2">
            <IoCloseCircle className="close-icon" onClick={iconclick} />
          </div>
          <h2 className=" mb-4 text-3xl font-extrabold leading-none tracking-tight">
            Login
          </h2>
          {/* <div className="mb-3">
                <input type="text" className="form-control" placeholder="Name" />
              </div> */}
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={buttonclick}
          >
            Login
          </button>
          <p className="mt-3">
            Don't have an account?{" "}
            <a className="btn" onClick={Gotologin}>
              Register
            </a>
          </p>
          email :demo@gmail.com
          <br />
          password :demo
        </form>
      </div>
    </div>
  );
};

export default Login;

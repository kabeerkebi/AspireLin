import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { AxiosClient } from "../../../config/api";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { SaveCookie, RemoveCookie } from "../../../hooks/cookieHooks";
import theballonimage from "../../../assets/employer/hbot-removebg-preview.png";

const EmployerLogin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [companyname, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonClicked = async (e) => {
    e.preventDefault();
    await AxiosClient.post("/employerlogin", { email, password, companyname })
      .then((res) => {
        if (res.data.success) {
          Removeadmincokies(res.data.id);
          enqueueSnackbar("Login successful", { variant: "success" });
          SaveCookie("employerToken", res.data.token);
        } else if (res.data.message === "Data not found") {
          enqueueSnackbar("Data not found", { variant: "error" });
        } else if (res.data.message === "Password is incorrect") {
          enqueueSnackbar("Password is incorrect", { variant: "warning" });
        } else {
          enqueueSnackbar("Login failed", { variant: "error" });
        }
      })
      .catch((error) => {
        console.error("Login error", error);
        enqueueSnackbar("An error occurred during login", { variant: "error" });
      });
  };

  const Removeadmincokies = async (id) => {
    await AxiosClient.get("/adminlogin/logout")
      .then(() => {
        RemoveCookie("adminToken");
        navigate(`/employer/slidebar/${id}`);
      })
      .catch((er) => console.log(er));
  };

  return (
    <div className="d-flex justify-content-center align-items-center justify-content-xl-end my-5">
      <div className="form-container align-items-center p-2">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight">
          Employer Login
        </h2>
        <Form style={{ width: "400px" }} onSubmit={buttonClicked}>
          <Form.Group controlId="companyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              className="input-height"
              type="text"
              placeholder="Enter company name"
              name="companyName"
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="input-height"
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="input-height"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="form-button mt-1">
            Login
          </Button>
        </Form>
           <h3> name : demo</h3>
           <h3> email :  demo@gmail.com</h3>
           <h3> password : demo</h3>
      </div>
      
      <div
        className="col-lg-2 d-none d-xl-block mt-5 my-5"
        style={{ marginRight: "21%" }}
      >
        <div className="image-container my-5">
          <img
            src={theballonimage}
            alt="image"
            className="img-fluid"
            style={{ opacity: "0.5" }}
          />
        </div>
        
      </div>
      
    </div>
  );
};

export default EmployerLogin;

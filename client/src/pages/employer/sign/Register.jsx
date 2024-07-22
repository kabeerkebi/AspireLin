import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { AxiosClient } from "../../../config/api";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import "../../../pages/employer/sign/Sign.css";
import { SaveCookie, RemoveCookie } from "../../../hooks/cookieHooks";
const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [companyname, setcomapnyname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [companytype, setcompanytype] = useState("");
  const [conformpassword, setconformpassword] = useState("");
  const [passwordisCorrect, setpasswordisCorrect] = useState(false);
  const navigate = useNavigate();

  const Toregister = (e) => {
    e.preventDefault();

    if (password === conformpassword) {
      AxiosClient.post("/employerregister", {
        companytype,
        email,
        password,
        phonenumber,
        companyname,
      })
        .then((user) => {
          SaveCookie("employerToken", user.data.token);
          Removeadmin(user.data.id);
          enqueueSnackbar("register succesfully", { variant: "success" });
        })
        .catch((er) => console.log(er));
    } else {
      setpasswordisCorrect(true);
    }
  };

  const Removeadmin = async (id) => {
    await AxiosClient.get("/adminlogin/logout")
      .then(() => {
        RemoveCookie("adminToken");
        navigate(`/employer/slidebar/${id}`);
      })
      .catch((er) => console.log(er));
  };

  return (
    <div className="d-flex justify-content-center employer-body">
      <div className="form-container p-2">
        <h2 class="mb-4 text-3xl font-extrabold leading-none tracking-tight ">
          Employer Registration
        </h2>
        <Form style={{ width: "400px" }}>
          <Form.Group controlId="companyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              className="input-height "
              type="text"
              placeholder="Enter company name"
              name="companyName"
              required
              onChange={(e) => setcomapnyname(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="input-height"
              type="email"
              placeholder="Enter email"
              name="email"
              required
              onChange={(e) => setemail(e.target.value)}
            />
            {/* <Form.Text className="text-danger">Please enter a valid email</Form.Text> */}
          </Form.Group>

          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              className="input-height"
              type="tel"
              placeholder="Enter phone number"
              name="phoneNumber"
              required
              onChange={(e) => setphonenumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="input-height"
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={(e) => setpassword(e.target.value)}
            />
            {/* <Form.Text className="text-danger">
              Password must be at least 8 characters long
            </Form.Text> */}
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="input-height"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              onChange={(e) => setconformpassword(e.target.value)}
            />
            {passwordisCorrect ? (
              <Form.Text className="text-danger">
                Please enter correct password
              </Form.Text>
            ) : null}
          </Form.Group>

          <Form.Group controlId="companyType">
            <Form.Label>Company Type</Form.Label>
            <Form.Control
              className="input-height"
              type="text"
              placeholder="Enter company type"
              name="companyType"
              required
              onChange={(e) => setcompanytype(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="form-button mt-3"
            onClick={Toregister}
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;

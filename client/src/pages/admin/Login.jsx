import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";
import adminlogo from "../../assets/admin/admin.jpg";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { AxiosClient } from "../../config/api";
import { SaveCookie } from "../../hooks/cookieHooks";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigation()
  const handleSubmit = async (event) => {
    event.preventDefault();

    await AxiosClient.post("/adminlogin", { email, password })

      .then((user) => {
        if (user.data.success) {
          SaveCookie("adminToken", user.data.adminToken);
          navigate("/admindashbord");
          enqueueSnackbar("login success", { variant: "success" });
        } else {
          setShow(true);
          setLoading(true);
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };


  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div
      className="sign-in__wrapper"
      // style={{ backgroundImage: `url(${backroundimage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={adminlogo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Sign In</div>
        {/* ALert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => {
              setShow(false);
              setLoading(false);
            }}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={email}
            placeholder="Username"
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
          >
            Forgot password?
          </Button>
        </div>
      </Form>
      {/* Footer */}
      {/* <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        ADMIN 
      </div> */}
    </div>
  );
};

export default Login;

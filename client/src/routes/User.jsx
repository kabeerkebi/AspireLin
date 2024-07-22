import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../pages/Footer.jsx";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch
import Jobfinder from "../pages/user/Jobfinder";
import ApplyJob from "../pages/user/ApplyJob";
import Form from "react-bootstrap/Form";
import { Navbar, Nav, Container } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AxiosClient } from "../config/api.js";
import { useSnackbar } from "notistack";
import { RemoveCookie, SaveCookie } from "../hooks/cookieHooks";
import { IoCloseCircle } from "react-icons/io5";
import { createTokenHeader } from ".././utils/createHeader.js";
import { updateresumelogin } from "../redux/action.js";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { Button, Typography, Box } from "@mui/material";
import userlogo from ".././assets/user/theuserlogo.png";
const User = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [conformPassword, setConformPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [towantlogin, settowantlogin] = useState(false);
  const [visiblelogin, setvisiblelogin] = useState(false);
  const [visibleregister, setvisibleregister] = useState(false);
  const [yescookies, setyescokies] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();
  const resumelogin = useSelector((state) => state.Resumelogin); // Access resumelogin from Redux

  useEffect(() => {
    if (yescookies) {
    } else if (resumelogin) {
      setvisiblelogin(true); // Set visiblelogin to true if resumelogin is true
    }
  }, [resumelogin]);

  useEffect(() => {
    const checktoken = async () => {
      const headers = createTokenHeader(false);
      try {
        const result = await AxiosClient.get("/logindata/check-login", headers);
        if (result.data.success) {
          setyescokies(true);
          settowantlogin(false);
        } else {
          settowantlogin(true);
        }
      } catch (error) {
        settowantlogin(true);
      }
    };
    checktoken();
  }, [towantlogin, visiblelogin, visibleregister]);

  const ToLoged = (e) => {
    e.preventDefault();
    AxiosClient.post("/logindata", {
      email,
      password,
    })
      .then((res) => {
        if (res.data.success) {
          RemoveEmployercokies();

          dispatch(updateresumelogin(false)); // Reset resumelogin to false after login success
          enqueueSnackbar("login success ", { variant: "success" });
          SaveCookie("token", res.data.token);
          setvisiblelogin(false);
        } else if (res.data === "notfound") {
          enqueueSnackbar("Data Not Found ", { variant: "warning" });
        } else {
          enqueueSnackbar("password is incorrect ", { variant: "error" });
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const Registred = (e) => {
    if (password === conformPassword) {
      e.preventDefault();

      AxiosClient.post("/register", {
        email,
        name,
        password,
      })
        .then((result) => {
          RemoveEmployercokies();
          dispatch(updateresumelogin(false)); // Reset resumelogin to false after login success
          setvisibleregister(false);
          enqueueSnackbar("REGISTER SUCCESS", { variant: "success" });
          SaveCookie("token", result.data.token);
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      e.preventDefault();
      console.log("check the password ");
      enqueueSnackbar("CHECK THE PASSWORD", { variant: "error" });
    }
  };

  const navigate = useNavigate();
  const Loginbtn = (e) => {
    e.preventDefault();
    setvisiblelogin(true);
  };
  const Logoutbtn = (e) => {
    e.preventDefault();
    setDeleteModalOpen(true);
  };
  const expand = "sm";
  const Toclick = () => {
    setvisiblelogin(false);
    setvisibleregister(false);
    dispatch(updateresumelogin(false)); // Reset resumelogin to false when closing the form
  };
  const TogologinoRregister = () => {
    if (visiblelogin) {
      setvisiblelogin(false);
      setvisibleregister(true);
    }
    if (visibleregister) {
      setvisibleregister(false);
      setvisiblelogin(true);
    }
  };
  const onConfirm = (e) => {
    AxiosClient.get("/employerlogin/logout")
      .then(() => {
        RemoveCookie("token");
        navigate("/");
        enqueueSnackbar("Log out Success", { variant: "success" });
      })
      .catch((er) => console.log(er));
  };

  const RemoveEmployercokies = async (e) => {
    await AxiosClient.get("/logindata/logout")
      .then(() => {
        RemoveCookie("employerToken");
        Removeadmincokies();
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

  return (
    <>
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <ModalDialog
          aria-labelledby="logout-modal-title"
          aria-describedby="logout-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only("xs")]: {
              top: "20%",
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: "none",
              maxWidth: "unset",
            },
          })}
        >
          <Typography id="logout-modal-title" variant="h6" component="h2">
            Confirm Logout
          </Typography>
          <Typography
            id="logout-modal-description"
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            Are you sure you want to log out? Any unsaved changes will be lost.
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row-reverse" },
              justifyContent: "flex-end",
            }}
          >
            <Button variant="contained" color="error" onClick={onConfirm}>
              Log Out
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </ModalDialog>
      </Modal>

      {visibleregister && (
        <div
          className="addAccountsForm p-5"
          style={{ marginTop: "-10px", bottom: "0px" }}
        >
          <div className="mt-5 mb-5 container d-flex justify-content-center align-items-flex-start">
            <form
              className="login-form p-4 rounded shadow-sm position-relative"
              style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}
            >
              <div className="position-absolute top-0 end-0 p-2">
                <IoCloseCircle className="close-icon" onClick={Toclick} />
              </div>
              <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight">
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
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={(e) => setConformPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-success"
                onClick={Registred}
              >
                Register
              </button>
              <p className="mt-3">
                Already have an account?
                <a
                  className="btn"
                  style={{ color: "#007bff", textDecoration: "none" }}
                  onClick={TogologinoRregister}
                >
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      )}
      {visiblelogin && (
        <div
          className="addAccountsForm p-5"
          style={{ marginTop: "-10px", bottom: "0px" }}
        >
          <div className="mt-4 mb-5 container d-flex justify-content-center align-items-flex-start">
            <form
              onSubmit={ToLoged}
              className="login-form p-4 rounded shadow-sm position-relative"
              style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}
            >
              <div className="position-absolute top-0 end-0 p-2">
                <IoCloseCircle className="close-icon" onClick={Toclick} />
              </div>
              <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight">
                Login
              </h2>
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
              <button type="submit" className="btn btn-success">
                Login
              </button>
              <p className="mt-3">
                Don't have an account?{" "}
                <a className="btn" onClick={TogologinoRregister}>
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: "-20px",
          marginBottom: "-35px",
        }}
      >
        <Navbar key={expand} expand={expand} className="bg-body-white ">
          <Container fluid>
            <Navbar.Brand href="#">
              <img
                src={userlogo}
                style={{
                  marginTop: "-30px",
                  width: "190px",
                  height: "auto",
                }}
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3"></Nav>

                <Form className="d-flex">
                  <button
                    style={{ marginTop: "-30px" }}
                    type="submit"
                    className="login-button"
                    onClick={towantlogin ? Loginbtn : Logoutbtn}
                  >
                    {towantlogin ? "Login" : "Logout"}
                  </button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>
          <Route path="/jobfinder" element={<Jobfinder />} />
          <Route path="/applyjob/:index/:id" element={<ApplyJob />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default User;

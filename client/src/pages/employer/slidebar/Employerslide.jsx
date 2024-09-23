import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { Typography, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import uploadimage from "../../../assets/employer/add-profile-picture-icon-upload-photo-of-social-media-user-vector-removebg-preview.png";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RemoveCookie } from "../../../hooks/cookieHooks";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import AllJobs from "../../../components/employer/AllJobs";
import Applications from "../../../components/employer/Applications";
import { useEffect } from "react";
import { AxiosClient } from "../../../config/api";
import { createTokenHeader } from "../../../utils/createHeader";
const Employerslide = () => {
  const { id } = useParams();
  useEffect(() => {
    CheckTokentrue();
    const fecthdata = async () => {
      AxiosClient.get(`/postjob/${id}`)
        .then((user) => {
          setbackendimage(user.data.profilepictures);
        })
        .catch((er) => {
          console.log(er);
        });
    };
    fecthdata();
  }, []);

  const CheckTokentrue = async () => {
    // Create the token header
    const headers = createTokenHeader(false);

    try {
      // Make the GET request with the header
      const result = await AxiosClient.get(
        "/employerlogin/check-employerlogin",
        headers // Pass headers correctly
      );
      // Check the response data for the unauthorized flag
      if (result.data?.unauthorized) {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  };

  const Profilepicture = useSelector((state) => state.Profilepicture);
  const navigate = useNavigate();
  const TopostJobpage = () => {
    navigate(`/employer/postjob/Jobdetails/${id}`);
  };
  const [jobs, setjobs] = useState(true);
  const [Report, setReport] = useState(false);
  const [backendimage, setbackendimage] = useState();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const Jobclicked = () => {
    setReport(false);
    setjobs(true);
  };
  const Reportclicked = () => {
    setjobs(false);
    setReport(true);
  };
  const Toaddimage = () => {
    navigate(`/employer/profile/${id}`);
  };
  const handleLogout = () => {
    setDeleteModalOpen(true);
  };
  const onConfirm = async () => {
    await AxiosClient.get("/logindata/logout")
      .then(() => {
        RemoveCookie("employerToken");
        navigate("/");
      })
      .catch((er) => console.log(er));
  };
  return (
    <div>
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
      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "scroll initial",
          background: "#f3f2ef",
        }}
      >
        <CDBSidebar textColor="#black" backgroundColor="#fff">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            {/* if image is there  */}
            {!Profilepicture ? (
              <img
                src={uploadimage}
                onClick={Toaddimage}
                className="img-fluid-slidebar"
                style={{ borderRadius: "15px" }}
              />
            ) : (
              <img
                src={backendimage}
                alt=""
                onClick={Toaddimage}
                className="img-fluid-slidebar"
                style={{ borderRadius: "15px" }}
              />
            )}
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink
                exact
                to=""
                activeClassName="activeClicked"
                onClick={Jobclicked}
              >
                <CDBSidebarMenuItem icon="fa-solid fa-briefcase text-primary">
                  Jobs
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                exact
                to=""
                activeClassName="activeClicked"
                onClick={Reportclicked}
              >
                <CDBSidebarMenuItem icon="chart-line text-primary">
                  Report
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user text-primary">
                  Profile page
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="" activeClassName="activeClicked"></NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter style={{ textAlign: "center" }}>
            <div style={{ padding: "20px 5px" }}>
              <button
                className="bg-danger text-white"
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
                onClick={handleLogout}
              >
                <LogoutIcon />
              </button>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>

        <div className="w-100" style={{ overflow: "auto" }}>
          {jobs ? (
            <div className="container-fluid">
              <div
                className="my-3 row justify-content-between align-items-center"
                style={{ minWidth: "100px", maxWidth: "95%", margin: "0 auto" }}
              >
                <div className="col-md-6">
                  <h2 class="mb-3 text-2xl  font-semibold leading-snug tracking-normal text-gray-800 sm:text-3xl md:text-4xl">
                    All Jobs
                  </h2>
                </div>
                <div className="col-md-6 text-md-end">
                  <Button variant="contained" onClick={TopostJobpage}>
                    PostJob
                  </Button>
                </div>
              </div>
            </div>
          ) : null}

          {jobs ? <AllJobs /> : Report ? <Applications /> : null}
        </div>
      </div>
    </div>
  );
};

export default Employerslide;

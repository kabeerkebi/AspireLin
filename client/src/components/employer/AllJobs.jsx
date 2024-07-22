import React, { useEffect, useState } from "react";
import "./Slidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AxiosClient } from "../../config/api";
import { useSnackbar } from "notistack";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { Button, Typography, Box } from "@mui/material";
const AllJobs = () => {
  const { Todeletetrue, Deleteindexvalue } = useSelector(
    (state) => state.Todeletetrue
  );
  const { id } = useParams();
  const [userData, setuserData] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedindex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fecthdata = async () => {
      await AxiosClient.get(`/postjob/${id}`)
        .then((user) => {
          setuserData(user.data.postjobdata);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fecthdata();
  }, [selectedindex, deleteModalOpen, AxiosClient]);
  const { continueorupdate, indexvalue } = useSelector(
    (state) => state.continueorupdate
  );

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Toupdatedata = (index) => {
    navigate(`/employer/postjob/Jobdetails/${id}`);
    dispatch({
      type: "UPDATE_THE_DATAS_ARRAY",
      payload: { continueorupdate: true, indexvalue: index },
    });
  };
  const onConfirm = async () => {
    try {
      await AxiosClient.delete(`/postjob/deleteData/${id}/${selectedindex}`);
      enqueueSnackbar("Data is deleted successfully", { variant: "success" });

      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting data:", error);
      enqueueSnackbar("An error occurred while deleting data", {
        variant: "error",
      });
    }
  };
  const Deletedata = (index) => {
    setSelectedIndex(index);
    setDeleteModalOpen(true);
    // dispatch({
    //   type: "UPDATE_THE_DELETE_FORM",
    //   payload: { Todeletetrue: true, Deleteindexvalue: index },
    // });
  };

  return (
    <div>
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
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
          <Typography id="nested-modal-title" level="h2">
            Are you absolutely sure?
          </Typography>
          <Typography id="nested-modal-description" color="text.secondary">
            This action cannot be undone. This will permanently delete your data
            from the database.
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row-reverse" },
            }}
          >
            <Button variant="contained" color="error" onClick={onConfirm}>
              Continue
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

      {userData &&
        userData.map((item, index) => (
          <div
            key={index}
            className="container-fluid jobs-sidebar p-2 mt-4 mb-3"
            style={{
              maxWidth: "87%",
              minWidth: "170px",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              background: "#fff",
            }}
          >
            <div className="row ">
              <div className="  col-11">
                <div className="container row p-2">
                  <div className="col-lg-7 col-md-12">
                    <h6 className="text-xl font-semibold text-gray-900 mb-1">
                      {item.datas.JobTitle}
                    </h6>
                    <div className="inside-job-title">
                      <div>
                        <p>anywhere in india </p>
                      </div>
                      <div>
                        <p> name </p>
                      </div>
                      <div>post on 455</div>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 text-center">
                    <span>0</span>
                    <p>action pending</p>
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 text-center">
                    <span>0</span>
                    <p>all candidate</p>
                  </div>
                </div>
              </div>
              <div
                className="col-1   "
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  className="  text-center"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection: "column",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: "#1a79c1" }}
                    onClick={() => Toupdatedata(index)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#f72222" }}
                    onClick={() => Deletedata(index)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllJobs;

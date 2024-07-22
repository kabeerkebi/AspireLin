import React, { useEffect, useState, useCallback } from "react";
import { AxiosClient } from "../../config/api";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { SERVER_DOMAIN } from "../../config/config";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import { EyeIcon } from "./EyeIcon";

const columns = [
  { name: "Company Name", uid: "companyName" },
  { name: "Job Title", uid: "jobTitle" },
  { name: "Actions", uid: "actions" },
];

const AllJobs = ({ HideSidebar }) => {
  const navigate = useNavigate();
  const [BackendData, setBackendData] = useState([]);
  const [deletestate, setdeletestate] = useState(false);
  const [theId, settheId] = useState("");
  const [theindex, settheindex] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        const response = await AxiosClient.get("/admin/getallemployerdata");
        setBackendData(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobsData();
  }, [BackendData]);

  const GoeditPage = (id, index, arryindex) => {
    navigate(`/admineditjob/${id}/${index}/${arryindex}`);
  };

  const Deleteitem = (id, index) => {
    setdeletestate(true);
    settheId(id);
    settheindex(index);
    HideSidebar(true);
  };

  const YesDelete = async () => {
    try {
      await AxiosClient.delete(`/admin/deletedata/${theId}/${theindex}`);
      setdeletestate(false);
      enqueueSnackbar("Data deletion successful", { variant: "success" });
      HideSidebar(false);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const NoDelete = () => {
    setdeletestate(false);
    HideSidebar(false);
  };

  const renderCell = useCallback((job, columnKey) => {
    const cellValue = job[columnKey];

    switch (columnKey) {
      case "companyName":
        return (
          <div className="flex items-center">
            <img
              src={job.avatar}
              alt={job.companyName}
              style={{
                borderRadius: "8px",
                width: "40px",
                height: "40px",
                marginRight: "10px",
              }}
            />
            <p className="font-bold">{cellValue}</p>
          </div>
        );
      case "jobTitle":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-gray-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit job">
              <span className="text-lg text-gray-400 cursor-pointer active:opacity-50">
                <EditIcon
                  onClick={() => GoeditPage(job._id, indexnumber, index)}
                />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete job">
              <span className="text-lg text-white-500 cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => Deleteitem(job._id, job.index)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div
      className="mt-5"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {deletestate && (
        <Modal open={deletestate} onClose={NoDelete}>
          <ModalDialog
            aria-labelledby="nested-modal-title"
            aria-describedby="nested-modal-description"
            sx={(theme) => ({
              [theme.breakpoints.only("xs")]: {
                top: "20%",
                // bottom: ,
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
            <Typography id="nested-modal-description" textColor="text.tertiary">
              This action cannot be undone. This will permanently delete your
              data from database.
            </Typography>
            <Box
              sx={{
                mt: 1,
                display: "flex",
                gap: 1,
                flexDirection: { xs: "column", sm: "row-reverse" },
              }}
            >
              <Button variant="solid" color="danger" onClick={YesDelete}>
                Continue
              </Button>
              <Button variant="outlined" color="neutral" onClick={NoDelete}>
                Cancel
              </Button>
            </Box>
          </ModalDialog>
        </Modal>
      )}

      <div
        style={{
          maxHeight: "500px",
          minHeight: "300px",
          minWidth: "350px",
          maxWidth: "100%",
          overflow: "auto",
        }}
      >
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                <p>{column.name}</p>
              </TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {BackendData.map((job, index) =>
              job.postjobdata.map((postdata, indexnumber) => (
                <TableRow key={`${index}-${indexnumber}`}>
                  <TableCell>
                    <div className="flex items-center">
                      <img
                        src={SERVER_DOMAIN + postdata.datas.Theimages}
                        alt={postdata.datas.CompanyName}
                        style={{
                          borderRadius: "8px",
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                        }}
                      />
                      <p className="font-bold">{postdata.datas.CompanyName}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <p className="font-bold text-sm capitalize">
                        {postdata.datas.JobTitle}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tooltip content="Details">
                        <span className="text-lg text-gray-400 cursor-pointer active:opacity-50">
                          <EyeIcon />
                        </span>
                      </Tooltip>
                      <Tooltip content="Edit job">
                        <span className="text-lg text-gray-400 cursor-pointer active:opacity-50">
                          <EditIcon
                            onClick={() =>
                              GoeditPage(job._id, indexnumber, index)
                            }
                          />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Delete job">
                        <span className="text-lg text-red-500 cursor-pointer active:opacity-50">
                          <DeleteIcon
                            onClick={() => Deleteitem(job._id, indexnumber)}
                          />
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllJobs;

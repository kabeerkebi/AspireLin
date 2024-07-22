import { AxiosClient } from "../../config/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "@mui/joy/Modal";
import { useSnackbar } from "notistack";
import { SERVER_DOMAIN } from "../../config/config";
import ModalDialog from "@mui/joy/ModalDialog";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "./Resume.css"; // Custom CSS for additional styling

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Resume = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedResumeIndex, setSelectedResumeIndex] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = () => {
      AxiosClient.get(`/postjob/${id}`)
        .then((result) => {
          setResumes(result.data.theresume);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [id, deleteModalOpen]);

  const handleViewResume = (pdf) => {
    window.open(SERVER_DOMAIN + pdf, "_blank", "noreferrer");
  };

  const handleDeleteResume = (index) => {
    setSelectedResumeIndex(index);
    setDeleteModalOpen(true);
  };

  const confirmDeleteResume = () => {
    AxiosClient.delete(`/resume/deleteData/${id}/${selectedResumeIndex}`)
      .then(() => {
        enqueueSnackbar("Data delete  successful", { variant: "success" });

        setDeleteModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goBack = () => {
    navigate(`/employer/slidebar/${id}`);
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
            <Button
              variant="contained"
              color="error"
              onClick={confirmDeleteResume}
            >
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

      <Container>
        <Box mt={5}>
          <Button
            className="mb-3"
            variant="contained"
            color="primary"
            onClick={goBack}
          >
            <ArrowBackIcon /> Back
          </Button>
          <Grid container spacing={3}>
            {resumes.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="resume-card">
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Phone Number:</strong> {item.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Experience:</strong> {item.expirence} years
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Submitted on:</strong>{" "}
                      {new Date(item.submittedOn).toLocaleString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <StyledButton
                      variant="contained"
                      color="primary"
                      startIcon={<CloudDownloadIcon />}
                      onClick={() => handleViewResume(item.thepdf)}
                    >
                      View Resume
                    </StyledButton>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => handleDeleteResume(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Resume;

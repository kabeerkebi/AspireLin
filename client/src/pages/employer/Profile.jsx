import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilepicture } from "../.././redux/action";
import { DeleteProfilepicture } from "../.././redux/action";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosClient } from "../../config/api";
import { useSnackbar } from "notistack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./Profile.css";
const Profile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // Added state for image
  // react redux
  const dispatch = useDispatch();
  const Profilepicture = useSelector((state) => state.Profilepicture);

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const uploadedImage = event.target.files[0];
    setImage(uploadedImage);
  };

  const Continue = async () => {
    try {
      // Dispatch action to update profile picture in Redux state
      await dispatch(updateProfilepicture(image));

      // Append image data to FormData
      const formData = new FormData();
      formData.append("profilephoto", image);

      // Send request to update profile picture on the backend
      await AxiosClient.put(`/postjob/profilepicturedata/${id}`, formData);

      // Navigate and show success message
      navigate(`/employer/slidebar/${id}`);
      enqueueSnackbar("The Image is Saved", { variant: "success" });
    } catch (error) {
      // Handle errors
      console.error("Error uploading profile picture:", error);
      enqueueSnackbar("Failed to save the image", { variant: "error" });
    }
  };

  const Back = () => {
    navigate(`/employer/slidebar/${id}`);
    enqueueSnackbar("The Image is Not Saved ", { variant: "warning" });
  };
  const DleteTheImage = async () => {
    try {
      AxiosClient.delete(`/postjob/deletedata/${id}`);
      await dispatch(DeleteProfilepicture());
      navigate(`/employer/slidebar/${id}`);
      enqueueSnackbar("The image is delete ", { variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="bg-white">
        <div className="containers p-5 my-3">
          <h5 className="text-3xl mb-3">Profile pictures</h5>

          <Form.Group controlId="imageUpload">
            <Form.Label>
              Upload Image <CloudUploadIcon />
            </Form.Label>
            <Form.Control type="file" onChange={handleImageUpload} />
          </Form.Group>
          {/* Display uploaded image */}
          {image && (
            <div className="uploaded-image-container">
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="rounded img-fluid mt-3 img-fluid"
                style={{ maxHeight: "400px" }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-white d-flex justify-content-center align-items-center">
        <button className="back-button" onClick={Back}>
          back
        </button>
        <button className="wonderful-button" onClick={Continue}>
          Continue
        </button>
        <button className="back-button" onClick={DleteTheImage}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Profile;

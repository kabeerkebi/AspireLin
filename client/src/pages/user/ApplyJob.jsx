import React, { useEffect, useState } from "react";
import "./apply.css";
import { AxiosClient } from "../../config/api.js";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { styled } from "@mui/material/styles";
import { Card, Label, TextInput } from "flowbite-react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import ViewJob from "../../components/user/ViewJob";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { createTokenHeader } from "../../utils/createHeader";
import { updateresumelogin } from "../../redux/action.js";
import { useDispatch, useSelector } from "react-redux";
import Similar from "../../components/user/Similar.jsx";
import { SERVER_DOMAIN } from "../../config/config.js";
import axios from "axios";
const ApplyJob = () => {
  const [rendervalue, setrendervalue] = useState(false);
  const dispatch = useDispatch();
  const resumelogin = useSelector((state) => state.Resumelogin);
  const [fecthdata, setfecthdata] = useState([]);
  const { index } = useParams();
  useEffect(() => {
    const fecthdata = async () => {
      await AxiosClient.get(`/postjob//getnumber/${index}`)
        .then((result) => {
          setfecthdata(result.data.thedata.datas);
        })
        .catch((er) => {
          console.log(er);
        });
    };

    fecthdata();
  }, [rendervalue]);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [number, setNumber] = useState("");
  const { id } = useParams();
  const [files, setFiles] = useState("");
  const [checkcokkies, setcheckcokies] = useState(false);

  useEffect(() => {
    const checktoken = async () => {
      const headers = createTokenHeader(false);

      try {
        const result = await AxiosClient.get("/logindata/check-login", headers);
        if (result.data.success) {
          setcheckcokies(true);
        } else {
          setcheckcokies(false);
        }
      } catch (error) {
        console.log("please Logi");
      }
    };
    checktoken();
  }, [rendervalue]);

  const SubmitFile = async (e) => {
    setrendervalue(!rendervalue);
    e.preventDefault();
    if (checkcokkies) {
      dispatch(updateresumelogin(false));

      if (
        files.length === 0 ||
        experience.length === 0 ||
        number.length === 0
      ) {
        enqueueSnackbar("Please Fill The Full Form ", { variant: "warning" });
      } else {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("experience", experience);
        formData.append("phonenumber", number);
        formData.append("file", files);
        await AxiosClient.post(`/resume/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(() => {
            navigate("/user/jobfinder");
            enqueueSnackbar("Job Apply Success", { variant: "success" });
          })
          .catch((err) => {
            console.log("SubmitAgain");
          });
      }
    } else {
      dispatch(updateresumelogin(true));
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <div>
      <div className="apply-job-container d-flex flex-column flex-lg-row">
        <div className="flex-grow-1 apply-left-div p-2">
          <div className="company-header max-w-sm">
            <img
              src={SERVER_DOMAIN + fecthdata.Theimages}
              alt="Company Logo"
              className="company-logo"
              width={50}
            />
            <div className="company-details">
              <h3 className="2xl">{fecthdata.CompanyName}</h3>

              <p>
                {" "}
                <LocationOnIcon className="text-primary" fontSize="20px" />{" "}
                {fecthdata.CompanyAddress}
              </p>
            </div>
          </div>
          <Card className="card max-w-sm" style={{ marginLeft: "15%" }}>
            <form className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your Name" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder=" Job Portal... "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="experience" value="Experience (years)" />
                </div>
                <TextInput
                  id="experience"
                  type="number"
                  placeholder="2"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="number" value="Phone Number" />
                </div>
                <TextInput
                  id="number"
                  type="text"
                  placeholder="123-456-7890"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  component="label"
                  variant="contained"
                  className="custom-button"
                  startIcon={<CloudUploadIcon className="custom-button-icon" />}
                >
                  Upload Resume
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => setFiles(e.target.files[0])}
                    required
                  />
                </Button>
              </div>
              <Button
                className="custom-button"
                onClick={SubmitFile}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Card>
        </div>
        <div className="flex-grow-1 apply-right-div">
          <ViewJob Storedatas={fecthdata} />
        </div>
      </div>
      <Similar ResetEffect={() => setrendervalue(!rendervalue)} />
    </div>
  );
};

export default ApplyJob;

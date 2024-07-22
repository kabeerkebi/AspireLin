import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { ImCheckmark } from "react-icons/im";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./postjob.css";
import { useDispatch, useSelector } from "react-redux";
import { updatejobpost } from "../../../redux/action";
import { useNavigate, useParams } from "react-router-dom";

const CandidateRequirements = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const continueorupdate = useSelector((state) => state.continueorupdate);

  const { id } = useParams();
  const navigate = useNavigate();
  const [education, setEducation] = useState(null);
  const [experince, setExperence] = useState("");
  const [English, setEnglish] = useState(null);
  const [add, setadd] = useState([]);
  const [yearsofexperince, setyearofexperince] = useState("");

  //  for react redux
  const dispatch = useDispatch();
  const {
    TotalExperince,
    HowManyYearExperince,
    MinimumEducation,
    EnglishLevel,
    Description,
    Additionalage,
  } = useSelector((state) => state.postjobdata.datas);

  // for react quill

  const [quillData, setQuilldata] = useState("");
  const toolbarOptions = ["bold", "italic", "underline", "strike"];
  const module = {
    toolbar: toolbarOptions,
  };

  const Continue = () => {
    navigate(`/employer/postjob/InterviewerInformation/${id}`);
    dispatch(
      updatejobpost({
        TotalExperince: experince,
        HowManyYearExperince: yearsofexperince,
        MinimumEducation: education,
        EnglishLevel: English,
        Description: quillData,
        Additionalage: add,
      })
    );
  };
  const Back = () => {
    navigate(`/employer/postjob/jobdetails/${id}`);
  };

  const handleEducatClick = (value) => {
    setEducation(value);
  };
  const handlexprinceClick = (value) => {
    setExperence(value);
  };
  const handleEnglishlevelClick = (value) => {
    setEnglish(value);
  };
  const handleAddrequirementClick = (value) => {
    const findData = add.find((x) => x === value);
    if (findData) {
      const filterData = add.filter((x) => x !== value);
      setadd(filterData);
    } else {
      setadd([...add, value]);
    }
  };
  return (
    <div className="containers">
      {/* the page navigation */}

      <div
        className="bg-white"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span className="checkmark rounded-circles">
          <ImCheckmark />
        </span>
        <hr className="jobpost-hr" />
        <div style={{ display: "flex" }}>
          <span className="rounded-circles bg-dark text-white p-1"> 2</span>
          <span className="job-details  d-none d-md-block">
            {" "}
            Candidate requirements
          </span>
        </div>{" "}
        <hr className="jobpost-hr" />
        <span className="number">3</span>
        <hr className="jobpost-hr" />
        <span className="number">4</span>
        <hr className="jobpost-hr" />
        <span className="number">5</span>
      </div>

      {/* first section { candidate Requirments } */}

      <div className="bg-white">
        <div className="containers p-5">
          <Form>
            <h5 className="text-lg font-semibold mb-3">
              Candidate Requirments{" "}
            </h5>
            <p className="text-gray-600 mb-3">
              We'll use these Requirment details to make your job visible to
              right candidate
            </p>
            <Form.Group controlId="CompanyYoureHiringFor">
              <Form.Label>Minimum Education</Form.Label>
              <div className="d-flex flex-column flex-md-row ">
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    education === "10th or Below 10th"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleEducatClick("10th or Below 10th")}
                >
                  10th or Below 10th
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    education === "12th Pass" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleEducatClick("12th Pass")}
                >
                  12th Pass
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    education === "Diploma" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleEducatClick("Diploma")}
                >
                  Diploma
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    education === "Graduate" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleEducatClick("Graduate")}
                >
                  Graduate
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    education === "Post Graduate"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleEducatClick("Post Graduate")}
                >
                  Post Graduate
                </Button>
              </div>
            </Form.Group>

            {/* secound section */}
            <Form.Group controlId="CompanyYoureHiringFor">
              <Form.Label className="mt-4">Total experince required</Form.Label>
              <div className="d-flex flex-column flex-md-row ">
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={experince === "Any" ? "primary" : "outline-primary"}
                  onClick={() => handlexprinceClick("Any")}
                >
                  Any
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    experince === "ExperinceOnly"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handlexprinceClick("ExperinceOnly")}
                >
                  Experince only
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    experince === "FresherOnly" ? "primary" : "outline-primary"
                  }
                  onClick={() => handlexprinceClick("FresherOnly")}
                >
                  Fresher Only
                </Button>
              </div>
            </Form.Group>

            {experince.includes("ExperinceOnly") ? (
              <Form.Group controlId="experienceInput">
                <Form.Label>How many years of experience</Form.Label>
                <div className="d-flex flex-row">
                  <div className="flex-grow-1 ms-2">
                    <Form.Control
                      type="number"
                      placeholder="How many year experince you have"
                      required
                      onChange={(e) => setyearofexperince(e.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
            ) : null}

            {/* third section */}
            <Form.Group controlId="CompanyYoureHiringFor">
              <Form.Label className="mt-4">English level required</Form.Label>
              <div className="d-flex flex-column flex-md-row ">
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    English === "No English" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleEnglishlevelClick("No English")}
                >
                  No English
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    English === "Basic English" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleEnglishlevelClick("Basic English")}
                >
                  Basic English
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    English === "Good English" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleEnglishlevelClick("Good English")}
                >
                  Good English
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
      {/* secound section {additional requiredment} */}

      <div className="bg-white">
        <div className="containers p-5">
          <Form>
        
  <h5 className="text-lg font-semibold mb-4">
            Additional Requirments (Optional) </h5>
            <p className="text-gray-600 mb-6">
              Add additional requirements so that we can help you find right
              candidate
            </p>
            <Form.Group controlId="CompanyYoureHiringFor">
              <div className="d-flex flex-column flex-md-row ">
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={add.includes("Age") ? "primary" : "outline-primary"}
                  onClick={() => handleAddrequirementClick("Age")}
                >
                  Age
                  {add.includes("Age") ? (
                    <IoClose style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaPlus style={{ marginLeft: "5px" }} />
                  )}
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    add.includes("Gender") ? "primary" : "outline-primary"
                  }
                  onClick={() => handleAddrequirementClick("Gender")}
                >
                  Gender
                  {add.includes("Gender") ? (
                    <IoClose style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaPlus style={{ marginLeft: "5px" }} />
                  )}
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    add.includes("Skills") ? "primary" : "outline-primary"
                  }
                  onClick={() => handleAddrequirementClick("Skills")}
                >
                  Skills
                  {add.includes("Skills") ? (
                    <IoClose style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaPlus style={{ marginLeft: "5px" }} />
                  )}
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    add.includes("Regional Languages")
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() =>
                    handleAddrequirementClick("Regional Languages")
                  }
                >
                  Regional Languages
                  {add.includes("Regional Languages") ? (
                    <IoClose style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaPlus style={{ marginLeft: "5px" }} />
                  )}
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>

      <div className="bg-white">
        <div className="containers  p-2">
          <Form>
            <h5 className="text-lg font-semibold mb-3"> Job Description </h5>
            <p className="text-gray-600 mb-3">
              Describe the responsibilities of this job and other specific
              requirements here.
            </p>
            <Form.Group controlId=""></Form.Group>
            <ReactQuill
              theme="snow"
              modules={module}
              value={quillData}
              onChange={setQuilldata}
            />
          </Form>
        </div>
      </div>

      <div className="bg-white d-flex justify-content-center align-items-center">
        <button className="back-button" onClick={Back}>
          back
        </button>

        <button className="wonderful-button" onClick={Continue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default CandidateRequirements;

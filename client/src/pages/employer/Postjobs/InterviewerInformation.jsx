import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { ImCheckmark } from "react-icons/im";
import "./postjob.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatejobpost } from "../../../redux/action";
const InterviewerInformation = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const { id } = useParams();
  const [typeofinterview, settypeofinterview] = useState(null);
  const [companyAddres, setcompanyAddres] = useState();
  const navigate = useNavigate();

  // fot react redux
  const dispatch = useDispatch();
  const continueorupdate = useSelector((state) => state.continueorupdate);

  const { TypeOfInterviews, CompanyAddress, Additionalage } = useSelector(
    (state) => state.postjobdata.datas
  );
  const Back = () => {
    navigate(`/employer/postjob/CandidateRequirements/${id}`);
  };
  const Continue = () => {
    navigate(`/employer/postjob/JobPreview/${id}`);
    dispatch(
      updatejobpost({
        TypeOfInterviews: typeofinterview,
        CompanyAddress: companyAddres,
      })
    );
  };

  const handleinterviewTypeClick = (value) => {
    settypeofinterview(value);
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
        <span className="checkmark rounded-circles">
          <ImCheckmark />
        </span>
        <hr className="jobpost-hr" />
        <div style={{ display: "flex" }}>
          <span className="rounded-circles bg-dark text-white p-1"> 3</span>
          <span className="job-details  d-none d-md-block">
            Interviewer information
          </span>
        </div>{" "}
        <hr className="jobpost-hr" />
        <span className="number">4</span>
        <hr className="jobpost-hr" />
        <span className="number">5</span>
      </div>

      {/* first section { interview method  } */}

      <div className="bg-white">
        <div className="containers p-5">
          <Form>
            <h5 className="text-lg font-semibold mb-3">
              {" "}
              Interview Method and address{" "}
            </h5>
            <p className="text-gray-600 mb-3">
              Let Candidates Know how interview will be conducted for job.
            </p>
            <Form.Group controlId="CompanyYoureHiringFor">
              <Form.Label>Type Of Interview</Form.Label>
              <div className="d-flex flex-column flex-md-row ">
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    typeofinterview === "Person Interview"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleinterviewTypeClick("Person Interview")}
                >
                  In - Person Interview
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    typeofinterview === "Telephonic/Online Interview"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() =>
                    handleinterviewTypeClick("Telephonic/Online Interview")
                  }
                >
                  Telephonic/Online Interview
                </Button>
              </div>
            </Form.Group>
            <Form.Group controlId="">
              <Form.Label className="mt-4">Company address</Form.Label>
              <Form.Control
                onChange={(e) => setcompanyAddres(e.target.value)}
                type="text"
                placeholder="Search for you address/locality"
              />
            </Form.Group>
          </Form>
        </div>
      </div>

      {/* section secound */}

      <div className="bg-white">
        <div className="containers p-5">
          <Form>
            <h5 className="text-lg font-semibold mb-3">
              {" "}
              Communication Preferences{" "}
            </h5>
            <p className="text-gray-600 mb-3">
              Do you Want Candidates Contact via Call / Whatsapp after they
              apply ?
            </p>
            <Form.Group>
              <Form.Label>Select an option:</Form.Label>
              <div className="d-flex  flex-column">
                <Form.Check
                  inline
                  type="radio"
                  label="Yes,to myself"
                  name="option"
                  value="option1"
                  checked={"option1"}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Yes,to other recruiter"
                  name="option"
                  value="option2"
                  checked={"option2"}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="No , I will contact candidates first"
                  name="option"
                  value="option3"
                  checked={"option3"}
                />
              </div>
            </Form.Group>
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

export default InterviewerInformation;

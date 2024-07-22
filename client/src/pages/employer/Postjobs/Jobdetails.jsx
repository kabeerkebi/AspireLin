import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { updatejobpost } from "../../../action";
import { updatejobpost } from "../../../redux/action";
import "./postjob.css";
import { AxiosClient } from "../../../config/api";
const Jobdetails = () => {
  const [storeimage, setstoreimage] = useState("");
  useEffect(() => {
    const fecthdata = async () => {
      await AxiosClient.get(`/postjob/${id}`)
        .then((result) => {
          setstoreimage(result.data.profilepictures);
        })
        .catch((errr) => {
          console.log(errr);
        });
    };
    fecthdata();
    window.scroll(0, 0);
  }, []);
  const navigate = useNavigate();
  const Continue = (e) => {
    navigate(`/employer/postjob/CandidateRequirements/${id}`);
    dispatch(
      updatejobpost({
        CompanyName: Company,
        JobTitle: JobTitles,
        TypeJob: jobType,
        Locations: location,
        PayTypes: paytype,
        MinimumPay: Minimum,
        MaximumPay: Maximum,
        IncentivePay: incentive,
        TheobjID: id,
        Theimages: storeimage,
        Additionalperks: add,
        Category: selectedCategory,
      })
    );
  };
  // react redux
  const indexvalue = useSelector((state) => state.indexvalue);

  const dispatch = useDispatch();
  const {
    CompanyName,
    JobTitle,
    TypeJob,
    Locations,
    PayTypes,
    MinimumPay,
    MaximumPay,
    IncentivePay,
    TheobjID,
    Theimages,
    Additionalperks,
    Category,
  } = useSelector((state) => state.postjobdata.datas);

  const { id } = useParams();
  const [jobType, setJobType] = useState("");
  const [location, setlocation] = useState("");
  const [paytype, setpaytype] = useState("");
  const [add, setadd] = useState([]);
  const [Minimum, setminimumn] = useState("");
  const [Maximum, setmaximum] = useState("");
  const [incentive, setincentive] = useState("");
  const [Company, setcompany] = useState("");
  const [JobTitles, setJobtitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleadditional = (values) => {
    const finddata = add.find((x) => x === values);
    if (finddata) {
      const filterdata = add.filter((x) => x !== values);
      setadd(filterdata);
    } else {
      setadd((prevs) => [...prevs, values]);
    }
  };
  const handleJobpaytypeClick = (ptype) => {
    setpaytype(ptype);
  };

  const handleJoblocationClick = (loc) => {
    setlocation(loc);
  };

  const handleJobTypeClick = (type) => {
    setJobType(type);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="containers">
      {/* the page navigation */}
      <div
        className="bg-white"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex" }}>
          <span className="rounded-circles bg-dark text-white p-1"> 1</span>
          <span className="job-details  d-none d-md-block"> Job details</span>
        </div>
        {/* import { ImCheckmark } from "react-icons/im";
        <ImCheckmark /> */}
        <hr className="jobpost-hr" />
        <span className=" number">2</span>
        <hr className="jobpost-hr" />
        <span className="number">3</span>
        <hr className="jobpost-hr" />
        <span className="number">4</span>
        <hr className="jobpost-hr" />
        <span className="number">5</span>
      </div>
      {/* first section {job details } */}
      <div className="bg-white">
        <div className="containers p-5">
          <Form>
            <h5 className="text-lg font-semibold mb-3">Job Details</h5>
            <p className="text-gray-600 mb-3">
              We use this information to find the best candidates for the job.
            </p>
            <Form.Group controlId="CompanyYoureHiringFor">
              <Form.Label>Company you're hiring for *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Select company name"
                required
                value={Company}
                onChange={(e) => setcompany(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a company name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="JobTitle">
              <Form.Label>Job title / Designation *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg. Accountant"
                value={JobTitles}
                onChange={(e) => setJobtitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="JobType">
              <Form.Label>Type of Job *</Form.Label>
              <div className="d-flex flex-column flex-md-row ">
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    jobType === "fulltime" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleJobTypeClick("fulltime")}
                >
                  Full time
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    jobType === "parttime" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleJobTypeClick("parttime")}
                >
                  Part time
                </Button>
                <Button
                  variant={jobType === "both" ? "primary" : "outline-primary"}
                  onClick={() => handleJobTypeClick("both")}
                >
                  Both (Full time and Part time)
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
      {/* location */}
      <div className="bg-white">
        <div className="containers p-5 my-3">
          <Form>
            <h5 className="text-lg font-semibold mb-3">Location</h5>
            <p className="text-gray-600 mb-3">
              Let candidates know where they will be working from.
            </p>

            <Form.Group controlId="Location">
              <Form.Label>Work location type *</Form.Label>
              <div className="d-flex flex-column flex-md-row ">
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    location === "WorkFromOffice"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleJoblocationClick("WorkFromOffice")}
                >
                  Work From Office
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    location === "WorkFromHome" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleJoblocationClick("WorkFromHome")}
                >
                  Work From Home
                </Button>
                <Button
                  variant={
                    location === "fieldjob" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleJoblocationClick("fieldjob")}
                >
                  field job
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
      {/* paytype */}
      <div className="bg-white">
        <div className="containers p-5 my-3">
          <Form>
            <h5 className="text-lg font-semibold mb-3">Compensatinon</h5>
            <p className="text-gray-600 mb-3">
              Job postings with right salary & incentives will help you find the
              right candidate
            </p>

            <Form.Group controlId="What is the pay type">
              <Form.Label> What is the pay type ? *</Form.Label>
              <div className="d-flex flex-column flex-md-row ">
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    paytype === "fixed only" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleJobpaytypeClick("fixed only")}
                >
                  fixed only
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  variant={
                    paytype === "fixed + incentive"
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleJobpaytypeClick("fixed + incentive")}
                >
                  fixed + incentive
                </Button>
                <Button
                  variant={
                    paytype === "incentive Only" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleJobpaytypeClick("incentive Only")}
                >
                  incentive Only
                </Button>
              </div>
            </Form.Group>

            {paytype.includes("fixed only") ? (
              <Form.Group controlId="inputOfThePayType">
                <Form.Label>Salary Range</Form.Label>
                <div className="d-flex flex-row">
                  <div className="flex-grow-1 me-2">
                    <Form.Control
                      type="number"
                      placeholder="Minimum salary"
                      value={Minimum}
                      onChange={(e) => setminimumn(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <Form.Control
                      type="number"
                      placeholder="Maximum salary"
                      required
                      value={Maximum}
                      onChange={(e) => setmaximum(e.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
            ) : paytype.includes("fixed + incentive") ? (
              <Form.Group controlId="inputOfThePayType">
                <Form.Label>Salary Range</Form.Label>
                <div className="d-flex flex-row">
                  <div className="flex-grow-1 me-2">
                    <Form.Control
                      type="number"
                      placeholder="Minimum salary"
                      required
                      value={Minimum}
                      onChange={(e) => setminimumn(e.target.value)}
                    />
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <Form.Control
                      type="number"
                      placeholder="Maximum salary"
                      required
                      value={Maximum}
                      onChange={(e) => setmaximum(e.target.value)}
                    />
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <Form.Control
                      type="number"
                      placeholder="Incentive"
                      required
                      value={incentive}
                      onChange={(e) => setincentive(e.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
            ) : paytype.includes("incentive Only") ? (
              <Form.Group controlId="inputOfThePayType">
                <Form.Label>Salary Range</Form.Label>
                <div className="d-flex flex-row">
                  <div className="flex-grow-1 ms-2">
                    <Form.Control
                      type="number"
                      placeholder="Incentive"
                      required
                      value={incentive}
                      onChange={(e) => setincentive(e.target.value)}
                    />
                  </div>
                </div>
              </Form.Group>
            ) : null}

            {/*  next line */}

            <Form.Group controlId="Do you Offer Any Additional perks ">
              <Form.Label className="mt-4">
                Do you Offer Any Additional perks ? *
              </Form.Label>
              {/* section one five Button */}

              <div className="d-flex flex-column flex-md-row p-3">
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  style={{ marginRight: "10px" }}
                  variant={
                    add.includes("Flexible Working Hours")
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleadditional("Flexible Working Hours")}
                >
                  Flexible Working Hours
                  {add.includes("Flexible Working Hours") ? (
                    <IoClose style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaPlus style={{ marginLeft: "5px" }} />
                  )}
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  style={{ marginRight: "10px" }}
                  variant={
                    add.includes("Weekly payout")
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleadditional("Weekly payout")}
                >
                  Weekly payout
                  {add.includes("Weekly payout") ? (
                    <IoClose style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaPlus style={{ marginLeft: "5px" }} />
                  )}
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  style={{ marginRight: "10px" }}
                  variant={
                    add.includes("Overtime Pay") ? "primary" : "outline-primary"
                  }
                  onClick={() => handleadditional("Overtime Pay")}
                >
                  Overtime Pay
                  {add.includes("Overtime Pay") ? (
                    <IoClose style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaPlus style={{ marginLeft: "5px" }} />
                  )}
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  style={{ marginRight: "10px" }}
                  variant={
                    add.includes("Joining Bonus")
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleadditional("Joining Bonus")}
                >
                  Joining Bonus
                  {add.includes("Joining Bonus") ? (
                    <IoClose style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaPlus style={{ marginLeft: "5px" }} />
                  )}
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  style={{ marginRight: "10px" }}
                  variant={
                    add.includes("Annul Bonus") ? "primary" : "outline-primary"
                  }
                  onClick={() => handleadditional("Annul Bonus")}
                >
                  Annul Bonus
                  {add.includes("Annul Bonus") ? (
                    <IoClose style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaPlus style={{ marginLeft: "5px" }} />
                  )}
                </Button>
              </div>
              {/* section two five Button */}
              <div className="d-flex flex-column flex-md-row ps-3 pe-3">
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  style={{ marginRight: "10px" }}
                  variant={add.includes("PF") ? "primary" : "outline-primary"}
                  onClick={() => handleadditional("PF")}
                >
                  PF
                  {add.includes("PF") ? (
                    <IoClose style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaPlus style={{ marginLeft: "5px" }} />
                  )}
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  style={{ marginRight: "10px" }}
                  variant={
                    add.includes("Travel Allowance")
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleadditional("Travel Allowance")}
                >
                  Travel Allowance (TA)
                  {add.includes("Travel Allowance") ? (
                    <IoClose style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaPlus style={{ marginLeft: "5px" }} />
                  )}
                </Button>
                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  style={{ marginRight: "10px" }}
                  variant={
                    add.includes("Health Inusrance")
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleadditional("Health Inusrance")}
                >
                  Health Inusrance
                  {add.includes("Health Inusrance") ? (
                    <IoClose style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaPlus style={{ marginLeft: "5px" }} />
                  )}
                </Button>

                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  style={{ marginRight: "10px" }}
                  variant={
                    add.includes("Mobile Allowance")
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => handleadditional("Mobile Allowance")}
                >
                  Mobile Allowance
                  {add.includes("Mobile Allowance") ? (
                    <IoClose style={{ marginLeft: "5px" }} />
                  ) : (
                    <FaPlus style={{ marginLeft: "5px" }} />
                  )}
                </Button>

                <Button
                  className="me-md-2 mb-2 mb-md-0"
                  style={{ marginRight: "10px" }}
                  variant={
                    add.includes("Laptop") ? "primary" : "outline-primary"
                  }
                  onClick={() => handleadditional("Laptop")}
                >
                  Laptop
                  {add.includes("Laptop") ? (
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

      {/* Job Categories */}

      <div className="bg-white">
        <div className="containers p-5 my-3">
          <Form>
            <h5 className="text-lg font-semibold mb-3">Job Category</h5>
            <p className="text-gray-600 mb-3">
              Select the industry that best matches the job.
            </p>
            <Form.Group controlId="JobCategory">
              <Form.Label>Category *</Form.Label>
              <div className="d-flex flex-column">
                <Form.Check
                  type="radio"
                  label="Information Technology"
                  name="jobCategory"
                  id="it"
                  checked={selectedCategory === "InformationTechnology"}
                  onChange={() => handleCategoryChange("InformationTechnology")}
                />
                <Form.Check
                  type="radio"
                  label="Healthcare"
                  name="jobCategory"
                  id="healthcare"
                  checked={selectedCategory === "Healthcare"}
                  onChange={() => handleCategoryChange("Healthcare")}
                />
                <Form.Check
                  type="radio"
                  label="Finance"
                  name="jobCategory"
                  id="finance"
                  checked={selectedCategory === "Finance"}
                  onChange={() => handleCategoryChange("Finance")}
                />
                <Form.Check
                  type="radio"
                  label="Education"
                  name="jobCategory"
                  id="education"
                  checked={selectedCategory === "Education"}
                  onChange={() => handleCategoryChange("Education")}
                />
                <Form.Check
                  type="radio"
                  label="Engineering"
                  name="jobCategory"
                  id="engineering"
                  checked={selectedCategory === "Engineering"}
                  onChange={() => handleCategoryChange("Engineering")}
                />
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>

      <div className="bg-white d-flex justify-content-center align-items-center">
        <button onClick={Continue} className="wonderful-button">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Jobdetails;

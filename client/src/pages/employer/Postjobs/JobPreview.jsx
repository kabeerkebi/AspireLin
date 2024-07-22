import React, { useEffect, useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AxiosClient } from "../../../config/api";
import { useSnackbar } from "notistack";
import { UpdateThedatasArry } from "../../../redux/action";
import "./postjob.css";
const JobPreview = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [InterviewInformation, setInterviewInformation] = useState(true);
  const [CandidateRequirment, setCandidateRequirment] = useState(true);
  const [jobdetails, setJobdetails] = useState(true);

  const { continueorupdate, indexvalue } = useSelector(
    (state) => state.indexvalue
  );
  const {
    CompanyName,
    JobTitle,
    TypeJob,
    Locations,
    MinimumPay,
    MaximumPay,
    PayTypes,
    IncentivePay,
    TotalExperince,
    HowManyYearExperince,
    MinimumEducation,
    EnglishLevel,
    Description,
    TypeOfInterviews,
    CompanyAddress,
    TheobjID,
    Theimages,
    Category,
  } = useSelector((state) => state.postjobdata.datas);

  const dispatch = useDispatch();
  const EditButton3 = () => {
    navigate(`/employer/postjob/InterviewerInformation/${id}`);
  };
  const EditButton2 = () => {
    navigate(`/employer/postjob/CandidateRequirements/${id}`);
  };
  const EditButton1 = () => {
    navigate(`/employer/postjob/jobdetails/${id}`);
  };
  const navigate = useNavigate();
  const Back = () => {
    navigate(`/employer/postjob/InterviewerInformation/${id}`);
  };
  const Continue = () => {
    navigate(`/employer/postjob/Payment/${id}`);
  };

  const SendData = {
    updatedData: {
      datas: {
        CompanyName: CompanyName,
        JobTitle: JobTitle,
        TypeJob: TypeJob,
        Locations: Locations,
        MinimumPay: MinimumPay,
        MaximumPay: MaximumPay,
        IncentivePay: IncentivePay,
        TotalExperince: TotalExperince,
        HowManyYearExperince: HowManyYearExperince,
        MinimumEducation: MinimumEducation,
        EnglishLevel: EnglishLevel,
        Description: Description,
        TypeOfInterviews: TypeOfInterviews,
        CompanyAddress: CompanyAddress,
        PayTypes: PayTypes,
        TheobjID: TheobjID,
        Theimages: Theimages,
        Category: Category,
      },
    },
  };

  const Update = async () => {
    try {
      await AxiosClient.put(
        `/postjob/updatedatas/${id}/${indexvalue}`,
        SendData
      );
      navigate(`/employer/slidebar/${id}`);
      enqueueSnackbar("Data is Updated ", { variant: "success" });
      dispatch(UpdateThedatasArry(false)); // Dispatch action to update Todeletetrue to false
    } catch (error) {
      console.log("your code has an error", error);
    }
  };

  const Todropdown3 = () => {
    setInterviewInformation(!InterviewInformation);
  };
  const Todropdown2 = () => {
    setCandidateRequirment(!CandidateRequirment);
  };
  const Todropdown1 = () => {
    setJobdetails(!jobdetails);
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
        <span className="checkmark rounded-circles">
          <ImCheckmark />
        </span>
        <hr className="jobpost-hr" />
        <div style={{ display: "flex" }}>
          <span className="rounded-circles bg-dark text-white p-1"> 4</span>
          <span className="job-details  d-none d-md-block">Job Preview</span>
        </div>
        <hr className="jobpost-hr" />
        <span className="number">5</span>
      </div>
      {/*  {  all details } */}
      <div className="bg-white">
        <div className="containers p-2">
          {/* job details  */}
          <div className="d-flex justify-content-between">
            <h5 className="text-lg font-semibold mb-4">Job Details</h5>
            <div style={{ display: "flex" }}>
              <MdEdit
                size={21}
                className="me-3 mt-2 text-primary "
                onClick={EditButton1}
              />

              {jobdetails ? (
                <IoIosArrowDropup
                  className="dropdowicon mt-2"
                  onClick={Todropdown1}
                />
              ) : (
                <IoIosArrowDropdown
                  className="dropdowicon mt-2"
                  onClick={Todropdown1}
                />
              )}
            </div>
          </div>

          {jobdetails ? (
            <div>
              <div className="job-portal4-div">
                <span className="left-div-portal4"> company name </span>
                <p> {CompanyName}</p>
              </div>

              <div className="job-portal4-div">
                <span className=" left-div-portal4"> Job Title </span>
                <p> {JobTitle}</p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4"> Job type </span>
                <p> {TypeJob}</p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4"> Work type </span>
                <p> {Locations}</p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4">
                  Monthly Salary | Pay Type
                </span>
                <p>
                  <span>{`₹${MinimumPay}-`} </span>
                  <span>{`₹${MaximumPay}`} </span>
                  <span>({PayTypes})</span>
                </p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4">Additional perks</span>
                <p>Flexible Working Hours</p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4">Joining Fee</span>
                <p>No</p>
              </div>
            </div>
          ) : null}
          <hr />
          {/* Candidate Requirments */}

          <div className="d-flex justify-content-between">
            <h5 className="text-lg font-semibold mb-3 mt-3">
              {" "}
              Candidate Requirments{" "}
            </h5>
            <div style={{ display: "flex" }}>
              <MdEdit
                size={21}
                className="me-3 mt-2 text-primary "
                onClick={EditButton2}
              />

              {CandidateRequirment ? (
                <IoIosArrowDropup
                  className="dropdowicon mt-2"
                  onClick={Todropdown2}
                />
              ) : (
                <IoIosArrowDropdown
                  className="dropdowicon mt-2"
                  onClick={Todropdown2}
                />
              )}
            </div>
          </div>

          {CandidateRequirment ? (
            <div>
              <div className="job-portal4-div">
                <span className="left-div-portal4"> Minimum Education </span>
                <p> {MinimumEducation}</p>
              </div>

              <div className="job-portal4-div">
                <span className=" left-div-portal4"> Experience Required</span>
                <p> {TotalExperince} </p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4"> Minimum Experience</span>
                <p> {HowManyYearExperince}</p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4"> English </span>
                <p> {EnglishLevel}</p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4"> Age</span>
                <p>18 - 60 yrs</p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4">Gender</span>
                <p>Both genders allowed</p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4">Candidate Titles</span>
                <p>None</p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4">
                  Candidate job role / category
                </span>
                <p>None</p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4">CIndustry</span>
                <p>None</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6> Description</h6>

                <div style={{ marginTop: "10px", overflow: "auto" }}>
                  <div dangerouslySetInnerHTML={{ __html: Description }} />
                </div>
              </div>
            </div>
          ) : null}
          <hr />
          {/* Interview Information  */}
          <div className="d-flex justify-content-between">
            <h5 className="text-lg font-semibold mb-3 mt-3">
              Interview Information
            </h5>
            <div style={{ display: "flex" }}>
              <MdEdit
                size={21}
                className="me-3 mt-2 text-primary "
                onClick={EditButton3}
              />

              {InterviewInformation ? (
                <IoIosArrowDropup
                  className="dropdowicon mt-2"
                  onClick={Todropdown3}
                />
              ) : (
                <IoIosArrowDropdown
                  className="dropdowicon mt-2"
                  onClick={Todropdown3}
                />
              )}
            </div>
          </div>

          {InterviewInformation ? (
            <div>
              <div className="job-portal4-div">
                <span className="left-div-portal4">Type of Interview</span>
                <p> {TypeOfInterviews}</p>
              </div>

              <div className="job-portal4-div">
                <span className=" left-div-portal4"> Interview address</span>
                <p> No</p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4"> Company address</span>
                <p>{CompanyAddress}</p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4">HR Details</span>
                <p>No</p>
              </div>
              <div className="job-portal4-div">
                <span className=" left-div-portal4">
                  Can candidates contact
                </span>
                <p>Yes</p>
              </div>
            </div>
          ) : null}
          <hr />
        </div>
      </div>

      <div className="bg-white d-flex justify-content-center align-items-center">
        <button className="back-button" onClick={Back}>
          back
        </button>
        <button
          className="wonderful-button"
          onClick={continueorupdate ? Update : Continue}
        >
          {continueorupdate ? "update" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default JobPreview;

import React, { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import "./View.css";

const ViewJob = ({ Storedatas }) => {
  const [jobDetails, setJobDetails] = useState(true);
  const [interviewInformation, setInterviewInformation] = useState(false);
  const [candidateRequirement, setCandidateRequirement] = useState(false);

  const toggleDropdown = (setFunction) => {
    setFunction((prevState) => !prevState);
  };

  return (
    <div className="view-job-container">
      <div className="content-container">
        <div className="section">
          <div
            className="section-header"
            onClick={() => toggleDropdown(setJobDetails)}
          >
            <h5>Job Details</h5>
            {jobDetails ? (
              <IoIosArrowDropup className="dropdown-icon" />
            ) : (
              <IoIosArrowDropdown className="dropdown-icon" />
            )}
          </div>
          {jobDetails && (
            <div className="section-content">
              <div className="job-detail">
                <span className="job-detail-label">Job Title:</span>
                <span className="job-detail-value">{Storedatas.JobTitle}</span>
              </div>

              <div className="job-detail">
                <span className="job-detail-label">Job Type:</span>
                <span className="job-detail-value">{Storedatas.TypeJob}</span>
              </div>

              <div className="job-detail">
                <span className="job-detail-label">Work Type:</span>
                <span className="job-detail-value">{Storedatas.Locations}</span>
              </div>

              <div className="job-detail">
                <span className="job-detail-label">
                  Monthly Salary | Pay Type:
                </span>
                <span className="job-detail-value">
                  ${Storedatas.MinimumPay}
                </span>
              </div>

              <div className="job-detail">
                <span className="job-detail-label">Additional Perks:</span>
                <span className="job-detail-value">Flexible Working Hours</span>
              </div>

              <div className="job-detail">
                <span className="job-detail-label">Joining Fee:</span>
                <span className="job-detail-value">No</span>
              </div>
            </div>
          )}
        </div>
        <hr />
        <div className="section">
          <div
            className="section-header"
            onClick={() => toggleDropdown(setCandidateRequirement)}
          >
            <h5>Requirements</h5>
            {candidateRequirement ? (
              <IoIosArrowDropup className="dropdown-icon" />
            ) : (
              <IoIosArrowDropdown className="dropdown-icon" />
            )}
          </div>
          {candidateRequirement && (
            <div className="section-content">
              <div className="job-detail">
                <span className="job-detail-label">Minimum Education:</span>
                <span className="job-detail-value">
                  {Storedatas.MinimumEducation}
                </span>
              </div>
              <div className="job-detail">
                <span className="job-detail-label">Experience Required:</span>
                <span className="job-detail-value">
                  {Storedatas.TotalExperince}
                </span>
              </div>
              <div className="job-detail">
                <span className="job-detail-label">Minimum Experience:</span>
                <span className="job-detail-value">
                  {Storedatas.HowManyYearExperince}
                </span>
              </div>
              <div className="job-detail">
                <span className="job-detail-label">English:</span>
                <span className="job-detail-value">
                  {Storedatas.EnglishLevel}
                </span>
              </div>
              <div className="job-detail">
                <span className="job-detail-label">Age:</span>
                <span className="job-detail-value">18 - 60 yrs</span>
              </div>
              <div className="job-detail">
                <span className="job-detail-label">Gender:</span>
                <span className="job-detail-value">Both genders allowed</span>
              </div>
              <div className="job-detail">
                <span className="job-detail-label">Candidate Titles:</span>
                <span className="job-detail-value">None</span>
              </div>
              <div className="job-detail description">
                <span className="job-detail-label">Description:</span>
                <div
                  className="job-detail-description"
                  dangerouslySetInnerHTML={{ __html: Storedatas.Description }}
                />
              </div>
            </div>
          )}
        </div>
        <hr />
        <div className="section">
          <div
            className="section-header"
            onClick={() => toggleDropdown(setInterviewInformation)}
          >
            <h5>Interview Information</h5>
            {interviewInformation ? (
              <IoIosArrowDropup className="dropdown-icon" />
            ) : (
              <IoIosArrowDropdown className="dropdown-icon" />
            )}
          </div>
          {interviewInformation && (
            <div className="section-content">
              <div className="job-detail">
                <span className="job-detail-label">Type of Interview :</span>
                <span className="job-detail-value">
                  {Storedatas.TypeOfInterviews}
                </span>
              </div>
              <div className="job-detail">
                <span className="job-detail-label">Interview address:</span>
                <span className="job-detail-value">No</span>
              </div>
              <div className="job-detail">
                <span className="job-detail-label">Company address:</span>
                <span className="job-detail-value">
                  {Storedatas.CompanyAddress}
                </span>
              </div>
              <div className="job-detail">
                <span className="job-detail-label">HR Details:</span>
                <span className="job-detail-value">No</span>
              </div>
              <div className="job-detail">
                <span className="job-detail-label">Can candidates contact</span>
                <span className="job-detail-value">Yes</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewJob;

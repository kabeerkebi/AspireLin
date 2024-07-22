import React, { useState, useEffect, useRef } from "react";
import imageleft from "../../assets/user/ecomopti.png";
import imageright from "../../assets/user/imagedownl_odddd-removebg-preview.png";
import "./jobfinder.css";
import Rightsection from "../../components/user/Rightsection";
import Leftsection from "../../components/user/Leftsection";
import { AxiosClient } from "../../config/api.js";
import { useNavigate } from "react-router-dom";
import { createTokenHeader } from "../.././utils/createHeader.js";

const JobFinder = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [originalJobData, setOriginalJobData] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [filteredCheckboxData, setFilteredCheckboxData] = useState([]);
  const [isCheckboxFilterApplied, setCheckboxFilterApplied] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    CheckTokentrue();
    const fetchJobData = async () => {
      try {
        const response = await AxiosClient.get("/postjob/togetalldatas");

        const data = response.data.thedata.map((item, index) => ({
          ...item,
          originalIndex: index,
        }));
        setOriginalJobData(data);
        setJobData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobData();
  }, []);
  const CheckTokentrue = async () => {
    // Create the token header
    const headers = createTokenHeader(false);
    try {
      // Make the GET request with the header
      const result = await AxiosClient.get(
        "/logindata/check-login",
        headers // Pass headers correctly
      );
      // Check the response data for the unauthorized flag
      if (result.data?.unauthorized) {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    const filterJobs = () => {
      let filteredJobs = originalJobData;

      if (searchInput) {
        filteredJobs = filteredJobs.filter((item) =>
          item.datas.JobTitle.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      if (isCheckboxFilterApplied) {
        filteredJobs = filteredJobs.filter((item) =>
          filteredCheckboxData.some(
            (checkboxItem) =>
              checkboxItem.datas.JobTitle === item.datas.JobTitle
          )
        );
      }

      setJobData(filteredJobs);

      const jobTitlesWithIndex = filteredJobs.map((item, index) => ({
        position: index,
        title: item.datas.JobTitle,
      }));

      setJobTitles(jobTitlesWithIndex);
    };

    filterJobs();
  }, [
    searchInput,
    filteredCheckboxData,
    isCheckboxFilterApplied,
    originalJobData,
  ]);

  const handleCheckboxChange = (data) => {
    setFilteredCheckboxData(data);
    setCheckboxFilterApplied(true);
  };

  const handleSearchInputChange = (input) => {
    setSearchInput(input);
    setDropdownVisible(true);
  };

  const handleSearchButtonClick = () => {
    // Optional: Implement specific search button functionality
    setDropdownVisible(false);
  };

  const updateSearchInput = (index) => {
    const selectedTitle = jobTitles[index].title;
    setSearchInput(selectedTitle);
    setDropdownVisible(false);
    const filteredBySearch = originalJobData.filter((item) =>
      item.datas.JobTitle.toLowerCase().includes(selectedTitle.toLowerCase())
    );
    setJobData(filteredBySearch);
    setCheckboxFilterApplied(false); // Disable checkbox data display when searching
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="main-input">
          <div className="input-div container m-5 w-100">
            <div className="input-heading-div">
              <div className="input-heading">
                <h4 className="mb-4 pt-2 text-2xl font-semibold">
                  Explore Job Opportunities
                </h4>
                <p>
                  Find your dream job with ease. We provide a wide range of job
                  listings to match your skills and preferences.
                </p>
              </div>
            </div>
            <div className="row pb-1 pe-3 ps-3 row-first">
              <div className="col-12 col-lg-2 d-none d-lg-block">
                <div className="image-container">
                  <img
                    src={imageleft}
                    alt="Job search illustration"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-12 col-md-8 input-center">
                <div className="search-container">
                  <div className="row background-input p-4">
                    <div className="col-md-4 input-col-center">
                      <input
                        type="text"
                        placeholder="Search for a job"
                        className="job-input"
                        value={searchInput}
                        onChange={(e) =>
                          handleSearchInputChange(e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-4 input-col-center">
                      <input
                        type="text"
                        placeholder="Enter Location"
                        className="location-input"
                      />
                    </div>
                    <div className="col-md-4 input-col-center">
                      <button
                        className="btn btn-primary"
                        onClick={handleSearchButtonClick}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  <div className="the-search-box-dropdowns">
                    {isDropdownVisible && (
                      <div className="dropdown-menu show" ref={dropdownRef}>
                        {jobTitles.length > 0 ? (
                          jobTitles.map((item, index) => (
                            <div
                              key={item.position}
                              className="dropdown-item"
                              onClick={() => updateSearchInput(index)}
                            >
                              {item.title}
                            </div>
                          ))
                        ) : (
                          <div className="dropdown-item">Data not found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-2 d-none d-lg-block">
                <div className="image-container">
                  <img
                    src={imageright}
                    alt="Job search illustration"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="d-flex flex-column-reverse flex-lg-row"
        style={{ minHeight: "100vh" }}
      >
        <div className="flex-shrink-0 left-div ms-5">
          <Leftsection ShareData={handleCheckboxChange} />
        </div>
        <div className="flex-grow-1 right-div p-3">
          <Rightsection ShareData={jobData} />
        </div>
      </div>
    </div>
  );
};

export default JobFinder;

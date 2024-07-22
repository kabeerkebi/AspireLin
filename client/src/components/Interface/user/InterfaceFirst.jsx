import React, { useState, useEffect, useRef } from "react";
import "./interfirst.css";
import Imageinterface from "../../../assets/Interface/diseno-de-paginas-web.png";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import  {AxiosClient} from "../../../config/api.js"

const  InterfaceFirst = () => {
  const navigate = useNavigate();
  const [loginFormVisible, setLoginFormVisible] = useState(false);
  const [registerFormVisible, setRegisterFormVisible] = useState(false);
  const [jobTitles, setJobTitles] = useState([]);
  const [selectedJobIndex, setSelectedJobIndex] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [validatedSearchInput, setValidatedSearchInput] = useState("");
  const dropdownRef = useRef(null);

  const handleRegisterButtonClick = () => {
    setRegisterFormVisible(true);
  };
  const handleLoginButtonClick = () => {
    setLoginFormVisible(true);
  };

  const closeForm = () => {
    setLoginFormVisible(false);
    setRegisterFormVisible(false);
  };
  const showLoginForm = () => {
    setRegisterFormVisible(false);
    setLoginFormVisible(true);
  };
  const showRegisterForm = () => {
    setLoginFormVisible(false);
    setRegisterFormVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosClient.get(
          "/postjob/togetalldatas"
        );

        const jobTitles = response.data.thedata.map((item, index) => ({
          key: index,
          value: item.datas.JobTitle,
          theid: item.datas.TheobjID,
        }));

        setJobTitles(jobTitles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (data) => {
    setDropdownVisible(true);
    setSearchInput(data);
  };

  const filteredJobTitles = jobTitles.filter((job) =>
    job.value.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleJobTitleClick = (value, index, theid) => {
    setSelectedJobId(theid);
    setSelectedJobIndex(index);
    setSearchInput(value);
    setDropdownVisible(false);
    setValidatedSearchInput(value);
  };

  const handleSearchButtonClick = () => {
    if (searchInput === validatedSearchInput) {
      navigate(`user/applyjob/${selectedJobIndex}/${selectedJobId}`);
    }
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
      {registerFormVisible && (
        <Register Registervalue={closeForm} tologin={showLoginForm} />
      )}

      {loginFormVisible && (
        <Login loginvalue={closeForm} toregister={showRegisterForm} />
      )}

      <div className="container-fluid p-5 main">
        <div className="row mt-3">
          <div className="col-lg-6 order-lg-1 order-2 d-flex align-items-center text-center">
            <div className="mx-auto">
              <h1 className="find-your mb-1">Find your dream job</h1>
              <button className="login-button" onClick={handleLoginButtonClick}>
                Login
              </button>
              <button
                className="register-button"
                onClick={handleRegisterButtonClick}
              >
                Register
              </button>

              <div
                className="col-12 col-sm-8 input-center mt-4"
                style={{ width: "90%" }}
              >
                <div className="search-container">
                  <div className="row background-input p-2">
                    <div className="col-sm-8 input-col-center">
                      <input
                        type="text"
                        placeholder="Search for a job"
                        className="job-input"
                        value={searchInput}
                        onChange={(e) => handleSearchChange(e.target.value)}
                      />
                    </div>

                    <div className="col-sm-4 input-col-center">
                      <button
                        style={{ background: "#001a33", color: "white" }}
                        className="btn"
                        onClick={handleSearchButtonClick}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  <div className="the-search-box-dropdowns" ref={dropdownRef}>
                    {dropdownVisible && (
                      <div className="dropdown-menu show">
                        {filteredJobTitles.length > 0 ? (
                          filteredJobTitles.map((items, index) => (
                            <div
                              key={index}
                              className="dropdown-item"
                              onClick={() =>
                                handleJobTitleClick(
                                  items.value,
                                  items.key,
                                  items.theid
                                )
                              }
                            >
                              {items.value}
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
            </div>
          </div>
          <div className="col-lg-6 mt-lg-5 order-lg-2 order-1 d-flex align-items-center text-center">
            <div className="mx-auto">
              <img
                src={Imageinterface}
                alt="Interface"
                className="img-fluid"
                style={{ maxHeight: "450px", width: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceFirst;

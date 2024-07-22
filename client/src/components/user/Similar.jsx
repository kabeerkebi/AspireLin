import React, { useEffect } from "react";
import "./Similar.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosClient } from "../../config/api";
import { SERVER_DOMAIN } from "../../config/config";
import { useState } from "react";

const Similar = ({ ResetEffect = { Thecardclicked } }) => {
  const { index, id } = useParams();
  const [similarJobs, setsimilarJobs] = useState([]);
  const navigate = useNavigate();
  const Thecardclicked = (id, index) => {
    navigate(`/user/applyjob/${index}/${id}`);
    window.scroll(0, 0);
    ResetEffect();
  };
  useEffect(() => {
    const fecthdata = () => {
      AxiosClient.get(`/postjob//similarjobs/${id}/${index}`)
        .then((result) => {
          setsimilarJobs(result.data.Thedata);
        })
        .catch((er) => console.log(er));
    };
    fecthdata();
  }, [ResetEffect]);
  return (
    <div className="similar-container">
      {similarJobs.length > 0 ? (
        <>
          <h1 className="similar-heading">Similar Jobs</h1>
          <div className="similar-cards-container">
            {similarJobs.map((job, ind) => (
              <div
                className="similar-card-horizontal"
                key={ind + job.index}
                onClick={() => Thecardclicked(job.datas.TheobjID, job.index)}
              >
                <div className="similar-card-logo-container">
                  <img
                    src={SERVER_DOMAIN + job.datas.Theimages}
                    alt={`${job.datas.Theimages} logo`}
                    className="similar-card-logo"
                  />
                </div>
                <div className="similar-card-content">
                  <h2 className="similar-card-title">{job.datas.JobTitle}</h2>
                  <p className="similar-card-company">
                    {job.datas.CompanyName}
                  </p>
                  <div className="similar-card-location">
                    <LocationOnIcon className="me-1" />
                    <span>{job.datas.CompanyAddress}</span>
                  </div>
                  <div className="similar-card-meta">
                    {/* <span>{job.hours} hours/week</span>
                <span> | </span>
                <span>{job.level}</span> */}
                  </div>
                  <div className="similar-card-button">
                    <Button variant="contained" color="primary">
                      View Job
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Similar;

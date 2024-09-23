import React, { useEffect } from "react";
import "../../pages/user/jobfinder.css";
import { Card } from "react-bootstrap";
import { Button } from "@nextui-org/react";
import { SERVER_DOMAIN } from "../.././config//config.js";
import { CiLocationOn } from "react-icons/ci";
import { FaBusinessTime } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Rightsection = ({ ShareData }) => {
  const navigate = useNavigate();
  const TgoNext = (index, id) => {
    // alert(index+id)
    navigate(`/user/applyjob/${index}/${id}`);
    // next code here
  };
  //   useEffect(() => {
  //     if (ShareData.length === 0) {
  //       setthedatas(Allsharedata)
  //     }else{
  // // setthedatas(ShareData)

  //     }
  // }, [ShareData]);
  useEffect(() => {
    // console.log(ShareData);
  }, [ShareData]);
  return (
    <div className="flex-grow-1 right-div p-3">
      <div className="container row">
        {ShareData &&
          ShareData.map((jobdata, index) => (
            <div
              key={`${jobdata.originalIndex} ${index}`}
              className="col-lg-6 col-md-6 col-xl-4  my-3"
            >
              {/* Added key prop here */}
              <Card
                className="job-card p-3 shadow"
                style={{ minHeight: "435px", minWidth: "300px" }}
              >
                <div className="image-icon-div mt-4">
                  <Card.Img
                    className="img-fluid rounded-circle border-primary mb-3 "
                    src={jobdata.datas.Theimages}
                    alt=""
                  />
                  <Card.Title className="m-2 m-3 text-center card-company">
                    {jobdata.datas.CompanyName}
                    <Card.Text className="text-muted location-card mt-2">
                      <CiLocationOn className="location-icon me-1" />
                      {jobdata.datas.CompanyAddress}
                    </Card.Text>
                  </Card.Title>
                </div>

                <Card.Body className="flex-column card-body-findjob">
                  <Card.Title className="text-center card-jobs">
                    {jobdata.datas.JobTitle}
                  </Card.Title>
                  <div className="container row card-timeandminute">
                    <div className="col-3 me-1">
                      <span
                        className="badge  card-full-time"
                        style={{ color: "#303439" }}
                      >
                        <FaBusinessTime
                          fontSize={16}
                          style={{
                            marginBottom: "2px",
                            marginRight: "4px",
                          }}
                        />
                        {jobdata.datas.TypeJob}
                      </span>
                    </div>
                    {/* <div className="col-3 ms-1">
                      <span
                        className="text-muted badge minute-ago  "
                        style={{ fontSize: "13px" }}
                      >
                        <IoMdTime
                          fontSize={16}
                          style={{
                            marginBottom: "2px",
                            marginRight: "4px",
                          }}
                        />
                        {jobdata.datas.Locations}
                      </span>
                    </div> */}
                  </div>

                  <Card.Text
                    className="mb-3"
                    style={{ maxHeight: "150px", overflow: "auto" }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: jobdata.datas.Description,
                      }}
                    />
                  </Card.Text>
                  {/* <div className="container row">
                    <div className="col-3 me-1">
                      <span className="badge skill" style={{ color: "black" }}>
                        {jobdata.datas.MinimumEducation}
                      </span>
                    </div>
                    <div className="col-3 ms-1">
                      <span className="skill badge " style={{ color: "black" }}>
                        {jobdata.datas.EnglishLevel}
                      </span>
                    </div>
                  </div> */}

                  <div className="container row">
                    <div className="col-6">
                      <span className=" ">
                        from ${jobdata.datas.MinimumPay}/hour{" "}
                      </span>
                    </div>
                    <div className="col-6 ">
                      <Button
                        style={{ borderRadius: "14px" }}
                        color="primary"
                        className="text-white"
                        // style={{ margin: "1rem" }}
                        // variant="primary"
                        // size="sm mt-3"
                        onClick={() =>
                          TgoNext(
                            jobdata.originalIndex !== undefined
                              ? jobdata.originalIndex
                              : index,
                            jobdata.datas.TheobjID
                          )
                        }
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Rightsection;

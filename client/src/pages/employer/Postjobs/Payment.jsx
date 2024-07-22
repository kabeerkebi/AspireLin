import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { ImCheckmark, ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { AxiosClient } from "../../../config/api";
import { useSelector } from "react-redux";
import "./postjob.css";

const Payment = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();
  const Back = () => {
    navigate(`/employer/postjob/JobPreview/${id}`);
  };
  const {
    CompanyName,
    JobTitle,
    TypeJob,
    Locations,
    MinimumPay,
    MaximumPay,
    IncentivePay,
    TotalExperince,
    HowManyYearExperince,
    MinimumEducation,
    EnglishLevel,
    Description,
    TypeOfInterviews,
    CompanyAddress,
    TheobjID,
    PayType,
    Theimages,
    Category,
  } = useSelector((state) => state.postjobdata.datas);
  // to the image redux value

  const SendData = {
    postjobdata: {
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
        PayType: PayType,
        TheobjID: TheobjID,
        Theimages: Theimages,
        Category: Category,
      },
    },
  };

  const Continue = async () => {
    await AxiosClient.put(`/postjob/${id}`, SendData)
      .then(() => {
        navigate(`/employer/slidebar/${id}`);
        enqueueSnackbar("The Data Is Saved", { variant: "success" });
      })
      .catch((er) => console.log(er));
  };

  const Premium = () => {
    enqueueSnackbar("sorry not avalible", { variant: "warning" });
  };
  const SuperPremium = () => {
    enqueueSnackbar("sorry not avalible", { variant: "warning" });
  };
  const Classic = () => settoseeclassic(true);
  {
  }
  const { enqueueSnackbar } = useSnackbar();
  const [seeclassic, settoseeclassic] = useState(false);
  window.scrollTo(0, document.body.scrollHeight);
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
        <span className="checkmark rounded-circles">
          <ImCheckmark />
        </span>
        <hr className="jobpost-hr" />
        <div style={{ display: "flex" }}>
          <span className="rounded-circles bg-dark text-white p-1"> 5</span>
          <span className="job-details d-none d-md-block">
            Interviewer information
          </span>
        </div>
        <hr className="jobpost-hr" />
      </div>

      {/* first section { interview method  } */}
      <div className="bg-white">
        <div className="containers p-2">
          <div className="text-center">
            <h3 className="text-2xl font-semibold">
              Hire top talent at incredibly low costs.
            </h3>
            <p className="text-gray-600">
              Choose a preferred plan below to post a job and get relevant
              candidates to hire
            </p>
          </div>
          <Container>
            <Row>
              <Col lg={4} sm={12}>
                <Card
                  className="text-center mt-2 p-4"
                  style={{ minWidth: "300px" }}
                  onClick={Classic}
                >
                  <Card.Title className="mb-4">
                    <h5 className="fw-bold">Classic</h5>
                    <Card.Text className="mb-3">Free</Card.Text>
                  </Card.Title>
                  <Card.Body>
                    <ul className="list-unstyled text-left">
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>Valid for 15 days</span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>Job branding</span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>Detailed job description</span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCross className="me-2 text-danger" />
                        <span className="text-muted">
                          Smart boost via Whatsapp
                        </span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCross className="me-1 text-danger" />
                        <span className="text-muted">
                          Higher visibility to candidates
                        </span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCross className="me-2 text-danger" />
                        <span className="text-muted">Urgently hiring tag</span>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} sm={12}>
                <Card
                  className="text-center mt-2  p-4"
                  style={{ minWidth: "300px" }}
                  onClick={Premium}
                >
                  <Card.Title className="mb-4">
                    <h5 className="fw-bold">Premium</h5>
                    <Card.Text className="mb-3">$59</Card.Text>
                  </Card.Title>
                  <Card.Body>
                    <ul className="list-unstyled text-left">
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>Valid for 15 days</span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>Job branding</span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>Detailed job description</span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>Smart boost via Whatsapp</span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>Higher visibility to candidates</span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>Urgently hiring tag</span>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4} sm={12}>
                <Card
                  className="text-center mt-2 p-4"
                  style={{ minWidth: "300px" }}
                  onClick={SuperPremium}
                >
                  <Card.Title className="mb-4">
                    <h5 className="fw-bold">Super Premium</h5>
                    <Card.Text className="mb-3">$99</Card.Text>
                  </Card.Title>
                  <Card.Body>
                    <ul className="list-unstyled text-left">
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>Valid for 15 days</span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>Job branding</span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>Detailed job description</span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>
                          <span className="fw-bold">2x </span>
                          Smart boost via Whatsapp
                        </span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>
                          <span className="fw-bold">2x </span>
                          Higher visibility to candidates
                        </span>
                      </li>
                      <li className="d-flex align-items-center mb-2">
                        <ImCheckmark className="me-2 text-success" />
                        <span>Urgently hiring tag</span>
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      {seeclassic ? (
        <div>
          <div className="bg-white">
            <div className="Purchase">
              <h5 className="text-2xl font-semibold">Purchase details</h5>

              <div className="container m-2">
                <div className="Paymentsummary p-3 border border-3">
                  <p> Payment summary </p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="ms-3 text-muted">GST (18%)</div>
                    <div className="me-3">
                      <span>₹53.82</span>
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="ms-3 ">
                      Discount (100%){" "}
                      <span className="badge bg-success">FIRST60 APPLIED</span>
                    </div>
                    <div className="me-3">
                      <span>₹-53.82</span>
                    </div>
                  </div>
                  <hr className="mt-3" />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="ms-3 ">
                      <h5 className="mt-3 text-2xl semi-bold">Total</h5>
                    </div>
                    <div className="me-3">
                      <h5>₹000.00</h5>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white d-flex justify-content-center align-items-center">
            <button className="back-button" onClick={Back}>
              back
            </button>
            <button className="wonderful-button" onClick={Continue}>
              proceed to pay
            </button>
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default Payment;

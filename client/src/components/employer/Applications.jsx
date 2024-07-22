import React from 'react'
import { Container, Card, Row, Col, CardText } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Slidebar.css"; // Import CSS file for custom styling
import { useNavigate, useParams } from "react-router-dom";
const Applications = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const TogoCvpage = ()=>{
      navigate(`/employer/resume/${id}`)
    }
  return (
    <div className="py-5">
    <Container>
      <Row>
        <Col xs={12} sm={12} md={6} lg={4}>
          <Card className="report-card" onClick={TogoCvpage}>
            <Card.Title className="report-card-title">
              <FontAwesomeIcon icon={faUsers} className="report-icon" />
            </Card.Title>
            <Card.Body>
              <CardText>
                <h5 className="report-card-heading">Applications</h5>
                <p className="report-card-text">
                  Get all applications received in a single report
                </p>
                <span className="report-view-more">
                  View More{" "}
                  <FontAwesomeIcon
                    icon={faArrowAltCircleRight}
                    className="arrow-icon"
                  />
                </span>
              </CardText>
            </Card.Body>
          </Card>
        </Col>
        {/* Add more Col components for additional cards */}
      </Row>
    </Container>
  </div>
  )
}

export default Applications

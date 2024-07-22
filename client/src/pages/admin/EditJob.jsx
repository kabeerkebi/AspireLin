import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { AxiosClient } from "../../config/api"; 
import { useParams, useNavigate } from "react-router-dom";

const EditJob = () => {
  const [datas, setTheData] = useState({});
  const navigate = useNavigate();
  const { id, index, arryindex } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const result = await AxiosClient.get("/admin/getallemployerdata");
        setTheData(result.data[arryindex].postjobdata[index].datas);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [arryindex, index]);

  const UpdateTheData = async () => {
    try {
      await AxiosClient.put(`/admin/editemployerdata/${id}/${index}`, { datas });
      alert("Successfully updated");
      navigate("/admindashbord");
    } catch (error) {
      alert("Not successful");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTheData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="bg-white mt-4 p-4 rounded shadow" style={{ maxWidth: "500px", margin: "auto" }}>
      <Form>
        <Form.Group controlId="companyName">
          <Form.Label>Company Name *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter company name"
            required
            name="CompanyName"
            value={datas.CompanyName || ''}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a company name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="jobTitle">
          <Form.Label>Job Title *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter job title"
            required
            name="JobTitle"
            value={datas.JobTitle || ''}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a job title.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="applied">
          <Form.Label>Other *</Form.Label>
          <Form.Control
            as="select"
            required
            name="Applied"
            value={datas.Applied || ''}
            onChange={handleInputChange}
          >
            <option value="">Select status</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select an applied status.
          </Form.Control.Feedback>
        </Form.Group>

        <Button className="mt-3" variant="primary" onClick={UpdateTheData}>
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditJob;

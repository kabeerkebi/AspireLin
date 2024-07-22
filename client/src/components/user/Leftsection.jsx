import React, { useEffect, useState } from "react";
import "../../pages/user/jobfinder.css";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AxiosClient } from "../../config/api";
const Leftsection = ({ ShareData }) => {
  const [Changevalue, setChangeValue] = useState("");
  const [StoreData, setStoreData] = useState([]);
  const [backenddata, setbackenddata] = useState([]);

  const [SentData, setSendData] = useState(false);
  const [checkboxState, setCheckboxState] = useState({
    Workfromhome: false,
    fieldjob: false,
    WorkFromOffice: false,
    Any: false,
    FresherOnly: false,
    ExperinceOnly: false,
  });

  useEffect(() => {
    const filterData = async () => {
      try {
        const response = await AxiosClient.get("/postjob/togetalldatas");
        setbackenddata(response.data.thedata);
        ShareData(response.data.thedata); // Set backenddata to the array inside thedata
      } catch (error) {
        console.log(error);
      }
    };

    filterData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      if (SentData && backenddata.length > 0) {
        let combinedFilteredData = [];

        backenddata.forEach((item, index) => {
          const thedatas = item.datas;
          if (Changevalue === "Experience") {
            const thefinalvalue = StoreData.includes(thedatas.TotalExperince);
            if (thefinalvalue) {
              combinedFilteredData.push({ ...item, originalIndex: index });
            }
          }
          if (Changevalue === "WorkLocation") {
            const thefinalvalue = StoreData.includes(thedatas.Locations);
            if (thefinalvalue) {
              combinedFilteredData.push({ ...item, originalIndex: index });
            }
          }
        });

        if (combinedFilteredData.length === 0) {
          combinedFilteredData = backenddata.map((item, index) => ({
            ...item,
            originalIndex: index,
          }));
        }

        ShareData(combinedFilteredData);
      }
    };

    filterData();
  }, [SentData, backenddata, Changevalue, StoreData, ShareData]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    setSendData(true);
    setChangeValue("WorkLocation");
  };
  const handleCheckboxChangeTWO = (event) => {
    const { name, checked } = event.target;
    setCheckboxState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    setSendData(true);
    setChangeValue("Experience");
  };
  // to call function when the cheked
  useEffect(() => {
    const logCheckedNames = () => {
      const checkedNames = Object.keys(checkboxState).filter(
        (key) => checkboxState[key]
      );
      setStoreData(checkedNames);
    };
    logCheckedNames();
  }, [checkboxState]);

  return (
    <div className="leftsection-container">
      <div className="leftsection-ps-3">
        <div className="leftsection-allfillter">
          All Filters
          <hr />
        </div>
        <FormGroup>
          <h5 style={{ fontSize: "20px" }} className="mt-3">
            WorkLocation
          </h5>
          <div className="leftsection-form-control-label">
            <FormControlLabel
              control={
                <Checkbox
                  name="WorkFromHome"
                  checked={checkboxState.WorkFromHome}
                  onChange={handleCheckboxChange}
                />
              }
              label="WorkFromHome"
            />
            <span className="leftsection-ps-5">7342</span>
          </div>
          <div className="leftsection-form-control-label">
            <FormControlLabel
              control={
                <Checkbox
                  name="fieldjob"
                  checked={checkboxState.fieldjob}
                  onChange={handleCheckboxChange}
                />
              }
              label="fieldjob"
            />
            <span className="leftsection-ps-5">32</span>
          </div>
          <div className="leftsection-form-control-label">
            <FormControlLabel
              control={
                <Checkbox
                  name="WorkFromOffice"
                  checked={checkboxState.WorkFromOffice}
                  onChange={handleCheckboxChange}
                />
              }
              label="WorkFromOffice"
            />
            <span className="leftsection-ps-5">8743</span>
          </div>
        </FormGroup>
      </div>
      <hr />
      {/* second line  */}
      <FormGroup>
        <h5 style={{ fontSize: "20px" }} className="mt-3">
          Experience
        </h5>
        <div className="leftsection-form-control-label">
          <FormControlLabel
            control={
              <Checkbox
                name="Any"
                checked={checkboxState.Any}
                onChange={handleCheckboxChangeTWO}
              />
            }
            label="Any"
          />
          <span className="leftsection-ps-5">7342</span>
        </div>
        <div className="leftsection-form-control-label">
          <FormControlLabel
            control={
              <Checkbox
                name="FresherOnly"
                checked={checkboxState.FresherOnly}
                onChange={handleCheckboxChangeTWO}
              />
            }
            label="Fresher"
          />
          <span className="leftsection-ps-5">32</span>
        </div>
        <div className="leftsection-form-control-label">
          <FormControlLabel
            control={
              <Checkbox
                name="ExperinceOnly"
                checked={checkboxState.ExperinceOnly}
                onChange={handleCheckboxChangeTWO}
              />
            }
            label="Experience"
          />
          <span className="leftsection-ps-5">8743</span>
        </div>
      </FormGroup>
      <hr />
    </div>
  );
};

export default Leftsection;

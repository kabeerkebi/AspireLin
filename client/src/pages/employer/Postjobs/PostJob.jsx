import React from "react";
import { Route, Routes } from "react-router-dom";
import CandidateRequirements from "./CandidateRequirements";
import InterviewerInformation from "./InterviewerInformation";
import Jobdetails from "./Jobdetails";
import JobPreview from "./JobPreview";
import Payment from "./Payment";
const PostJob = () => {
  return (
    <div>
      <Routes>
        <Route path="/jobdetails/:id" element={<Jobdetails />} />
        <Route
          path="/CandidateRequirements/:id"
          element={<CandidateRequirements />}
        />
        <Route
          path="/InterviewerInformation/:id"
          element={<InterviewerInformation />}
        />
        <Route path="/JobPreview/:id" element={<JobPreview />} />
        <Route path="/Payment/:id" element={<Payment />} />
      </Routes>
    </div>
  );
};

export default PostJob;

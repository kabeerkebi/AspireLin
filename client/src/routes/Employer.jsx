import React from "react";
import { Route, Routes } from "react-router-dom";
import SignNavbar from "../pages/employer/sign/SignNavbar";
import Employerslide from "../pages/employer/slidebar/Employerslide";
import PostJob from "../pages/employer/Postjobs/PostJob";
import Profile from "../pages/employer/Profile";
import Resume from "../pages/employer/Resume";
const Employer = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<SignNavbar />} />
        <Route path="/slidebar/:id" element={<Employerslide />} />
        <Route path="/postjob/*" element={<PostJob />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/resume/:id" element={<Resume />} />
      </Routes>
    </>
  );
};

export default Employer;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/admin/Login";
import AdminDash from "../pages/admin/AdminDash";
import EditJob from "../pages/admin/EditJob";

const Admin = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Login />} />
      <Route path="/admindashbord" element={<AdminDash />} />
      <Route path="/admineditjob/:id/:index/:arryindex" element={<EditJob />} />
    </Routes>
  );
};

export default Admin;

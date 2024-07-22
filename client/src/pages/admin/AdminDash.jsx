import React, { useState ,useEffect } from "react";
import { NavLink } from "react-router-dom";
import AllJobs from "../../components/admin/AllJobs";
import { useNavigate } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { AxiosClient } from "../../config/api";
import { createTokenHeader } from "../../utils/createHeader";
const AdminDash = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const Checkadmincokies = async () => {
      const headers = createTokenHeader(false);

      try {
        const result =   await AxiosClient.get("adminlogin/check-admin-token", headers);
        if (result.data?.unauthorized) {
          navigate("/");
        }
      } catch (error) {
        navigate("/")
      }
    };
    Checkadmincokies();
  }, []);

  const [AdminJobstrue, setAdminJobstrue] = useState(true);
  const [TohideTheSidebar, setTohideTheSidebar] = useState(false);
  const Handleclickthetable = () => {
    setAdminJobstrue(true);
  };
  const IfTrue = () => {
    setTohideTheSidebar(TohideTheSidebar ? false : true);
  };
  return (
    <div style={{ height: "100vh", display: "flex", overflow: "auto" }}>
      {!TohideTheSidebar && (
        <CDBSidebar textColor="#black" backgroundColor="#fff">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            Admin
            {/* if image is there  */}
            {/* <img
                src={image1}
                onClick={Toaddimage}
                className="img-fluid-slidebar"
                style={{ borderRadius: "15px" }}
              />
               */}
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="fa-solid fa-briefcase text-primary">
                  Jobs
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                onClick={Handleclickthetable}
                exact
                to=""
                activeClassName="activeClicked"
              >
                <CDBSidebarMenuItem icon="chart-line text-primary">
                  Report
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user text-primary">
                  Profile page
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="" activeClassName="activeClicked"></NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
          {/* 
        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter> */}
        </CDBSidebar>
      )}
      <div style={{ width: "100%", background: "#f5f2f2" }}>
        {AdminJobstrue && <AllJobs HideSidebar={IfTrue} />}
      </div>
    </div>
  );
};

export default AdminDash;

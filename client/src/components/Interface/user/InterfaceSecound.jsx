import React from "react";
import "./intersecound.css";
import { LuHome } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { BsBagCheck } from "react-icons/bs";
import Trending from "./Trending";
const InterfaceSecound = () => {
  return (
    <div className=" ">
      <div className="container-fluid inter2">
        <div className="container p-5">
          <div className="Popular-Categories mt-5">
            <h2 className="paragraph  text-3xl">Popular Categories</h2>
            <p className="mb-5">
              Explore Our Job Portal's to streamline your job search. From the
              cutting-edge world <br /> of Technology to the strategic realm of
              Finance,
            </p>
          </div>
          {/* the main card div  */}
          <div className="card-div row justify-content-center">
            {/* First row with  cards */}
            <div className="card col-md-2 p-2 m-2">
              <a href="#" className="atag">
                <div className="card-body">
                  <LuHome className="icon" />
                  <h6 className="card-title">Remote </h6>
                  <IoIosArrowForward className="icon" />
                </div>
              </a>
            </div>
            <div className="card col-md-2 p-2 m-2">
              <a href="#" className="atag">
                <div className="card-body">
                  <GoPeople className="icon" />
                  <h6 className="card-title"> HR</h6>
                  <IoIosArrowForward className="icon" />
                </div>
              </a>
            </div>
            <div className="card col-md-2 p-2 m-2">
              <a href="#" className="atag">
                <div className="card-body">
                  <LuHome className="icon" />
                  <h6 className="card-title"> Internship</h6>
                  <IoIosArrowForward className="icon" />
                </div>
              </a>
            </div>
            <div className="card col-md-2 p-2 m-2">
              <a href="#" className="atag">
                <div className="card-body">
                  <LuHome className="icon" />
                  <h6 className="card-title"> Startup</h6>
                  <IoIosArrowForward className="icon" />
                </div>
              </a>
            </div>
            <div className="card col-md-2 p-2 m-2">
              <a href="#" className="atag">
                <div className="card-body">
                  <PiGraduationCapDuotone className="icon" />
                  <h6 className="card-title"> Fresher</h6>
                  <IoIosArrowForward className="icon" />
                </div>
              </a>
            </div>
            <div className="card col-md-2 p-2 m-2">
              <a href="#" className="atag">
                <div className="card-body">
                  <BsBagCheck className="icon" />
                  <h6 className="card-title">Sales </h6>
                  <IoIosArrowForward className="icon" />
                </div>
              </a>
            </div>

            {/* Second row with  cards */}
            <div className="card col-md-2 p-2 m-2">
              <a href="#" className="atag">
                <div className="card-body">
                  <CiSettings className="icon" />
                  <h6 className="card-title"> Engineering</h6>
                  <IoIosArrowForward className="icon" />
                </div>
              </a>
            </div>
            <div className="card col-md-2 p-2 m-2">
              <a href="#" className="atag">
                <div className="card-body">
                  <LuHome className="icon" />
                  <h6 className="card-title"> MNC</h6>
                  <IoIosArrowForward className="icon" />
                </div>
              </a>
            </div>
            <div className="card col-md-2 p-2 m-2">
              <a href="#" className="atag">
                <div className="card-body">
                  <LuHome className="icon" />
                  <h6 className="card-title"> Analytics</h6>
                  <IoIosArrowForward className="icon" />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="Popular-Categories">
          <h1 className="paragraph text-3xl">Trending Jobs</h1>
        </div>
        <div className=" mt-5  ms-xl-2 container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className=" p-5 row"
          >
            <Trending />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceSecound;

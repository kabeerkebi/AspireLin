"use client";

import React from "react";
import { Box } from "@mui/material";
import { Footer as FlowbiteFooter } from "flowbite-react";
import "./Footer.css";
import Logo from "../assets/user/theuserlogo.png";

const Footer = () => {
  return (
    <Box className="footer" sx={{ color: "white" }}>
      <Box textAlign="center">
        <FlowbiteFooter container>
          <div className="w-full text-center">
            <div className="w-full justify-between sm:flex sm:items-center sm:justify-between  mt-[-60px]  mb-[-30px]     ">
              <FlowbiteFooter.Brand
                href=""
                src={Logo}
                alt="Flowbite Logo"
                name="Flowbite"
                style={{ width: "190px", height: "190px" }} // Set your desired width and height here
              />
              <FlowbiteFooter.LinkGroup>
                <FlowbiteFooter.Link href="#">About</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#">
                  Privacy Policy
                </FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#">Licensing</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="#">Contact</FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
            <FlowbiteFooter.Divider />
            <FlowbiteFooter.Copyright href="#" by="Flowbite™" year={2025} />
          </div>
        </FlowbiteFooter>
      </Box>
    </Box>
  );
};

export default Footer;

import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Common/Navbar";

const Layouts = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Layouts;

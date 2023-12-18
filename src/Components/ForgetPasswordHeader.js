import React from "react";
import "./Css/ForgetPasswordHeader.css";
import logo from "../images/swiggy.svg";

function ForgetPasswordHeader() {
  return (
    <div className="container-fluid">
      <div className="row forgetpassheaderDiv">
        <img alt="Logo col-6 ms-5" className="logo2  mt-2" src={logo} />
        <h4 className="col-6 mt-3 forgetswiggy">Swiggy</h4>
      </div>
    </div>
  );
}

export default ForgetPasswordHeader;

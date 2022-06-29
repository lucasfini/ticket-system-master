import React, { Component } from "react";
import { CDBModalFooter, CDBBtn, CDBCloseIcon, CDBBox } from "cdbreact";
import logo from "../assets/logo.png";

export default class Footer extends Component {
  render() {
    return (
      <div>
       

        <div className="container-flush footer">
          <div className="row d-flex align-items-center pb-3  ">
            <div className="col-sm-12 col-md-4 d-flex justify-content-end ">
              <a
                href="https://msumcmaster.ca/"
                className=" p-0 text-dark"
              >
                <img alt="logo" src={logo} width="100px" />
                <span
                  className=" h5 font-weight-bold"
                  href="https://msumcmaster.ca/"
                >
                  Mcmaster Student Union
                </span>
              </a>
            </div>
            <div className="col-md-5 col-sm-12 d-flex justify-content-start">
            <small className="ml-2">
                &copy; MSU IT, 2022. All rights reserved.
              </small>
              <small className="ml-2">
                Any Bugs or Suggestions, Please email jrtech@msu.mcmaster.ca
              </small>
            </div>
            <div className="col-md-3 col-sm-1 d-flex justify-content-center">
              <CDBBox display="flex">
            <CDBBtn
                flat
                href="https://www.facebook.com/MSUMcMaster/"
                color="dark"
                className="p-2"
              >
                <p className="fa fa-facebook" />
              </CDBBtn>
              <CDBBtn
                href="https://twitter.com/msu_mcmaster/"
                flat
                color="dark"
                className="mx-3 p-2"
              >
                <p className="fa fa-twitter" />
              </CDBBtn>
              <CDBBtn
                href="https://www.instagram.com/msu_mcmaster/"
                flat
                color="dark"
                className="p-2"
              >
                <p className="fa fa-instagram" aria-hidden="true" />
              </CDBBtn>
              </CDBBox>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

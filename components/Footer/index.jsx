import { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const router = useRouter();
  return (
    <Fragment>
      <div className="footer-global shadow bg-success mt-5 footer  ">
        <div className="container-xxl container-xl container-lg container-md-fluid container-sm-fluid border border-success ">
          <a className="d-flex justify-content-start mt-4" onClick={() => router.push("/")}>
            <Image src={"/assets/logo.svg"} width="180px" height="60px" className="App-logo" alt="" />
          </a>
          <div className="col-12 mt-3 mb-4">
            <h4 className="text-light">Find Job , Find Talent</h4>
          </div>
          <hr className="bg-light border-light" />
          <div className="col-12 d-flex justify-content-start">
            <div className="col-lg-9 col-md-8 col-sm-8 text-start ">
              <h6 className="text-light">2022 &copy;JobSeek. All right reserved</h6>
            </div>

            <div className="col-lg-3 col-md-4 col-sm-4  text-light d-flex mb-3 align-items-center ">
              <div className="col-6 d-flex align-items-center">
                <FontAwesomeIcon icon={faPhone} className="my-auto" />
                <h6 className="col-11 my-auto ps-2">Telepon</h6>
              </div>
              <div className="col-6 d-flex align-items-center">
                <FontAwesomeIcon icon={faEnvelope} className="my-auto" />
                <h6 className="col-11 my-auto ps-2"> Email</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;

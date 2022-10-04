// import Head from "next/head";
import { Fragment } from "react";
import Image from "next/image";
// import ImageFooter from "../../assets/images/peworld.png";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (

    <Fragment>
      <div className="footer-global shadow bg-success mt-5">
        <footer className="container border border-success">
          <a
            className="d-flex justify-content-start mt-4"
            onClick={() => router.push("/")}
          >
            <Image
              src={"/assets/logo.svg"}
              width="180px"
              height="60px"
              className="App-logo"
              alt=""
            />
          </a>

          <div className="col-12 mt-3 mb-4">
            <h4 className="text-light">Find Job , Find Talent</h4>
          </div>
          <hr className="bg-light border-light" />
          <div className="col-12 d-flex justify-content-start">
            <div className="col-9 text-start ">
              <h6 className="text-light">
                2022 &copy;JobSeek. All right reserved
              </h6>
            </div>

            <div className="col-3  d-flex mb-3">
              <div className="col-6 text-end">
                <h6 className="text-light">Telepon</h6>
              </div>
              <div className="col-6 text-end">
                <h6 className="text-light"> Email</h6>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default Footer;

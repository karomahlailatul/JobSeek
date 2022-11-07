import { Fragment } from "react";

import { useRouter } from "next/router";

import Image from "next/image";
import useWindowSize from "../components/WindowsSize";

const Costum404 = () => {
  const router = useRouter();

  const size = useWindowSize();
  return (
    <Fragment>
        <div className="container-xl container-lg container-md-fluid container-sm-fluid "  >
          <div className="col-12 d-flex justify-content-center text-center align-items-center " style={{ minHeight: `${size.height - 381}px` }}>
           <div className="col-12" >
           <a className="d-flex justify-content-center mb-3" onClick={() => router.push("/")}>
              <Image src={"/assets/logo_colour.svg"} width="180px" height="60px" className="App-logo" alt="" />
            </a>
            <div className="d-flex justify-content-center">
              <p className="fs-1 fw-bold text-success">404|</p>
              <p className="fs-1 fw-bold text-success">Page Not Found</p>
            </div>
            </div>
          </div>
        
      </div>
    </Fragment>
  );
};

export default Costum404;

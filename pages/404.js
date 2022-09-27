import { Fragment } from "react"

import { useRouter } from "next/router";

import Image from "next/image";
  
  const Costum404 = () => {
    
  const router = useRouter();

    return (
        <Fragment>
        <div className="page-not-found" >
          <div className="container">
            <div className="col-12 justify-content-center">
            <a
            className="d-flex justify-content-center mb-3"
            onClick={() => router.push('/')}
          >
            <Image
              src={"/assets/logo_colour.svg"}
              width="180px"
              height="60px"
              className="App-logo"
              alt=""
            />
          </a>
              <div className="d-flex align-items-center">
                <p className="fs-1 fw-bold text-success">404|</p>
                <p className="fs-1 fw-bold text-success">Page Not Found</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
  
  export default Costum404
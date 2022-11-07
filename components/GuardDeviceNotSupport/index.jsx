import { Fragment } from "react";
import useWindowSize from "../WindowsSize";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const GuardDeviceNotSupport = ({ children }) => {
  const size = useWindowSize();
  if (size.width < 576) {
    return (
      <Fragment>
        <div className="py-3 px-3 vh-100" style={{ display : (size.width < 350 ? "none" :"block") }}>
        <div className=" border border-3 border-success rounded d-flex aligns-items-center justify-content-center h-100">
          <div className="my-auto mx-auto text-center text-success">
            <FontAwesomeIcon icon={faExclamationCircle}  style={{ fontSize:"200px" }} />
            <p className="my-auto text-success mt-3" style={{ fontSize:"32px" }}>Device Not Support</p>
          </div>
        </div></div>
      </Fragment>
    );
  } else {
    return <>{children}</>;
  }
};

export default GuardDeviceNotSupport;

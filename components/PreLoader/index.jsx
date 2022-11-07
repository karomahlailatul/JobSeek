import { Fragment } from "react";

const PreLoader = ({ isLoading }) => {
  return (
    <Fragment>
      {isLoading ? (
        // <Fragment>
        //   <div className="preloader text-center">
        //     <div className="loading">
        //       <div className="spinner-border text-success mx-auto" style={{width: "3rem", height: "3rem"}} role="status"></div>
        //       <p className="mt-5">Please wait...</p>
        //     </div>
        //   </div>
        // </Fragment>
        // <Fragment>
        //   <div className="preloader text-center">
        //     <div className="loading">
        //       <div className="spinner-border text-success mx-auto" style={{ width: "4rem", height: "4rem" }} role="status"></div>
        //       <p className="text-success">Please wait...</p> 
        //     </div>
        //   </div>
        // </Fragment>
        <Fragment>
        <div className="preloader text-center my-auto">
          <div className="loading">
            <div className="spinner-border text-success mx-auto" style={{ width: "4rem", height: "4rem" }} role="status"></div>
            {/* <span className="loader"></span> */}
             <p className="text-success">Please wait...</p> 
          </div>
        </div>
      </Fragment>
      ) : null}
    </Fragment>
  );
};

export default PreLoader;

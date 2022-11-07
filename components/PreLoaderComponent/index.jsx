import { Fragment } from "react";

const PreLoaderComponent = ({ isLoading }) => {
  return (
    <Fragment>
      {isLoading ? (
      <Fragment>
        <div className="preloader-component text-center my-auto">
          <div className="loading-component">
            <div className="spinner-border text-success mx-auto" style={{ width: "4rem", height: "4rem" ,fontSize:"22px" }} role="status"></div>
             <p className="text-success mt-1">Please wait...</p> 
          </div>
        </div>
      </Fragment>
      ) : null}
    </Fragment>
  );
};

export default PreLoaderComponent;

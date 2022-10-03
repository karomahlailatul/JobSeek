import { Fragment } from "react";

const PreLoader = ({ isLoading }) => {
  return (
    <Fragment>
      {isLoading ? (
        <Fragment>
          <div className="preloader">
            <div className="loading">
              <div className="spinner-border" role="status"></div>
            </div>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default PreLoader;

import { Fragment } from "react";

const UsersTabJobApplyMyJobApply = () => {
  return (
    <Fragment>
      <div className="tab-pane fade" id="v-pills-my-job-apply" role="tabpanel" aria-labelledby="v-pills-my-job-apply-tab" data-toggle="button">
        <div className="container-fluid container-nav-pills">
          <div className="col-12 justify-content-start">
            <h4 className="modal-title fw-bold " id="modalProfileLabel">
              My Job Apply
            </h4>
          </div>
          <div className="nav d-flex-column nav-pills justify-content-start mt-2" id="v-pills-tab" role="tablist" aria-orientation="horizontal">
            <a className="nav-link active" id="v-pills-all-job-apply-tab" data-bs-toggle="pill" data-bs-target="#v-pills-all-job-apply" type="button" role="tab" aria-controls="v-pills-all-job-apply" aria-selected="true">
              All Job Apply
            </a>
            <a className="nav-link" id="v-pills-approved-job-apply-tab" data-bs-toggle="pill" data-bs-target="#v-pills-approved-job-apply" type="button" role="tab" aria-controls="v-pills-approved-job-apply" aria-selected="true">
              Approved Job Apply
            </a>
            <a className="nav-link" id="v-pills-rejected-job-apply-tab" data-bs-toggle="pill" data-bs-target="#v-pills-rejected-job-apply" type="button" role="tab" aria-controls="v-pills-rejected-job-apply" aria-selected="true">
              Rejected Job Apply
            </a>
          </div>
          <hr />

          <div className="tab-content" id="v-pills-tabContent">
            <div className="tab-pane active" id="v-pills-all-job-apply" role="tabpanel" aria-labelledby="v-pills-all-job-apply-tab" data-toggle="button">
              <div className="vh-100">
                <div className="col-4 my-3">
                  <form className="form-search d-flex border border-1  ">
                    <input className="form-control  border-0 " type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn-search" type="submit"></button>
                  </form>
                  <p>all job apply</p>
                </div>
              </div>
            </div>

            <div className="tab-pane" id="v-pills-approved-job-apply" role="tabpanel" aria-labelledby="v-pills-approved-job-apply-tab" data-toggle="button">
              <div className="vh-100">
                <div className="col-4 my-3">
                  <form className="form-search d-flex border border-1  ">
                    <input className="form-control  border-0 " type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn-search" type="submit"></button>
                  </form>
                  <p>Approved Job</p>
                </div>
              </div>
            </div>

            <div className="tab-pane" id="v-pills-rejected-job-apply" role="tabpanel" aria-labelledby="v-pills-rejected-job-apply-tab" data-toggle="button">
              <div className="vh-100">
                <div className="col-4 my-3">
                  <form className="form-search d-flex border border-1  ">
                    <input className="form-control  border-0 " type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn-search" type="submit"></button>
                  </form>
                  <p> Rejected Job</p>
                </div>
              </div>
            </div>
          </div>
          <p>tab myProfile</p>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersTabJobApplyMyJobApply;

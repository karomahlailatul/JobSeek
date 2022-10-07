import { useEffect, useState, Fragment } from "react";

import Image from "next/image";
import RecruiterTabProfileRecruiterProfile from "../../../components/RecruiterTabProfileRecruiterProfile";

import RecruiterTabJobMyJob from "../../../components/RecruiterTabJobMyJob";
import RecruiterTabJobCreateJob from "../../../components/RecruiterTabJobCreateJob";

import RecruiterTabJobApplyStatusJob from "../../../components/RecruiterTabJobApplyStatusJob";

import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import { getRecruiterProfile } from "../../../app/redux/Slice/RecruiterProfileSlice";

import PreLoader from "../../../components/PreLoader";

const recruiter = () => {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");

  const [statusEdit, setStatusEdit] = useState(false);

  const dispatch = useDispatch();

  const dispatchGetRecruiterProfile = async () => {
    await dispatch(getRecruiterProfile()).unwrap();
  };

  const { RecruiterProfile, isLoading } = useSelector((state) => state.RecruiterProfile);


  useEffect(() => {
    dispatchGetRecruiterProfile();
    setToken(Cookies.get("token"));
    setRefreshToken(Cookies.get("refreshToken"));
    setRole(Cookies.get("role"));
    setId(Cookies.get("id"));
  }, [dispatch, token, refreshToken, role, id]);

  return (
    <Fragment>
      <PreLoader isLoading={isLoading} />
      <div className="container container-profile-recruiter">
        <div className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 my-xl-5 my-lg-5 mt-md-5 mt-sm-5">
            <div className="col-12 d-flex mx-auto">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex justify-content-center logo-profile-middle">
                <Image className="pictureThumbnails" referrerPolicy="no-referrer" width={60} height={60} layout="fixed" src={RecruiterProfile.logo === null || RecruiterProfile.logo === undefined ? "/assets/icons/ico-user.svg" : RecruiterProfile.logo} alt="" />
              </div>
              <div className="col-xl-8 col-lg-8 col-md-6 col-sm-6 my-auto">
                <p className="my-auto fw-bold mb-1">{RecruiterProfile.company}</p>

                <div className="my-auto" onClick={() => setStatusEdit(true)}>
                  <input type="checkbox" className="btn-check" id="btn-check-2-outlined" autoComplete="off" />
                  <label className="" htmlFor="btn-check-2-outlined">
                    <Image referrerPolicy="no-referrer" width={15} height={15} layout="fixed" src={"/assets/icons/edit.svg"} alt="" />
                    <small className="ms-2">Change profile</small>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12 my-xl-5 my-lg-5 mt-md-5 mt-sm-5">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <ul className="list-unstyled ps-0">
                      <div className="nav nav-pills d-grid" id="v-pills-tab" role="tablist" aria-orientation="horizontal">
                        <li className="mb-1">
                          <div className="d-flex justify-content-between">
                            <button className="nav-link d-flex justify-content-start collapsed px-n5" data-bs-toggle="collapse" data-bs-target="#recruiter-collapse" aria-expanded="true">
                              <div className=" me-3 ico-profile d-flex justify-content-center py-0 my-0">
                                {/* <img className="w-50" src={SellerProfileIcon} alt="" /> */}
                                {/* <Image
                                  referrerPolicy="no-referrer"
                                  width={18}
                                  height={18}
                                  layout="fixed"
                                  src={"/assets/icons/house-door.svg"}
                                  alt=""
                                  className=""
                                /> */}
                              </div>
                              <span className="label-sidebar my-auto">Recruiter</span>
                            </button>
                            <button className=" btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#recruiter-collapse" aria-expanded="true"></button>
                          </div>

                          <div className="collapse show" id="recruiter-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                              <li>
                                <button href="#" className="nav-link rounded ms-5 active" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="true">
                                  Recruiter Profile
                                </button>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="mb-1">
                          <div className="d-flex justify-content-between">
                            <button className="nav-link  d-flex justify-content-start collapsed px-n5" data-bs-toggle="collapse" data-bs-target="#job-collapse" aria-expanded="false">
                              <div className=" me-3 ico-product d-flex justify-content-center">{/* <img className="w-50" src={SellerProductIcon} alt="" /> */}</div>
                              <label className="label-sidebar my-auto">Job</label>
                            </button>
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#job-collapse" aria-expanded="false"></button>
                          </div>

                          <div className="collapse" id="job-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                              <li>
                                <button href="#" className="nav-link rounded ms-5" id="v-pills-my-job-tab" data-bs-toggle="pill" data-bs-target="#v-pills-my-job" type="button" role="tab" aria-controls="v-pills-my-job" aria-selected="true">
                                  My Job List
                                </button>
                                <button
                                  href="#"
                                  className="nav-link rounded ms-5"
                                  id="v-pills-create-job-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#v-pills-create-job"
                                  type="button"
                                  role="tab"
                                  aria-controls="v-pills-create-job"
                                  aria-selected="true"
                                >
                                  Create a Job
                                </button>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="mb-1">
                          <div className="d-flex justify-content-between">
                            <button className="nav-link  d-flex justify-content-start collapsed px-n5" data-bs-toggle="collapse" data-bs-target="#order-collapse" aria-expanded="false">
                              <div className=" me-3 ico-order d-flex justify-content-center">{/* <img className="w-50" src={SellerOrderIcon} alt="" /> */}</div>
                              <span className="label-sidebar my-auto">Job Apply</span>
                            </button>
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#order-collapse" aria-expanded="false"></button>
                          </div>

                          <div className="collapse" id="order-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                              <li>
                                <button href="#" className="nav-link rounded ms-5" id="v-pills-job-apply-status-job-tab" data-bs-toggle="pill" data-bs-target="#v-pills-job-apply-status-job" type="button" role="tab" aria-controls="v-pills-order" aria-selected="true">
                                  Status Job Apply
                                </button>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 bg-light">
            <div className="container">
              <div className="col-12 w-auto bg-white mx-3 my-5 py-3 px-3">
                <div className="tab-content" id="v-pills-tabContent">
                  <RecruiterTabProfileRecruiterProfile
                  
                  RecruiterProfile={RecruiterProfile}
                    statusEdit={statusEdit}
                    setStatusEdit={setStatusEdit}
                    dispatchGetRecruiterProfile={dispatchGetRecruiterProfile}
                    token={token}
                    refreshToken={refreshToken}
                    role={role}
                    id={id}
                    isLoading={isLoading}
                  />

                  <RecruiterTabJobMyJob  />
                  <RecruiterTabJobCreateJob id={id}/>

                  <RecruiterTabJobApplyStatusJob />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default recruiter;

import { useState, Fragment, useEffect } from "react";
import Image from "next/image";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import RecruiterTabProfileRecruiterProfile from "../../../components/RecruiterTabProfileRecruiterProfile";

import RecruiterTabJobMyJob from "../../../components/RecruiterTabJobMyJob";
import RecruiterTabJobCreateJob from "../../../components/RecruiterTabJobCreateJob";
// import RecruiterTabJobEditJob from "../../../components/RecruiterTabJobEditJob";

import RecruiterTabJobApplyStatusJob from "../../../components/RecruiterTabJobApplyStatusJob";

import PreLoader from "../../../components/PreLoader";

import { getRecruiterProfile } from "../../../app/redux/Slice/RecruiterProfileSlice";
import { getSkill } from "../../../app/redux/Slice/SkillSlice";

import { wrapper } from "../../../app/redux/store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
// import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
// import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
// import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faHouseLaptop } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";
import useWindowSize from "../../../components/WindowsSize";
import { getJobApplyByRecruiter } from "../../../app/redux/Slice/JobApplyGetByRecruiterSlice";

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const id = ctx?.req?.cookies?.id || null;
  const token = ctx?.req?.cookies?.token || null;
  const refreshToken = ctx?.req?.cookies?.refreshToken || null;
  const role = ctx?.req?.cookies?.role || null;
  const lockCredential = ctx?.req?.cookies?.lockCredential || null;

  if (id && token && refreshToken && role && lockCredential) {
    // if ( role != "recruiter") {
    //   return {
    //     redirect: {
    //       destination: "/sign-in",
    //       permanent: false,
    //     },
    //   };
    // }
    await store.dispatch(getRecruiterProfile({ token, refreshToken, id }));
    await store.dispatch(getSkill());
    await store.dispatch(getJobApplyByRecruiter(id));
  } else {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const Skill = await store.getState().Skill.Skill || []
  const JobApplyByRecruiter = await store.getState().JobApplyGetByRecruiter.JobApplyByRecruiter || []

  return {
    props: {
      token: token,
      refreshToken: refreshToken,
      role: role,
      id: id,
      lockCredential: lockCredential,
      Skill: Skill,
      JobApplyByRecruiter: JobApplyByRecruiter,
    },
  };
});

const UsersProfile = ({ id, token, refreshToken, role, Skill, JobApplyByRecruiter }) => {
  const size = useWindowSize();
  const [statusEdit, setStatusEdit] = useState(false);
  const router = useRouter();
  const { RecruiterProfile } = useSelector((state) => state.RecruiterProfile);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (role != "recruiter") {
      router.push("/");
      toast.warning("You're Cannot Access This Feature", { toastId: "warningRole" });
      // setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [role]);

  const [tab0, setTab0] = useState(true);
  const [tab1, setTab1] = useState(false);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);
  // const [tab4, setTab4] = useState(false);

  // console.log(JobApplyByRecruiter);
  return (
    <Fragment>
      {isLoading ? (
        <PreLoader isLoading={true} />
      ) : (
        <Fragment>
          <div className="container-xl container-lg container-md-fluid container-sm-fluid  container-profile-recruiter">
            <div className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 my-xl-5 my-lg-5 mt-md-5 mt-sm-5">
                <div className="col-12 d-flex mx-auto">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex justify-content-center logo-profile-middle">
                    {RecruiterProfile.logo ? (
                      <Image src={RecruiterProfile.logo} width="60px" height="60px" className="col-3 rounded-img" alt="" objectFit="cover" />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "grey" }}>
                        <FontAwesomeIcon icon={faStore} style={{ color: "white", fontSize: "25px" }} />
                      </div>
                    )}
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-6 col-sm-6 my-auto">
                    <p className="my-auto fw-bold mb-1 text-truncate">{RecruiterProfile.company}</p>

                    <div
                      className="my-auto"
                      onClick={() => {
                        setStatusEdit(true);
                        // dispatchGetUsersProfile()
                      }}
                    >
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
                      <ul className="list-unstyled ps-0 ">
                        <div className="nav nav-pills d-grid" id="v-pills-tab" role="tablist" aria-orientation="horizontal">
                          <li className="mb-1">
                            <div className="d-flex justify-content-between ">
                              <button className="nav-link d-flex justify-content-start collapsed  " data-bs-toggle="collapse" data-bs-target="#recruiter-collapse" aria-expanded="true">
                                <div className="col-1 d-flex justify-content-center" style={{ borderRadius: "50%", height: "32px", width: "32px", backgroundColor: "var(--bs-success)", textAlign: "center" }}>
                                  <FontAwesomeIcon className="my-auto" icon={faStore} style={{ color: "white", fontSize: "13px" }} />
                                </div>

                                <span className="label-sidebar ps-3 my-auto">Recruiter</span>
                              </button>
                              <button className=" btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#recruiter-collapse" aria-expanded="true"></button>
                            </div>

                            <div className="collapse show" id="recruiter-collapse">
                              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                  <button
                                    //  href="#"
                                    className="nav-link btn-tab-link rounded ms-5 "
                                    id="v-pills-profile-tab"
                                    style={{ color: `${tab0 ? `var(--bs-success)` : `rgba(0, 0, 0, 0.5)`}` }}
                                    // data-bs-toggle="pill"
                                    // data-bs-target="#v-pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-profile"
                                    aria-selected="true"
                                    onClick={() => {
                                      setTab0(true);
                                      setTab1(false);
                                      setTab2(false);
                                      setTab3(false);
                                    }}
                                  >
                                    My Profile Recruiter
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="mb-1">
                            <div className="d-flex justify-content-between">
                              <button className="nav-link  d-flex justify-content-start collapsed " data-bs-toggle="collapse" data-bs-target="#job-collapse" aria-expanded="false">
                                <div className="col-1 d-flex justify-content-center" style={{ borderRadius: "50%", height: "32px", width: "32px", backgroundColor: "var(--bs-success)", textAlign: "center" }}>
                                  <FontAwesomeIcon className="my-auto" icon={faHouseLaptop} style={{ color: "white", fontSize: "13px" }} />
                                </div>
                                <span className="label-sidebar my-auto ps-3">Job</span>
                              </button>
                              <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#job-collapse" aria-expanded="false"></button>
                            </div>

                            <div className="collapse" id="job-collapse">
                              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                  <button
                                    href="#"
                                    className="nav-link btn-tab-link rounded ms-5"
                                    style={{ color: `${tab1 ? `var(--bs-success)` : `rgba(0, 0, 0, 0.5)`}` }}
                                    id="v-pills-my-job-tab"
                                    // data-bs-toggle="pill"
                                    // data-bs-target="#v-pills-my-job"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-my-job"
                                    aria-selected="true"
                                    onClick={() => {
                                      setTab0(false);
                                      setTab1(true);
                                      setTab2(false);
                                      setTab3(false);
                                    }}
                                  >
                                    My Job List
                                  </button>
                                  <button
                                    href="#"
                                    className="nav-link btn-tab-link rounded ms-5"
                                    style={{ color: `${tab2 ? `var(--bs-success)` : `rgba(0, 0, 0, 0.5)`}` }}
                                    id="v-pills-create-job-tab"
                                    // data-bs-toggle="pill"
                                    // data-bs-target="#v-pills-create-job"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-create-job"
                                    aria-selected="true"
                                    onClick={() => {
                                      setTab0(false);
                                      setTab1(false);
                                      setTab2(true);
                                      setTab3(false);
                                    }}
                                  >
                                    Create a Job
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </li>

                          <li className="mb-1">
                            <div className="d-flex justify-content-between">
                              <button className="nav-link  d-flex justify-content-start collapsed " data-bs-toggle="collapse" data-bs-target="#job-apply-collapse" aria-expanded="false">
                                <div className="col-1 d-flex justify-content-center" style={{ borderRadius: "50%", height: "32px", width: "32px", backgroundColor: "var(--bs-success)", textAlign: "center" }}>
                                  <FontAwesomeIcon className="my-auto" icon={faBriefcase} style={{ color: "white", fontSize: "13px" }} />
                                </div>
                                <span className="ps-3 label-sidebar my-auto">Job Apply</span>
                              </button>
                              <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#job-apply-collapse" aria-expanded="false"></button>
                            </div>

                            <div className="collapse" id="job-apply-collapse">
                              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li>
                                  <button
                                    href="#"
                                    style={{ color: `${tab3 ? `var(--bs-success)` : `rgba(0, 0, 0, 0.5)`}` }}
                                    className="nav-link btn-tab-link rounded ms-5"
                                    id="v-pills-job-apply-status-job-tab"
                                    // data-bs-toggle="pill"
                                    // data-bs-target="#v-pills-job-apply-status-job"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-order"
                                    aria-selected="true"
                                    onClick={() => {
                                      setTab0(false);
                                      setTab1(false);
                                      setTab2(false);
                                      setTab3(true);
                                    }}
                                  >
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

              <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 bg-light rounded">
                <div className="px-xl-3 py-xl-3 px-lg-3 py-lg-3 px-md-3 py-md-3 px-sm-3 py-sm-3 rounded">
                  <div className="col-12 w-auto bg-white py-xl-3 px-lg-3 py-lg-3 px-md-0 py-md-3 px-sm-0 py-sm-3 rounded">
                    <div className="tab-content" id="v-pills-tabContent" style={{ minHeight: `${size.height - 445}px` }}>
                      <div style={{ display: tab0 ? "block" : "none" }}>
                        <RecruiterTabProfileRecruiterProfile statusEdit={statusEdit} setStatusEdit={setStatusEdit} token={token} refreshToken={refreshToken} role={role} id={id} isLoading={isLoading} />
                      </div>
                      <div style={{ display: tab1 ? "block" : "none" }}>
                        <RecruiterTabJobMyJob token={token} refreshToken={refreshToken} role={role} id={id} Skill={Skill} />
                      </div>
                      <div style={{ display: tab2 ? "block" : "none" }}>
                        <RecruiterTabJobCreateJob token={token} refreshToken={refreshToken} role={role} id={id} Skill={Skill} />
                      </div>
                      <div style={{ display: tab3 ? "block" : "none" }}>
                        <RecruiterTabJobApplyStatusJob token={token} refreshToken={refreshToken} role={role} id={id} JobApplyByRecruiter={JobApplyByRecruiter}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UsersProfile;

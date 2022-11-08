import { useState, Fragment } from "react";
import Image from "next/image";

import {
  // useDispatch,
  useSelector,
} from "react-redux";

// import { useRouter } from "next/router";

import UsersTabProfileMyProfile from "../../../components/UsersTabProfileMyProfile";

import UsersTabPortfolioCreatePortfolio from "../../../components/UsersTabPortfolioCreatePortfolio";
// import UsersTabPortfolioEditPortfolio from "../../../components/UsersTabPortfolioEditPortfolio";
import UsersTabPortfolioMyPortfolio from "../../../components/UsersTabPortfolioMyPortfolio";

// import UsersTabSkillCreateSkill from "../../../components/UsersTabSkillCreateSkill";
// import UsersTabSkillEditSkill from "../../../components/UsersTabSkillEditSkill";
import UsersTabSkillMySkill from "../../../components/UsersTabSkillMySkill";

import UsersTabWorkExperienceCreateWorkExperience from "../../../components/UsersTabWorkExperienceCreateWorkExperience";
// import UsersTabWorkExperienceEditWorkExperience from "../../../components/UsersTabWorkExperienceEditWorkExperience";
import UsersTabWorkExperienceMyWorkExperience from "../../../components/UsersTabWorkExperienceMyWorkExperience";

import UsersTabJobApplyMyJobApply from "../../../components/UsersTabJobApplyMyJobApply";

// import PreLoader from "../../../components/PreLoader";

import { getUsersProfile } from "../../../app/redux/Slice/UsersProfileSlice";
import { wrapper } from "../../../app/redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-regular-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import useWindowSize from "../../../components/WindowsSize";
import { getJobApplyByUsers } from "../../../app/redux/Slice/JobApplyGetByUsersSlice";

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const id = ctx?.req?.cookies?.id || null;
  const token = ctx?.req?.cookies?.token || null;
  const refreshToken = ctx?.req?.cookies?.refreshToken || null;
  const role = ctx?.req?.cookies?.role || null;
  const lockCredential = ctx?.req?.cookies?.lockCredential || null;

  if (id && token && refreshToken && role && lockCredential) {
    await store.dispatch(getUsersProfile(token, refreshToken));
    await store.dispatch(getJobApplyByUsers(id));
  } else {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const JobApplyByUsers = await store.getState().JobApplyGetByUsers.JobApplyGetByUsers || []

  return {
    props: {
      token: token,
      refreshToken: refreshToken,
      role: role,
      id: id,
      lockCredential: lockCredential,
      JobApplyByUsers: JobApplyByUsers,
    },
  };
});

const UsersProfile = ({ id, token, refreshToken, role, JobApplyByUsers }) => {
  console.log(JobApplyByUsers)
  const size = useWindowSize();
  const [statusEdit, setStatusEdit] = useState(false);
  const { UsersProfile, isLoading } = useSelector((state) => state.UsersProfile);

  const [tab0, setTab0] = useState(true);
  const [tab1, setTab1] = useState(false);
  const [tab2, setTab2] = useState(false);
  const [tab3, setTab3] = useState(false);
  const [tab4, setTab4] = useState(false);
  const [tab5, setTab5] = useState(false);
  const [tab6, setTab6] = useState(false);
  // const [tab7, setTab7] = useState(false);

  return (
    <Fragment>
      <div className="container-xl container-lg container-md-fluid container-sm-fluid   container-profile-users">
        <div className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 my-xl-5 my-lg-5 mt-md-5 mt-sm-5">
            <div className="col-12 d-flex mx-auto">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex justify-content-center logo-profile-middle">
                <Image
                  className="pictureThumbnails border"
                  referrerPolicy="no-referrer"
                  width={60}
                  height={60}
                  layout="fixed"
                  objectFit="cover"
                  src={UsersProfile.picture === null || UsersProfile.picture === undefined ? "/assets/icons/ico-user.svg" : UsersProfile.picture}
                  alt=""
                />
              </div>
              <div className="col-xl-8 col-lg-8 col-md-6 col-sm-6 my-auto">
                <p className="my-auto fw-bold mb-1 text-truncate">{UsersProfile.name}</p>

                <div
                  className="my-auto"
                  onClick={() => {
                    setStatusEdit(true);
                    // dispatchGetUsersProfile()
                  }}
                >
                  <input type="checkbox" className="btn-check" id="btn-check-2-outlined" autoComplete="off" />
                  <span style={{ cursor: "pointer" }} htmlFor="btn-check-2-outlined">
                    <Image referrerPolicy="no-referrer" width={15} height={15} layout="fixed" src={"/assets/icons/edit.svg"} alt="" />
                    <small className="ms-2">Change profile</small>
                  </span>
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
                              <FontAwesomeIcon className="my-auto" icon={faUser} style={{ color: "white", fontSize: "13px" }} />
                            </div>

                            <span className="label-sidebar ps-3 my-auto">Users</span>
                          </button>
                          <button className=" btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#recruiter-collapse" aria-expanded="true"></button>
                        </div>

                        <div className="collapse show" id="recruiter-collapse">
                          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                              <button
                                // href="#"
                                className="nav-link rounded ms-5 active"
                                id="v-pills-profile-tab"
                                // data-bs-toggle="pill" data-bs-target="#v-pills-profile"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-profile"
                                aria-selected="true"
                                onClick={() => {
                                  setTab0(true);
                                  setTab1(false);
                                  setTab2(false);
                                  setTab3(false);
                                  setTab4(false);
                                  setTab5(false);
                                  setTab6(false);
                                }}
                              >
                                My Profile
                              </button>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="mb-1">
                        <div className="d-flex justify-content-between">
                          <button className="nav-link  d-flex justify-content-start collapsed " data-bs-toggle="collapse" data-bs-target="#portfolio-collapse" aria-expanded="false">
                            <div className="col-1 d-flex justify-content-center" style={{ borderRadius: "50%", height: "32px", width: "32px", backgroundColor: "var(--bs-success)", textAlign: "center" }}>
                              <FontAwesomeIcon className="my-auto" icon={faAddressBook} style={{ color: "white", fontSize: "13px" }} />
                            </div>
                            <span className="label-sidebar my-auto ps-3">Portfolio</span>
                          </button>
                          <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#portfolio-collapse" aria-expanded="false"></button>
                        </div>

                        <div className="collapse" id="portfolio-collapse">
                          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                              <button
                                // href="#"
                                className="nav-link rounded ms-5"
                                id="v-pills-my-portfolio-tab"
                                // data-bs-toggle="pill"
                                // data-bs-target="#v-pills-my-portfolio"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-my-portfolio"
                                aria-selected="true"
                                onClick={() => {
                                  setTab0(false);
                                  setTab1(true);
                                  setTab2(false);
                                  setTab3(false);
                                  setTab4(false);
                                  setTab5(false);
                                  setTab6(false);
                                }}
                              >
                                My Portfolio
                              </button>
                              <button
                                // href="#"
                                className="nav-link rounded ms-5"
                                id="v-pills-create-portfolio-tab"
                                // data-bs-toggle="pill"
                                // data-bs-target="#v-pills-create-portfolio"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-create-portfolio"
                                aria-selected="true"
                                onClick={() => {
                                  setTab0(false);
                                  setTab1(false);
                                  setTab2(true);
                                  setTab3(false);
                                  setTab4(false);
                                  setTab5(false);
                                  setTab6(false);
                                }}
                              >
                                Add a Portfolio
                              </button>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="mb-1">
                        <div className="d-flex justify-content-between">
                          <button className="col nav-link d-flex justify-content-start text-start align-items-center" data-bs-toggle="collapse" data-bs-target="#work-experience-collapse" aria-expanded="false">
                            <div className="col-1 d-flex justify-content-center" style={{ borderRadius: "50%", height: "32px", width: "32px", backgroundColor: "var(--bs-success)", textAlign: "center" }}>
                              <FontAwesomeIcon className="my-auto" icon={faPeopleGroup} style={{ color: "white", fontSize: "13px" }} />
                            </div>
                            <span className="d-flex label-sidebar ps-3">Work Experience</span>
                          </button>

                          <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#work-experience-collapse" aria-expanded="false"></button>
                        </div>

                        <div className="collapse" id="work-experience-collapse">
                          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small ">
                            <li>
                              <button
                                // href="#"
                                className="nav-link rounded ms-5 d-flex justify-content-start "
                                id="v-pills-my-work-experience-tab"
                                // data-bs-toggle="pill"
                                // data-bs-target="#v-pills-my-work-experience"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-my-work-experience"
                                aria-selected="true"
                                onClick={() => {
                                  setTab0(false);
                                  setTab1(false);
                                  setTab2(false);
                                  setTab3(true);
                                  setTab4(false);
                                  setTab5(false);
                                  setTab6(false);
                                }}
                              >
                                My Work Experience
                              </button>
                              <button
                                // href="#"
                                className="nav-link rounded ms-5 ps-3 pe-0"
                                id="v-pills-create-work-experience-tab"
                                // data-bs-toggle="pill"
                                // data-bs-target="#v-pills-create-work-experience"
                                type="button"
                                role="tab"
                                aria-controls="#v-pills-create-work-experience"
                                aria-selected="true"
                                onClick={() => {
                                  setTab0(false);
                                  setTab1(false);
                                  setTab2(false);
                                  setTab3(false);
                                  setTab4(true);
                                  setTab5(false);
                                  setTab6(false);
                                }}
                              >
                                Add Work Experience
                              </button>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="mb-1">
                        <div className="d-flex justify-content-between">
                          <button className="nav-link  d-flex justify-content-start collapsed " data-bs-toggle="collapse" data-bs-target="#skill-collapse" aria-expanded="false">
                            <div className="col-1 d-flex justify-content-center" style={{ borderRadius: "50%", height: "32px", width: "32px", backgroundColor: "var(--bs-success)", textAlign: "center" }}>
                              <FontAwesomeIcon className="my-auto" icon={faUserGear} style={{ color: "white", fontSize: "13px" }} />
                            </div>
                            <span className="label-sidebar ps-3 my-auto">Skill</span>
                          </button>
                          <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#skill-collapse" aria-expanded="false"></button>
                        </div>

                        <div className="collapse" id="skill-collapse">
                          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                              <button
                                // href="#"
                                className="nav-link rounded ms-5"
                                id="v-pills-my-skill-tab"
                                // data-bs-toggle="pill" data-bs-target="#v-pills-my-skill"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-my-skill"
                                aria-selected="true"
                                onClick={() => {
                                  setTab0(false);
                                  setTab1(false);
                                  setTab2(false);
                                  setTab3(false);
                                  setTab4(false);
                                  setTab5(true);
                                  setTab6(false);
                                }}
                              >
                                My Skill
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
                                // href="#"
                                className="nav-link rounded ms-5"
                                id="v-pills-my-job-apply-tab"
                                // data-bs-toggle="pill"
                                // data-bs-target="#v-pills-my-job-apply"
                                type="button"
                                role="tab"
                                aria-controls="v-pills-my-job-apply"
                                aria-selected="true"
                                // onClick={() => {
                                //   document.getElementById("v-pills-all-job-apply-tab").click();
                                // }}
                                onClick={() => {
                                  setTab0(false);
                                  setTab1(false);
                                  setTab2(false);
                                  setTab3(false);
                                  setTab4(false);
                                  setTab5(false);
                                  setTab6(true);
                                }}
                              >
                                My Job Apply
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

          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  bg-light">
            <div className="px-xl-3 py-xl-3 px-lg-3 py-lg-3 px-md-3 py-md-3 px-sm-3 py-sm-3">
              <div className="col-12 w-auto bg-white py-xl-3 px-lg-3 py-lg-3 px-md-0 py-md-3 px-sm-0 py-sm-3">
                {/* <div className="container-xl container-lg container-md-fluid container-sm-fluid ">
              <div className="col-12 w-auto bg-white mx-3 my-5 py-3 px-3"> */}
                <div className="tab-content" id="v-pills-tabContent" style={{ minHeight: `${size.height - 509}px` }}>
                  <div style={{ display: tab0 ? "block" : "none" }}>
                    <UsersTabProfileMyProfile UsersProfile={UsersProfile} statusEdit={statusEdit} setStatusEdit={setStatusEdit} token={token} refreshToken={refreshToken} role={role} id={id} isLoading={isLoading} />
                  </div>
                  <div style={{ display: tab1 ? "block" : "none" }}>
                    <UsersTabPortfolioMyPortfolio />{" "}
                  </div>
                  <div style={{ display: tab2 ? "block" : "none" }}>
                    <UsersTabPortfolioCreatePortfolio />
                  </div>
                  <div style={{ display: tab3 ? "block" : "none" }}>
                    <UsersTabWorkExperienceMyWorkExperience />{" "}
                  </div>
                  <div style={{ display: tab4 ? "block" : "none" }}>
                    <UsersTabWorkExperienceCreateWorkExperience />{" "}
                  </div>
                  <div style={{ display: tab5 ? "block" : "none" }}>
                    <UsersTabSkillMySkill />{" "}
                  </div>
                  <div style={{ display: tab6 ? "block" : "none" }}>
                    <UsersTabJobApplyMyJobApply />{" "}
                  </div>
                  {/* {tab0 ? : null}
                  {tab1 ? : null}
                  {tab2 ?  : null}
                  {tab3 ? : null}
                  {tab4 ? : null}
                  {tab5 ? : null}
                  {tab6 ? : null} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UsersProfile;

import { useState, Fragment, useEffect } from "react";

import Image from "next/image";

import { connect } from "react-redux";

import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import { getProfileUser } from "../../../app/redux/Slice/ProfileUserSlice";

// import { useRouter } from "next/router";

import UsersTabProfile from "../../../components/UsersTabProfile";
import UsersTabSkill from "../../../components/UsersTabSkill";
import UsersTabWorkExperience from "../../../components/UsersTabWorkExperience";
import UsersTabPortfolio from "../../../components/UsersTabPortfolio";
import UsersTabHireJob from "../../../components/UsersTabHireJob";

import PreLoader from "../../../components/PreLoader";

const ProfileUser = () => {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");

  const [statusEdit, setStatusEdit] = useState(false);

  // const router = useRouter();
  const dispatch = useDispatch();

  const dispatchGetProfileUser = async () => {
    await dispatch(getProfileUser()).unwrap();
  };

  const { 
    ProfileUser ,
     // ProfileUser
    // user_id,
    // user_email,
    // user_name,
    // user_gender,
    // user_phone,
    // user_date_of_birth,
    // user_picture,
    // users_job_desk,
    // users_domicile,
    // users_location,
    // users_description,
    // user_role,
    // user_created_on,
    // user_updated_on
    isLoading
   } = useSelector((state) => state.ProfileUser);


  //  const preLoading


  

  useEffect(() => {
    dispatchGetProfileUser();
    setToken(Cookies.get("token"));
    setRefreshToken(Cookies.get("refreshToken"));
    setRole(Cookies.get("role"));
    setId(Cookies.get("id"));
  

  }, [dispatch, token, refreshToken, role, id]);

  return (
    <Fragment>
      <PreLoader isLoading={isLoading} />
       <div className="container container-profile-users">
        <div className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 my-xl-5 my-lg-5 mt-md-5 mt-sm-5">
            <div className="col-12 d-flex mx-auto">
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 d-flex justify-content-center logo-profile-middle">
                <Image
                  className="pictureThumbnails"
                  referrerPolicy="no-referrer"
                  width={60}
                  height={60}
                  layout="fixed"
                  src={ProfileUser?.picture === null || ProfileUser?.picture  === undefined ? "/assets/icons/ico-user.svg" : ProfileUser?.picture }
                  alt=""
                />
              </div>
              <div className="col-xl-8 col-lg-8 col-md-6 col-sm-6 my-auto">
                <p className="my-auto fw-bold mb-1">{ProfileUser?.name}</p>

                <div className="my-auto" onClick={() => {
                  setStatusEdit(true)
                  // dispatchGetProfileUser()
                  }}>
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
                    <div className="nav nav-pills d-grid " id="v-pills-tab" role="tablist" aria-orientation="horizontal">
                      <a className="nav-link active" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="true">
                        {/* <img className="me-1" src="./assets/images/icons/my_account.svg" alt="i" /> */}
                        <span>My account</span>
                      </a>

                      {/* <a className="nav-link " id="v-pills-address-tab" data-bs-toggle="pill" data-bs-target="#v-pills-address" type="button" role="tab" aria-controls="v-pills-address" aria-selected="true">
                        <img className="me-1" src="./assets/images/icons/shipping.svg" alt="" />
                        <span>Details of me</span>
                      </a>

                      <a className="nav-link" id="v-pills-order-tab" data-bs-toggle="pill" data-bs-target="#v-pills-order" type="button" role="tab" aria-controls="v-pills-order" aria-selected="true">
                        <img className="me-1" src="./assets/images/icons/order.svg" alt="" />
                        <span>Apply job</span>
                      </a> */}
                      <a className="nav-link" id="v-pills-portfolio-tab" data-bs-toggle="pill" data-bs-target="#v-pills-portfolio" type="button" role="tab" aria-controls="v-pills-portfolio" aria-selected="true">
                        {/* <img className="me-1" src="./assets/images/icons/my_account.svg" alt="i" /> */}
                        <span>Portfolio</span>
                      </a>
                      <a className="nav-link" id="v-pills-work-experience-tab" data-bs-toggle="pill" data-bs-target="#v-pills-work-experience" type="button" role="tab" aria-controls="v-pills-work-experience" aria-selected="true">
                        {/* <img className="me-1" src="./assets/images/icons/my_account.svg" alt="i" /> */}
                        <span>Work Experience</span>
                      </a>
                      <a className="nav-link" id="v-pills-skill-tab" data-bs-toggle="pill" data-bs-target="#v-pills-skill" type="button" role="tab" aria-controls="v-pills-skill" aria-selected="true">
                        {/* <img className="me-1" src="./assets/images/icons/my_account.svg" alt="i" /> */}
                        <span>Skill</span>
                      </a>
                      <a className="nav-link" id="v-pills-hire-job-tab" data-bs-toggle="pill" data-bs-target="#v-pills-hire-job" type="button" role="tab" aria-controls="v-pills-hire-job" aria-selected="true">
                        {/* <img className="me-1" src="./assets/images/icons/my_account.svg" alt="i" /> */}
                        <span>Hire Job </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12  bg-light">
            <div className="container">
              <div className="col-12 w-auto bg-white mx-3 my-5 py-3 px-3">
                <div className="tab-content" id="v-pills-tabContent">
                  <UsersTabProfile ProfileUser={ProfileUser} 
                     statusEdit={statusEdit}
                     setStatusEdit={setStatusEdit}
                    //  getDataProfileRecuiter={getDataProfileRecuiter}
                     token={token}
                     
                     />

                  {/* <div className="tab-pane fade show" id="v-pills-address" role="tabpanel" aria-labelledby="v-pills-address-tab" data-toggle="button">
                    <div className="my-5">
                      <div className="container-fluid">
                        <div className="col-12 justify-content-start ">
                          <h4 className="modal-title fw-bold" id="modalAddressLabel">
                            Choose another address
                          </h4>
                          <h6 className="text-muted my-2" id="modalAddressLabel">
                            Manage your shipping address
                          </h6>
                        </div>
                        <hr />
                        <div className="mx-5 mt-5 mb-4">
                          <div className="col-12 d-flex justify-content-center my-3 ">
                            <button className="btn-new-address col d-flex justify-content-center align-items-center text-center" data-bs-toggle="modal" data-bs-target="#modalNewAddress" data-bs-dismiss="modal" type="button">
                              <p className="text-muted my-auto">Add New Address</p>
                            </button>
                          </div>
                          <div className="col-12 justify-content-start mb-4">
                            <div className="list-group my-4">
                              <a href="#" data-bs-dismiss="modal" className="list-group-item list-group-item-action active my-3" aria-current="true">
                                <h5 className="my-2 mx-2">Andreas Jane</h5>
                                <h6 className="my-2 mx-2">
                                  <small>Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</small>
                                </h6>
                                <button className="btn-change-address d-flex justify-content-start align-items-start text-start" data-bs-toggle="modal" data-bs-target="#modalChangeAddress" data-bs-dismiss="modal" type="link">
                                  <p className="fw-bold text-danger my-auto text-danger">Change Address</p>
                                </button>
                              </a>
                              <a href="#" data-bs-dismiss="modal" className="list-group-item list-group-item-action my-3" aria-current="true">
                                <h5 className="my-2 mx-2">Andreas Jule</h5>
                                <h6 className="my-2 mx-2">
                                  <small>Perumahan Sapphire Mediterania, Wiradadi, Kec. Sokaraja, Kabupaten Banyumas, Jawa Tengah, 53181 [Tokopedia Note: blok c 16] Sokaraja, Kab. Banyumas, 53181</small>
                                </h6>
                                <button className="btn-change-address d-flex justify-content-start align-items-start text-start" data-bs-toggle="modal" data-bs-target="#modalChangeAddress" data-bs-dismiss="modal" type="link">
                                  <p className="fw-bold text-danger my-auto text-danger">Change Address</p>
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal fade" id="modalNewAddress" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalNewAddressLabel" aria-hidden="true">
                      <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                          <div className="modal-body">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-12 d-flex justify-content-end ">
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="col-12 d-flex justify-content-center my-2">
                                  <h4 className="modal-title fw-bold " id="modalNewAddressLabel">
                                    Add new address
                                  </h4>
                                </div>
                                <div className="col-12 justify-content-center my-2 ">
                                  <label className="fs-6 text-muted form-label">Save address as (ex : home address, office address)</label>
                                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Rumah" />
                                </div>
                                <div className="col-12 d-flex justify-content-between my-2 ">
                                  <div className="col-6">
                                    <div className="col-11">
                                      <label className="fs-6 text-muted form-label">Recipient`s name</label>
                                      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="" />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="col-12">
                                      <label className="fs-6 text-muted form-label">Recipient`s telephone number</label>
                                      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between  my-2 ">
                                  <div className="col-6">
                                    <div className="col-11">
                                      <label className="fs-6 text-muted form-label">Address</label>
                                      <input type="email" className="form-control " id="exampleFormControlInput1" placeholder="" />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="col-12">
                                      <label className="fs-6 text-muted form-label">Postal code</label>
                                      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between my-2 ">
                                  <div className="col-6">
                                    <div className="col-11">
                                      <label className="fs-6 text-muted form-label">City or Subdistrict</label>
                                      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 d-flex my-2">
                                  <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="customControlInline" />
                                    <label className="form-check-label mt-1 mb-1" htmlFor="customControlInline">
                                      Remember my preference
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12 d-flex justify-content-end my-2">
                                  <div className="col-6 d-flex justify-content-center">
                                    <button className="btn-cancel-address rounded-pill me-1 w-100" data-bs-toggle="modal" data-bs-target="#modalAddress" data-bs-dismiss="modal" type="button">
                                      Cancel
                                    </button>
                                    <button className="btn-save-address rounded-pill ms-1 w-100" data-bs-toggle="modal" data-bs-target="#modalAddress" data-bs-dismiss="modal" type="button">
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal fade" id="modalChangeAddress" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalChangeAddressLabel" aria-hidden="true">
                      <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                          <div className="modal-body">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-12 d-flex justify-content-end ">
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="col-12 d-flex justify-content-center my-2">
                                  <h4 className="modal-title fw-bold " id="modalChangeAddressLabel">
                                    Change address
                                  </h4>
                                </div>
                                <div className="col-12 justify-content-center my-2 ">
                                  <label className="fs-6 text-muted form-label">Save address as (ex : home address, office address)</label>
                                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Rumah" />
                                </div>
                                <div className="col-12 d-flex justify-content-between my-2 ">
                                  <div className="col-6">
                                    <div className="col-11">
                                      <label className="fs-6 text-muted form-label">Recipient`s name</label>
                                      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="" />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="col-12">
                                      <label className="fs-6 text-muted form-label">Recipient`s telephone number</label>
                                      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between  my-2 ">
                                  <div className="col-6">
                                    <div className="col-11">
                                      <label className="fs-6 text-muted form-label">Address</label>
                                      <input type="email" className="form-control " id="exampleFormControlInput1" placeholder="" />
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="col-12">
                                      <label className="fs-6 text-muted form-label">Postal code</label>
                                      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 d-flex justify-content-between my-2 ">
                                  <div className="col-6">
                                    <div className="col-11">
                                      <label className="fs-6 text-muted form-label">City or Subdistrict</label>
                                      <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-12 d-flex my-2">
                                  <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="customControlInline" />
                                    <label className="form-check-label mt-1 mb-1" htmlFor="customControlInline">
                                      Remember my preference
                                    </label>
                                  </div>
                                </div>
                                <div className="col-12 d-flex justify-content-end my-2">
                                  <div className="col-6 d-flex justify-content-center">
                                    <button className="btn-cancel-address rounded-pill me-1 w-100" data-bs-toggle="modal" data-bs-target="#modalAddress" data-bs-dismiss="modal" type="button">
                                      Cancel
                                    </button>
                                    <button className="btn-save-address rounded-pill ms-1 w-100" data-bs-toggle="modal" data-bs-target="#modalAddress" data-bs-dismiss="modal" type="button">
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade show" id="v-pills-order" role="tabpanel" aria-labelledby="v-pills-order-tab" data-toggle="button">
                    <div className="row">
                      <div className="container-fluid container-nav-pills">
                        <div className="col-12 justify-content-start">
                          <h4 className="modal-title fw-bold " id="modalProfileLabel">
                            My Order
                          </h4>
                        </div>
                        <div className="nav d-flex-column nav-pills justify-content-start mt-2" id="v-pills-tab" role="tablist" aria-orientation="horizontal">
                          <a className="nav-link active" id="v-pills-allitem-tab" data-bs-toggle="pill" data-bs-target="#v-pills-allitem" type="button" role="tab" aria-controls="v-pills-allitem" aria-selected="true">
                            All items
                          </a>

                          <a className="nav-link" id="v-pills-notpaid-tab" data-bs-toggle="pill" data-bs-target="#v-pills-notpaid" type="button" role="tab" aria-controls="v-pills-notpaid" aria-selected="true">
                            {" "}
                            Not paid yet
                          </a>

                          <a className="nav-link" id="v-pills-packed-tab" data-bs-toggle="pill" data-bs-target="#v-pills-packed" type="button" role="tab" aria-controls="v-pills-packed" aria-selected="true">
                            {" "}
                            Packed
                          </a>

                          <a className="nav-link" id="v-pills-sent-tab" data-bs-toggle="pill" data-bs-target="#v-pills-sent" type="button" role="tab" aria-controls="v-pills-sent" aria-selected="true">
                            {" "}
                            Sent
                          </a>

                          <a className="nav-link" id="v-pills-completed-tab" data-bs-toggle="pill" data-bs-target="#v-pills-completed" type="button" role="tab" aria-controls="v-pills-completed" aria-selected="true">
                            Completed
                          </a>

                          <a className="nav-link" id="v-pills-cancel-tab" data-bs-toggle="pill" data-bs-target="#v-pills-cancel" type="button" role="tab" aria-controls="v-pills-cancel" aria-selected="true">
                            {" "}
                            Order Cancel
                          </a>
                        </div>
                        <hr />

                        <div className="tab-content" id="v-pills-tabContent">
                          <div className="tab-pane fade show active" id="v-pills-allitem" role="tabpanel" aria-labelledby="v-pills-allitem-tab" data-toggle="button">
                            <div className="vh-100">tab all item</div>
                          </div>

                          <div className="tab-pane fade show" id="v-pills-notpaid" role="tabpanel" aria-labelledby="v-pills-notpaid-tab" data-toggle="button">
                            <div className="vh-100">tab not paid</div>
                          </div>

                          <div className="tab-pane fade show" id="v-pills-packed" role="tabpanel" aria-labelledby="v-pills-packed-tab" data-toggle="button">
                            <div className="vh-100">tab picked</div>
                          </div>

                          <div className="tab-pane fade show" id="v-pills-sent" role="tabpanel" aria-labelledby="v-pills-sent-tab" data-toggle="button">
                            <div className="vh-100">tab sent</div>
                          </div>

                          <div className="tab-pane fade show" id="v-pills-completed" role="tabpanel" aria-labelledby="v-pills-completed-tab" data-toggle="button">
                            <div className="vh-100">tab completed</div>
                          </div>

                          <div className="tab-pane fade show" id="v-pills-cancel" role="tabpanel" aria-labelledby="v-pills-cancel-tab" data-toggle="button">
                            <div className="vh-100">tab order cancel</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <UsersTabPortfolio />

                  <UsersTabWorkExperience />
                  
                  <UsersTabSkill />

                  <UsersTabHireJob />
                 

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default connect((state) => state)(ProfileUser);

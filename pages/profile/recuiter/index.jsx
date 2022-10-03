import { useEffect, useState, Fragment } from "react";
// import {useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Image from "next/image";
import RecuiterTabProfile from "../../../components/RecuiterTabProfile";
// import SellerPageTabOrder from "../SellerPageTabOrder/SellerPageTabOrder";
// import SellerPageTabProduct from "../SellerPageTabProduct/SellerPageTabProduct";
// import SellerPageTabProfile from "../SellerPageTabProfile/SellerPageTabProfile";

// import editProfileIcon from "../../assets/images/icons/edit.svg";
// import SellerProfileIcon from "../../assets/images/icons/house-door.svg";
// import SellerProductIcon from "../../assets/images/icons/box-seam.svg";
// import SellerOrderIcon from "../../assets/images/icons/order.svg";

import Cookies from "js-cookie";

const Recuiter = () => {
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
 
  const [recuiter, setRecuiter] = useState([]);

  const [statusEdit, setStatusEdit] = useState(false);

  // const navigate = useNavigate();
  const getDataProfileRecuiter = async () => {
    await axios
      .get(process.env.REACT_APP_API_BACKEND + "recuiter/" + id)
      .then((response) => {
        setRecuiter(response.data.data[0]);
        // console.log(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // dispatchProfileUser();
    getDataProfileRecuiter();
    // setId(localStorage.getItem("id"));
    // setToken(localStorage.getItem("token"));
    setId(Cookies.get("id"));
    setToken(Cookies.get("token"));

  }, [id, token]);

  return (
    <Fragment>
      <div className="container container-profile-recuiter">
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
                  src={
                    recuiter.logo === null || recuiter.logo === undefined
                      ? "/assets/icons/ico-user.svg"
                      : recuiter.logo
                  }
                  alt=""
                />
              </div>
              <div className="col-xl-8 col-lg-8 col-md-6 col-sm-6 my-auto">
                <p className="my-auto fw-bold mb-1">{recuiter.company}</p>

                <div className="my-auto" onClick={() => setStatusEdit(true)}>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btn-check-2-outlined"
                    autoComplete="off"
                  />
                  <label className="" htmlFor="btn-check-2-outlined">
                    <Image
                      referrerPolicy="no-referrer"
                      width={15}
                      height={15}
                      layout="fixed"
                      src={"/assets/icons/edit.svg"}
                      alt=""
                    />
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
                      <div
                        className="nav nav-pills d-grid"
                        id="v-pills-tab"
                        role="tablist"
                        aria-orientation="horizontal"
                      > 
                        <li className="mb-1">
                          <div className="d-flex justify-content-between">
                            <button
                              className="nav-link d-flex justify-content-start collapsed px-n5"
                              data-bs-toggle="collapse"
                              data-bs-target="#recuiter-collapse"
                              aria-expanded="true"
                            >
                              <div className="ms-1 me-2 ico-profile d-flex justify-content-center py-0 my-0">
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
                              <span className="label-sidebar my-auto">
                                Recuiter
                              </span>
                            </button>
                            <button
                              className=" btn-toggle rounded collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#recuiter-collapse"
                              aria-expanded="true"
                            ></button>
                          </div>

                          <div className="collapse show" id="recuiter-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                              <li>
                                <button
                                  href="#"
                                  className="nav-link rounded ms-5 active"
                                  id="v-pills-profile-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#v-pills-profile"
                                  type="button"
                                  role="tab"
                                  aria-controls="v-pills-profile"
                                  aria-selected="true"
                                >
                                  Recuiter Profile
                                </button>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="mb-1">
                          <div className="d-flex justify-content-between">
                            <button
                              className="nav-link  d-flex justify-content-start collapsed px-n5"
                              data-bs-toggle="collapse"
                              data-bs-target="#job-collapse"
                              aria-expanded="false"
                            >
                              <div className="ms-1 me-2 ico-product d-flex justify-content-center">
                                {/* <img className="w-50" src={SellerProductIcon} alt="" /> */}
                              </div>
                              <label className="label-sidebar my-auto">
                                Job
                              </label>
                            </button>
                            <button
                              className="btn btn-toggle align-items-center rounded collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#job-collapse"
                              aria-expanded="false"
                            ></button>
                          </div>

                          <div className="collapse" id="job-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                              <li>
                                <button
                                  href="#"
                                  className="nav-link rounded ms-5"
                                  id="v-pills-job-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#v-pills-job"
                                  type="button"
                                  role="tab"
                                  aria-controls="v-pills-job"
                                  aria-selected="true"
                                >
                                  My Job List
                                </button>
                                <button
                                  href="#"
                                  className="nav-link rounded ms-5"
                                  id="v-pills-sellproduct-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#v-pills-sellproduct"
                                  type="button"
                                  role="tab"
                                  aria-controls="v-pills-sellproduct"
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
                            <button
                              className="nav-link  d-flex justify-content-start collapsed px-n5"
                              data-bs-toggle="collapse"
                              data-bs-target="#order-collapse"
                              aria-expanded="false"
                            >
                              <div className="ms-1 me-2 ico-order d-flex justify-content-center">
                                {/* <img className="w-50" src={SellerOrderIcon} alt="" /> */}
                              </div>
                              <span className="label-sidebar my-auto">
                                Order
                              </span>
                            </button>
                            <button
                              className="btn btn-toggle align-items-center rounded collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#order-collapse"
                              aria-expanded="false"
                            ></button>
                          </div>

                          <div className="collapse" id="order-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                              <li>
                                <button
                                  href="#"
                                  className="nav-link rounded ms-5"
                                  id="v-pills-order-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#v-pills-order"
                                  type="button"
                                  role="tab"
                                  aria-controls="v-pills-order"
                                  aria-selected="true"
                                >
                                  My order
                                </button>
                                <button
                                  href="#"
                                  className="nav-link rounded ms-5"
                                  id="#v-pills-cancel-tab"
                                  data-bs-toggle="pill"
                                  data-bs-target="#v-pills-cancel"
                                  type="button"
                                  role="tab"
                                  aria-controls="#v-pills-cancel"
                                  aria-selected="true"
                                >
                                  Cancel order
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
                  <RecuiterTabProfile
                    recuiter={recuiter}
                    // name_store={seller.name_store}
                    // logo={seller.logo}
                    // address={seller.address}
                    // phone={seller.phone}
                    // description={seller.description}
                    statusEdit={statusEdit}
                    setStatusEdit={setStatusEdit}
                    getDataProfileRecuiter={getDataProfileRecuiter}
                    token={token}
                  />

                  {/* <SellerPageTabProduct id={id} /> */}

                  {/* <SellerPageCreateProduct id={id} /> */}

                  {/* <SellerPageTabOrder /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Recuiter;

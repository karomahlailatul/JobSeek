import { Fragment, useState, useEffect } from "react";

import axios from "axios";
import Image from "next/image";

import {  toast } from "react-toastify";

function RecuiterTabProfile({
  recuiter,
  statusEdit,
  setStatusEdit,
  getDataProfileRecuiter,
  token
}) {
  // console.log(recuiter);
  const [data, setData] = useState({
    id: recuiter.id,
    users_id: recuiter.users_id,
    company: recuiter.company,
    position: recuiter.position,
    email: recuiter.email,
    logo: recuiter.logo,
    address: recuiter.address,
    phone: recuiter.phone,
    description: recuiter.description,
  });

  const [preview, setPreview] = useState();

  const [newLogo, setNewLogo] = useState(null);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

  const handleUpload = (e) => {
    setNewLogo(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "company",
      data.company === undefined || data.company === null ? recuiter.company : data.company
    );
    formData.append(
      "users_id",
      data.users_id === undefined || data.users_id === null ? recuiter.users_id : data.users_id
    );
    formData.append(
      "position",
      data.position === undefined || data.position === null ? recuiter.position : data.position
    );
    formData.append("logo", newLogo === undefined || newLogo === null ? recuiter.logo : newLogo);
    formData.append(
      "email",
      data.email === undefined || data.email === null ? recuiter.email : data.email
    );
    formData.append(
      "address",
      data.address === undefined || data.address === null ? recuiter.address : data.address
    );
    formData.append(
      "phone",
      data.phone === undefined || data.phone === null ? recuiter.phone : data.phone
    );
    formData.append(
      "description",
      data.description === undefined || data.description === null ? recuiter.description : data.description
    );

    const updateSellerPage = async () => {
      await axios
        .put(
          process.env.REACT_APP_API_BACKEND + "recuiter/" + recuiter.id,
          formData,
          {
            headers: {
                Authorization: `Bearer ${token}`,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log(res);
        //   getDataProfileRecuiter();
        //   setNewLogo();
        //   setPreview();
        //   setStatusEdit(false);
        //   toast.success("Update Recuiter Success", { autoClose: 2500 });
          // alert("product update");
        })
        .catch((err) => {
          console.log(err);
          toast.danger(err, { autoClose: 2500 });
          // alert(err);
        });
    };
    updateSellerPage();
  };

  return (
    <Fragment>
      <div
        className="tab-pane active"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
        data-toggle="button"
      >
        <div className="">
          <div className="container">
            <div className="col-12 justify-content-start">
              <h4 className="modal-title fw-bold " id="modalProfileLabel">
                My Profile Recuiter
              </h4>
              <h6 className="text-muted my-2" id="modalProfileLabel">
                Manage your profile information
              </h6>
            </div>
            <hr />
            <form onSubmit={handleUpdate} className="col-12">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 d-xl-flex d-lg-flex flex-xl-row-reverse flex-lg-row-reverse d-md-grid d-sm-grid my-3">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                  <div className="col-12 d-flex justify-content-center my-3 logo-profile-big">
                    {/* <img className="" crossOrigin="anonymous" src={preview === undefined ? logo : preview} alt="" /> */}

                    <Image
                      className="pictureThumbnails"
                      referrerPolicy="no-referrer"
                      width={180}
                      height={180}
                      layout="fixed"
                      // src={"/assets/icons/mail.svg"}
                      src={
                        preview === null || preview === undefined ? 
                           ( data.logo === null || data.logo === undefined ? 
                            ( recuiter.logo === null || recuiter.logo === undefined ?  "/assets/icons/ico-user.svg" : recuiter.logo )
                            : data.logo )
                          : preview 
                      }
                      alt=""
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-center upload-btn-wrapper">
                    <button
                      type="button"
                      className="btn btn-outline-secondary rounded-pill"
                    >
                      Select Image
                    </button>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      name="logo"
                      onChange={handleUpload}
                      defaultValue={
                        newLogo === undefined ? recuiter.logo : newLogo
                      }
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label
                        htmlFor="company"
                        className="fs-6 text-muted form-label my-auto ms-2"
                      >
                        Company
                      </label>
                    </div>
                    <input
                      id="company"
                      type="text"
                      className="form-control"
                      placeholder="Company"
                      name="company"
                      onChange={handleChange}
                      defaultValue={
                        data.company === undefined
                          ? recuiter.company
                          : data.company
                      }
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label
                        htmlFor="position"
                        className="fs-6 text-muted form-label my-auto ms-2"
                      >
                        Position
                      </label>
                    </div>
                    <input
                      id="position"
                      type="text"
                      className="form-control"
                      placeholder="Position"
                      name="position"
                      onChange={handleChange}
                      defaultValue={
                        data.position === undefined
                          ? recuiter.position
                          : data.position
                      }
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label
                        htmlFor="email_company"
                        className="fs-6 text-muted form-label my-auto ms-2"
                      >
                        Email Company
                      </label>
                    </div>
                    <input
                      id="email_company"
                      type="text"
                      className="form-control"
                      placeholder="Email Company"
                      name="email"
                      onChange={handleChange}
                      defaultValue={
                        data.email === undefined ? recuiter.email : data.email
                      }
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label
                        htmlFor="address"
                        className="fs-6 text-muted form-label my-auto ms-2"
                      >
                        Address
                      </label>
                    </div>

                    <input
                      id="address"
                      type="text"
                      className="form-control"
                      placeholder="Address"
                      name="address"
                      onChange={handleChange}
                      defaultValue={
                        data.address === undefined
                          ? recuiter.address
                          : data.address
                      }
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label
                        htmlFor="phone"
                        className="fs-6 text-muted form-label my-auto ms-2"
                      >
                        Phone
                      </label>
                    </div>
                    <input
                      id="phone"
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Phone"
                      onChange={handleChange}
                      defaultValue={
                        data.phone === undefined ? recuiter.phone : data.phone
                      }
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label
                        htmlFor="description"
                        className="fs-6 text-muted form-label my-auto ms-2"
                      >
                        Description
                      </label>
                    </div>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="5"
                      name="description"
                      placeholder="Description"
                      onChange={handleChange}
                      defaultValue={
                        data.description === undefined
                          ? recuiter.description
                          : data.description
                      }
                      disabled={statusEdit === true ? false : true}
                    ></textarea>
                  </div>
                  <div className="col-12 d-flex justify-content-center my-4">
                    <button
                      type="submit"
                      className="btn btn-success rounded-pill px-5"
                      // onClick={(e)=>
                      //   setSellerPage() }
                      disabled={statusEdit === true ? false : true}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default RecuiterTabProfile;

import { Fragment, useState } from "react";

import Image from "next/image";

import PreLoader from "../PreLoader";

import { useDispatch } from "react-redux";

import { putRecruiterProfilePutProfileSlice } from "../../app/redux/Slice/RecruiterProfilePutProfileSlice";

const RecruiterTabProfileRecruiterProfile = ({
  RecruiterProfile,
  statusEdit,
  setStatusEdit,
  dispatchGetRecruiterProfile,
  // token, refreshToken,   role, id,
  // isLoading,
}) => {
  // console.log(recruiter);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    id: RecruiterProfile.id,
    users_id: RecruiterProfile.users_id,
    company: RecruiterProfile.company,
    position: RecruiterProfile.position,
    email: RecruiterProfile.email,
    logo: RecruiterProfile.logo,
    address: RecruiterProfile.address,
    phone: RecruiterProfile.phone,
    description: RecruiterProfile.description,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [preview, setPreview] = useState();

  const [newLogo, setNewLogo] = useState(null);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    // console.log(data);
  };


  const handleUpload = (e) => {
    setNewLogo(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = async (e) => {
    await e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("company", data.company === undefined ? RecruiterProfile.company : data.company);
    formData.append("users_id", RecruiterProfile.users_id);
    formData.append("position", data.position === undefined ? RecruiterProfile.position : data.position);
    formData.append("logo", newLogo === undefined || newLogo === null ? RecruiterProfile.logo : newLogo);
    formData.append("email", data.email === undefined ? RecruiterProfile.email : data.email);
    formData.append("address", data.address === undefined ? RecruiterProfile.address : data.address);
    formData.append("phone", data.phone === undefined ? RecruiterProfile.address : data.phone);
    formData.append("description", data.description === undefined ? RecruiterProfile.description : data.description);

    dispatch(putRecruiterProfilePutProfileSlice(formData))
      .unwrap()
      .then(() => {
        setNewLogo();
        setPreview();
        dispatchGetRecruiterProfile();
        setStatusEdit(false);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <Fragment>
      <PreLoader isLoading={isLoading} />
      <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" data-toggle="button">
        <div className="">
          <div className="container">
            <div className="col-12 justify-content-start">
              <h4 className="modal-title fw-bold " id="modalProfileLabel">
                My Profile recruiter
              </h4>
              <h6 className="text-muted my-2" id="modalProfileLabel">
                Manage your profile information
              </h6>
            </div>
            <hr />
            <form onSubmit={handleUpdate} className="col-12">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 d-xl-flex d-lg-flex flex-xl-row-reverse flex-lg-row-reverse d-md-grid d-sm-grid my-3">
                <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-12 col-sm-12">
                  <div className="col-12 d-flex justify-content-center my-3 logo-profile-big">
                    {/* <img className="" crossOrigin="anonymous" src={preview === undefined ? logo : preview} alt="" /> */}

                    <Image
                      className="pictureThumbnails"
                      referrerPolicy="no-referrer"
                      width={180}
                      height={180}
                      layout="fixed"
                      // src={"/assets/icons/mail.svg"}
                      src={preview === null || preview === undefined ? (RecruiterProfile.logo === null || RecruiterProfile.logo === undefined ? "/assets/icons/ico-user.svg" : RecruiterProfile.logo) : preview}
                      alt=""
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-center upload-btn-wrapper">
                    <button type="button" className="btn btn-outline-secondary ">
                      Select Logo Company
                    </button>
                    <input className="form-control" type="file" id="formFile" name="logo" onChange={handleUpload} disabled={statusEdit === true ? false : true} />
                  </div>
                </div>
                <div className="col-xxl-8 col-xl-7 col-lg-7 col-md-12 col-sm-12">
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="company" className="fs-6 text-muted form-label my-auto ms-2">
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
                      defaultValue={RecruiterProfile.company === undefined || RecruiterProfile.company == null ? null : RecruiterProfile.company}
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="position" className="fs-6 text-muted form-label my-auto ms-2">
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
                      defaultValue={RecruiterProfile.position === undefined || RecruiterProfile.position == null ? null : RecruiterProfile.position}
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="email_company" className="fs-6 text-muted form-label my-auto ms-2">
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
                      defaultValue={RecruiterProfile.email === undefined || RecruiterProfile.email == null ? null : RecruiterProfile.email}
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="address" className="fs-6 text-muted form-label my-auto ms-2">
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
                      defaultValue={RecruiterProfile.address === undefined || RecruiterProfile.address == null ? null : RecruiterProfile.address}
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="phone" className="fs-6 text-muted form-label my-auto ms-2">
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
                      defaultValue={RecruiterProfile.phone === undefined || RecruiterProfile.phone == null ? null : RecruiterProfile.phone}
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="description" className="fs-6 text-muted form-label my-auto ms-2">
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
                      defaultValue={RecruiterProfile.description === undefined || RecruiterProfile.description == null ? null : RecruiterProfile.description}
                      disabled={statusEdit === true ? false : true}
                    ></textarea>
                  </div>
                  <div className="col-12 d-flex justify-content-center my-4">
                    <button type="submit" className="btn btn-success  px-5" disabled={statusEdit === true ? false : true}>
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

export default RecruiterTabProfileRecruiterProfile;

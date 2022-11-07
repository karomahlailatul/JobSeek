import { Fragment, useState } from "react";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

import { getRecruiterProfile } from "../../app/redux/Slice/RecruiterProfileSlice";
import { putRecruiterProfilePutProfileSlice } from "../../app/redux/Slice/RecruiterProfilePutProfileSlice";

import PreLoaderComponent from "../PreLoaderComponent";

const RecruiterTabProfileRecruiterProfile = ({
  // RecruiterProfile,
  statusEdit,
  setStatusEdit,
  // dispatchGetRecruiterProfile,
  token,
  refreshToken,
  // role,
  id,
  // isLoading,
}) => {
  const dispatch = useDispatch();

  const dispatchGetRecruiterProfile = async () => {
    dispatch(getRecruiterProfile({ token, refreshToken, id }));
  };

  const { RecruiterProfile } = useSelector((state) => state.RecruiterProfile);

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
    formData.append("users_id", id);
    formData.append("position", data.position === undefined ? RecruiterProfile.position : data.position);
    formData.append("logo", newLogo === undefined || newLogo === null ? RecruiterProfile.logo : newLogo);
    formData.append("email", data.email === undefined ? RecruiterProfile.email : data.email);
    formData.append("address", data.address === undefined ? RecruiterProfile.address : data.address);
    formData.append("phone", data.phone === undefined ? RecruiterProfile.address : data.phone);
    formData.append("description", data.description === undefined ? RecruiterProfile.description : data.description);

    dispatch(putRecruiterProfilePutProfileSlice({ token, refreshToken, id, formData }))
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
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "614.19px" }}>
          <PreLoaderComponent isLoading={isLoading} />
        </div>
      ) : (
        <div className="container-fluid">
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
                  <Image className="pictureThumbnails" referrerPolicy="no-referrer" width={180} height={180} layout="fixed" src={preview ? preview : RecruiterProfile.logo ? RecruiterProfile.logo : "/assets/icons/ico-user.svg"} alt="" />
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
                    defaultValue={data.company ? data.company : RecruiterProfile.company ? RecruiterProfile.company : null}
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
                    defaultValue={data.position ? data.position : RecruiterProfile.position ? RecruiterProfile.position : null}
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
                    defaultValue={data.email ? data.email : RecruiterProfile.email ? RecruiterProfile.email : null}
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
                    defaultValue={data.address ? data.address : RecruiterProfile.address ? RecruiterProfile.address : null}
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
                    defaultValue={data.phone ? data.phone : RecruiterProfile.phone ? RecruiterProfile.phone : null}
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
                    defaultValue={data.description ? data.description : RecruiterProfile.description ? RecruiterProfile.description : null}
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
      )}
    </Fragment>
  );
};

export default RecruiterTabProfileRecruiterProfile;

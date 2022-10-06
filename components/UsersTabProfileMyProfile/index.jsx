import { Fragment, useState, useEffect } from "react";

import Image from "next/image";

import { useDispatch } from "react-redux";

import { putUsersProfilePutProfile } from "../../app/redux/Slice/UsersProfilePutProfileSlice";

import { getNavBarUsers } from "../../app/redux/Slice/NavBarUsersSlice";

import PreLoader from "../PreLoader";

const UsersTabProfileMyProfile = ({
  statusEdit,
  setStatusEdit,
  dispatchGetUsersProfile,
  // token, refreshToken, role, id
  UsersProfile,
  // isLoading
}) => {
  const dispatch = useDispatch();

  const dispatchNavBarUsers = async () => {
    await dispatch(getNavBarUsers()).unwrap();
  };

  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    id: UsersProfile.id,
    email: UsersProfile.email,
    name: UsersProfile.name,
    gender: UsersProfile.gender,
    phone: UsersProfile.phone,
    date_of_birth: UsersProfile.date_of_birth,
    picture: UsersProfile.picture,
    job_desk: UsersProfile.job_desk,
    domicile: UsersProfile.domicile,
    location: UsersProfile.location,
    description: UsersProfile.description,
    role: UsersProfile.role,
  });

  const [preview, setPreview] = useState();

  const [newPicture, setNewPicture] = useState(null);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = (e) => {
    setNewPicture(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = async (e) => {
    await e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    formData.append("name", data.name === undefined ? UsersProfile.name : data.name);
    formData.append("gender", data.gender === undefined ? UsersProfile.gender  : data.gender);
    formData.append("phone", data.phone === undefined  ? UsersProfile.phone: data.phone);
    formData.append("date_of_birth", data.date_of_birth === undefined ? UsersProfile.date_of_birth : data.date_of_birth);
    formData.append("picture", newPicture === undefined || newPicture === null ? UsersProfile.picture : newPicture);
    formData.append("job_desk", data.job_desk === undefined  ? UsersProfile.job_desk : data.job_desk);
    formData.append("domicile", data.domicile === undefined ? UsersProfile.domicile : data.domicile);
    formData.append("location", data.location === undefined  ? UsersProfile.location  : data.location);
    formData.append("description", data.description === undefined ? UsersProfile.description  : data.description);
    formData.append("role", data.role === undefined || data.role === null ? UsersProfile.role : data.role);

    dispatch(putUsersProfilePutProfile(formData))
      .unwrap()
      .then(() => {
        setNewPicture();
        setPreview();
        dispatchGetUsersProfile();
        dispatchNavBarUsers();
        setStatusEdit(false);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const getRadioButtonGender = async () => {
    if (UsersProfile.gender == "men") {
      document.getElementById("men").checked = true;
      document.getElementById("women").checked = false;
    } else if (UsersProfile.gender == "women") {
      document.getElementById("men").checked = false;
      document.getElementById("women").checked = true;
    } else {
      document.getElementById("men").checked = false;
      document.getElementById("women").checked = false;
    }
  };

  useEffect(() => {
    getRadioButtonGender();
  }, [UsersProfile, dispatch]);

  return (
    <Fragment>
      <PreLoader isLoading={isLoading} />

      <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" data-toggle="button">
        <div className="">
          <div className="container-fluid">
            <div className="col-12 justify-content-start">
              <h4 className="modal-title fw-bold " id="modalProfileLabel">
                My Profile
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
                    <Image
                      className="pictureThumbnails"
                      referrerPolicy="no-referrer"
                      width={180}
                      height={180}
                      layout="fixed"
                      src={preview === null || preview === undefined ? (UsersProfile.picture === null || UsersProfile.picture === undefined ? "/assets/icons/ico-user.svg" : UsersProfile.picture) : preview}
                      alt=""
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-center upload-btn-wrapper">
                    <button type="button" className="btn btn-outline-secondary rounded-pill" disabled={statusEdit === true ? false : true}>
                      Select Image
                    </button>
                    <input className="form-control" type="file" id="formFile" name="picture" disabled={statusEdit === true ? false : true} onChange={handleUpload} />
                  </div>
                </div>
                <div className="col-xxl-8 col-xl-7 col-lg-7 col-md-12 col-sm-12">
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="email" className="fs-6 text-muted form-label my-auto ms-2">
                        Email
                      </label>
                    </div>
                    <input id="email" type="text" className="form-control" placeholder="Email" name="email" onChange={handleChange} defaultValue={UsersProfile.email === undefined || UsersProfile.email == null ? null : UsersProfile.email} disabled />
                  </div>

                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="name" className="fs-6 text-muted form-label my-auto ms-2">
                        Name
                      </label>
                    </div>
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      onChange={handleChange}
                      defaultValue={UsersProfile.name === undefined || UsersProfile.name == null ? null : UsersProfile.name}
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>

                  <div className="col-12 d-flex">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="name" className="fs-6 text-muted form-label my-auto ms-2">
                        Gender
                      </label>
                    </div>
                    <div className="col-7 d-flex justify-content-center align-items-center btn-group text-center justify-content-between" role="group">
                      <div>
                        <input type="radio" value="men" onChange={handleChange} name="gender" className="form-check-input" id="men" disabled={statusEdit === true ? false : true} />
                        <label className="ms-3 form-check-label my-auto" htmlFor="men">
                          Men
                        </label>
                      </div>
                      <div>
                        <input type="radio" value="women" onChange={handleChange} name="gender" className="form-check-input " id="women" disabled={statusEdit === true ? false : true} />
                        <label className="ms-3 form-check-label my-auto" htmlFor="women">
                          Women
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="phone" className="fs-6 text-muted form-label my-auto ms-2">
                        Phone Number
                      </label>
                    </div>
                    <input
                      id="phone"
                      type="text"
                      className="form-control"
                      placeholder="Phone Number"
                      name="phone"
                      onChange={handleChange}
                      defaultValue={UsersProfile.phone === undefined || UsersProfile.phone == null ? null : UsersProfile.phone}
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>

                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label className="fs-6 text-muted form-label my-auto ms-2">Date of Birth</label>
                    </div>

                    <input
                      className="form-control "
                      type="date"
                      id="date_of_birth"
                      name="date_of_birth"
                      defaultValue={UsersProfile.date_of_birth === undefined || UsersProfile.date_of_birth == null ? null : UsersProfile.date_of_birth}
                      disabled={statusEdit === true ? false : true}
                      min="1920-01-01"
                      max="2050-12-12"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="job_desk" className="fs-6 text-muted form-label my-auto ms-2">
                        Job Desk
                      </label>
                    </div>
                    <input
                      id="job_desk"
                      type="text"
                      className="form-control"
                      placeholder="Job Desk"
                      name="job_desk"
                      onChange={handleChange}
                      defaultValue={UsersProfile.job_desk === undefined || UsersProfile.job_desk == null ? null : UsersProfile.job_desk}
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>

                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="domicile" className="fs-6 text-muted form-label my-auto ms-2">
                        Domicile
                      </label>
                    </div>
                    <input
                      id="domicile"
                      type="text"
                      className="form-control"
                      placeholder="Domicile"
                      name="domicile"
                      onChange={handleChange}
                      defaultValue={UsersProfile.domicile === undefined || UsersProfile.domicile == null ? null : UsersProfile.domicile}
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>

                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="location" className="fs-6 text-muted form-label my-auto ms-2">
                        Location
                      </label>
                    </div>
                    <input
                      id="location"
                      type="text"
                      className="form-control"
                      placeholder="location"
                      name="location"
                      onChange={handleChange}
                      defaultValue={UsersProfile.location === undefined || UsersProfile.location == null ? null : UsersProfile.location}
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
                      defaultValue={UsersProfile.description === undefined || UsersProfile.description == null ? null : UsersProfile.description}
                      disabled={statusEdit === true ? false : true}
                    ></textarea>
                  </div>

                  <div className="col-12 d-flex justify-content-center my-4">
                    <button type="submit" className="btn btn-success rounded-pill px-5" disabled={statusEdit === true ? false : true}>
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
};

export default UsersTabProfileMyProfile;

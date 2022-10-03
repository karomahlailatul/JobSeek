import { Fragment, useState, useEffect } from "react";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { getProfileUser } from "../../app/redux/Slice/ProfileUserSlice";
import { putProfileUserPutProfile } from "../../app/redux/Slice/ProfileUserPutProfileSlice";

import { getNavBar } from "../../app/redux/Slice/NavBarSlice";

const UsersTabProfile = ({
  // ProfileUser,
  statusEdit,
  setStatusEdit,
  // getDataProfileRecuiter,
  // token,
  // refreshToken,
  // role,
}) => {
  const dispatch = useDispatch();

  const dispatchGetProfileUser = async () => {
    await dispatch(getProfileUser()).unwrap();
  };

  const dispatchNavBar = async () => {
    await dispatch(getNavBar()).unwrap();
  };

  const { ProfileUser } = useSelector((state) => state.ProfileUser);

  const [data, setData] = useState({
    id: ProfileUser.id,
    email: ProfileUser.email,
    name: ProfileUser.name,
    gender: ProfileUser.gender,
    phone: ProfileUser.phone,
    date_of_birth: ProfileUser.date_of_birth,
    picture: ProfileUser.picture,
    job_desk: ProfileUser.job_desk,
    domicile: ProfileUser.domicile,
    location: ProfileUser.location,
    description: ProfileUser.description,
    role: ProfileUser.role,
  });

  const [preview, setPreview] = useState();

  const [newPicture, setNewPicture] = useState(null);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(newPicture);

  const handleUpload = (e) => {
    setNewPicture(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = async (e) => {
    await e.preventDefault();
    const formData = new FormData();

    formData.append("name", data.name === undefined || data.name === null ? ProfileUser.name : data.name);
    formData.append("gender", data.gender === undefined || data.gender === null ? ProfileUser.gender : data.gender);
    formData.append("phone", data.phone === undefined || data.phone === null ? ProfileUser.phone : data.phone);
    formData.append("date_of_birth", data.date_of_birth === undefined || data.date_of_birth === null ? ProfileUser.date_of_birth : data.date_of_birth);
    formData.append("picture", newPicture === undefined || newPicture === null ? ProfileUser.picture : newPicture);
    formData.append("job_desk", data.job_desk === undefined || data.job_desk === null ? ProfileUser.job_desk : data.job_desk);
    formData.append("domicile", data.domicile === undefined || data.domicile === null ? ProfileUser.domicile : data.domicile);
    formData.append("location", data.location === undefined || data.location === null ? ProfileUser.location : data.location);
    formData.append("description", data.description === undefined || data.description === null ? ProfileUser.description : data.description);
    formData.append("role", data.role === undefined || data.role === null ? ProfileUser.role : data.role);

    dispatch(putProfileUserPutProfile(formData))
      .unwrap()
      .then(() => {
        setNewPicture();
        setPreview();
        dispatchGetProfileUser();
        dispatchNavBar();
        setStatusEdit(false);
      });

    // const updateSellerPage = async () => {
    //   await axios
    //     .put(process.env.REACT_APP_API_BACKEND + "recuiter/" + ProfileUser.id, formData, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Access-Control-Allow-Origin": "*",
    //         "Content-Type": "multipart/form-data",
    //       },
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       //   getDataProfileRecuiter();
    //       //   setNewLogo();
    //       //   setPreview();
    //       //   setStatusEdit(false);
    //       //   toast.success("Update Recuiter Success", { autoClose: 2500 });
    //       // alert("product update");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       toast.danger(err, { autoClose: 2500 });
    //       // alert(err);
    //     });
    // };
    // updateSellerPage();
  };

  const getRadioButtonGender = async () => {
    if (ProfileUser.gender == "men") {
      document.getElementById("men").checked = true;
      document.getElementById("women").checked = false;
    } else if (ProfileUser.gender == "women") {
      document.getElementById("men").checked = false;
      document.getElementById("women").checked = true;
    } else {
      document.getElementById("men").checked = false;
      document.getElementById("women").checked = false;
    }
  };

  useEffect(() => {
    getRadioButtonGender();
  }, [ProfileUser]);

  // console.log (ProfileUser)
  return (
    <Fragment>
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
            {/* <div className="col-12 d-xl-flex d-lg-flex flex-xl-row-reverse flex-lg-row-reverse d-md-grid d-sm-grid  my-3">
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                <div className="col-12 d-flex justify-content-center my-3">
                 
                  <Image
                    className="photo-profile"
                    referrerPolicy="no-referrer"
                    width={180}
                    height={180}
                    layout="fixed"
                    src={ProfileUser.picture === null || ProfileUser.picture === undefined ? "/assets/icons/ico-user.svg" : ProfileUser.picture}
                    alt=""
                  />
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <button type="button" className="btn btn-outline-secondary rounded-pill" data-bs-toggle="modal" data-bs-target="#modalAddress">
                    Select Image
                  </button>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <div className="col-12 d-flex justify-content-start my-3">
                  <div className="col-5 d-flex justify-content-start ">
                    <label className="fs-6 text-muted form-label my-auto ms-2">Name</label>
                  </div>
                  <input type="name" className="form-control" placeholder="" />
                </div>
                <div className="col-12 d-flex justify-content-start my-3">
                  <div className="col-5 d-flex justify-content-start ">
                    <label className="fs-6 text-muted form-label my-auto ms-2">Email</label>
                  </div>
                  <input type="email" className="form-control" placeholder="" />
                </div>
                <div className="col-12 d-flex justify-content-start my-3">
                  <div className="col-5 d-flex justify-content-start ">
                    <label className="fs-6 text-muted form-label my-auto ms-2">Phone Number</label>
                  </div>
                  <input type="phone" className="form-control" placeholder="" />
                </div>

                <div className="col-12 d-flex justify-content-start my-3">
                  <div className="col-5 d-flex justify-content-start ">
                    <label className="fs-6 text-muted form-label my-auto ms-2">Gender</label>
                  </div>
                  <div className="col-6 d-flex justify-content-between">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                      <label className="form-check-label my-auto" htmlFor="inlineRadio1">
                        Men
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                      <label className="form-check-label my-auto" htmlFor="inlineRadio2">
                        Women
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-start my-3">
                  <div className="col-5 d-flex justify-content-start ">
                    <label className="fs-6 text-muted form-label my-auto ms-2">Date of Birth</label>
                  </div>

                  <input className="form-control " type="date" id="start" name="date_of_birth" min="1920-01-01" max="2050-12-12" />
                </div>
                <div className="col-12 d-flex justify-content-center my-4">
                  <button type="button" className="btn-save-profile btn btn-success px-5 rounded-pill " data-bs-toggle="modal" data-bs-target="#modalAddress">
                    Save
                  </button>
                </div>
              </div>
            </div> */}
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
                        preview === null || preview === undefined
                          ? data.picture === null || data.picture === undefined
                            ? ProfileUser.picture === null || ProfileUser.picture === undefined
                              ? "/assets/icons/ico-user.svg"
                              : ProfileUser.picture
                            : data.picture
                          : preview
                      }
                      alt=""
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-center upload-btn-wrapper">
                    <button type="button" className="btn btn-outline-secondary rounded-pill" disabled={statusEdit === true ? false : true}>
                      Select Image
                    </button>
                    <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        name="picture"
                        // defaultValue={newPicture === undefined || newPicture === null ? ProfileUser.picture : newPicture}
                        disabled={statusEdit === true ? false : true}
                        onChange={handleUpload}
                        // style={{display:"none"}}
                      />
                  
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="email" className="fs-6 text-muted form-label my-auto ms-2">
                        Email
                      </label>
                    </div>
                    <input id="email" type="text" className="form-control" placeholder="Email" name="email" onChange={handleChange} defaultValue={data.email === undefined ? ProfileUser.email : data.email} disabled />
                  </div>

                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="name" className="fs-6 text-muted form-label my-auto ms-2">
                        Name
                      </label>
                    </div>
                    <input id="name" type="text" className="form-control" placeholder="Name" name="name" onChange={handleChange} defaultValue={data.name === undefined ? ProfileUser.name : data.name} disabled={statusEdit === true ? false : true} />
                  </div>

                  <div className="col-12 d-flex">
                    <div className="col-5 d-flex justify-content-start ">
                      <label htmlFor="name" className="fs-6 text-muted form-label my-auto ms-2">
                        Gender
                      </label>
                    </div>
                    <div className="col-7 d-flex justify-content-center align-items-center btn-group text-center justify-content-between" role="group">
                      <div>
                        <input
                          type="radio"
                          value="men"
                          onChange={handleChange}
                          name="gender"
                          // defaultChecked
                          className="form-check-input"
                          id="men"
                          // defaultChecked={ProfileUser.gender == null || ProfileUser.gender == undefined ? false : (ProfileUser.gender == "men" ? true : false) }

                          // defaultChecked={ProfileUser.gender !== null || ProfileUser.gender !== undefined ? (ProfileUser.gender === "men" ? true : false) : false}
                          // defaultChecked={ProfileUser.gender === "men" ? true : false}
                          disabled={statusEdit === true ? false : true}
                        />
                        <label className="ms-3 form-check-label my-auto" htmlFor="men">
                          Men
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          value="women"
                          onChange={handleChange}
                          name="gender"
                          className="form-check-input "
                          id="women"
                          // defaultChecked={

                          //   ProfileUser.gender == null || ProfileUser.gender == undefined ? false : (ProfileUser.gender == "women" ? true : false)

                          // }
                          // defaultChecked={ProfileUser.gender !== null || ProfileUser.gender !== undefined ? (ProfileUser.gender === "women" ? true : false) : false}
                          // defaultChecked={(ProfileUser.gender !== null || ProfileUser.gender !== undefined ) &&  ProfileUser.gender === "women" ? true : false}
                          // defaultChecked={ProfileUser.gender === "women" || ( undefined )? true : false}
                          disabled={statusEdit === true ? false : true}
                        />
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
                      defaultValue={data.phone === undefined ? ProfileUser.phone : data.phone}
                      disabled={statusEdit === true ? false : true}
                    />
                  </div>

                  <div className="col-12 d-flex justify-content-start my-3">
                    <div className="col-5 d-flex justify-content-start ">
                      <label className="fs-6 text-muted form-label my-auto ms-2">Date of Birth</label>
                    </div>

                    {/* <input className="form-control" type="date" id="start" name="date_of_birth" min="1920-01-01" max="2050-12-12" /> */}
                    <input
                      className="form-control "
                      type="date"
                      id="date_of_birth"
                      name="date_of_birth"
                      defaultValue={data.date_of_birth === undefined ? ProfileUser.date_of_birth : data.date_of_birth}
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
                      defaultValue={data.job_desk === undefined ? ProfileUser.job_desk : data.job_desk}
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
                      defaultValue={data.domicile === undefined ? ProfileUser.domicile : data.domicile}
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
                      defaultValue={data.location === undefined ? ProfileUser.location : data.location}
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
                      defaultValue={data.description === undefined ? ProfileUser.description : data.description}
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
};

export default UsersTabProfile;

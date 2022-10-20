import { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { postRecruiterJobPostJob } from "../../app/redux/Slice/RecruiterJobPostJobSlice";

import { getSkill } from "../../app/redux/Slice/Skill";

// import PreLoader from "../../components/PreLoader";

import Select from "react-select";
import { toast } from "react-toastify";

const RecruiterTabJobCreateJob = ({ id }) => {
  
  const dispatch = useDispatch();

  const dispatchGetSkill = async () => {
    await dispatch(getSkill()).unwrap().then();
  };

  const { Skill } = useSelector((state) => state.Skill);

  const [dataSkillValueId, setDataSkillValueId] = useState([]);
  const [dataSkillValueName, setDataSkillValueName] = useState([]);

  const [dataSkillIdReady, setDataSkillIdReady] = useState([]);
  const [dataSkillNameReady, setDataSkillNameReady] = useState([]);

  const handleSetSkillValueIdReady = () => {
    const foundSkillId = dataSkillNameReady.find((e) => e == dataSkillValueName);
    if (!foundSkillId) {
      setDataSkillIdReady((arr) => [...arr, `${dataSkillValueId}`]);
    }
  };

  const handleSetSkillValueNameReady = () => {
    const foundSkillName = dataSkillNameReady.find((e) => e == dataSkillValueName);
    if (foundSkillName) {
      toast.warning(`Skill ${dataSkillValueName} already added`, { toastId: "errorAddSkillJob" });
    } else {
      setDataSkillNameReady((arr) => [...arr, `${dataSkillValueName}`]);
    }
  };

  const handleDeleteSkillValueIdReady = (index) => {
    setDataSkillIdReady([...dataSkillIdReady.slice(0, index), ...dataSkillIdReady.slice(index + 1)]);
  };

  const handleDeleteSkillValueNameReady = (index) => {
    setDataSkillNameReady([...dataSkillNameReady.slice(0, index), ...dataSkillNameReady.slice(index + 1)]);
  };

  const [data, setData] = useState({
    name: "",
    position: "",
    system: "",
    type: "",
    description: "",
    available: "",
    skill_list: dataSkillIdReady,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    // console.log(data);
  };

  const handleCreate = async (e) => {
    await e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("position", data.position);
    formData.append("system", data.system);
    formData.append("type", data.type);
    formData.append("description", data.description);
    formData.append("available", data.available);
    formData.append("skill_list", dataSkillIdReady);
    formData.append("recruiter_id", id);

    await dispatch(postRecruiterJobPostJob(formData)).unwrap().then();

    // const createProductSellerPage = async () => {
    //   await axios
    //   .post(process.env.REACT_APP_API_BACKEND + "product/" , formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     // console.log(res);
    //     toast.success("Save Product Success", { autoClose: 2500 });
    //     // alert("product update");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.warning(err.response.data.message, { autoClose: 2500 });
    //     // alert(err);
    //   });
    // };
    // createProductSellerPage();
  };

  useEffect(() => {
    dispatchGetSkill();
  }, [dispatch]);

  return (
    <Fragment>
      <div className="tab-pane fade" id="v-pills-create-job" role="tabpanel" aria-labelledby="v-pills-create-job-tab" data-toggle="button">
        <div className="container-fluid">
          <div className="col-12 justify-content-start">
            <div className="col-12 d-flex justify-content-between">
              <h4 className="modal-title fw-bold " id="modalProfileLabel">
                Create a Job
              </h4>
            </div>
            <div className="col-12 d-flex justify-content-between"></div>
            <hr />
            <div className="">
              <form onSubmit={handleCreate}>
                <div className="container-fluid">
                  <div className="col-12 justify-content-start mt-1 mb-4">
                    <div className="col-12 d-flex justify-content-between my-3">
                      <label className="fs-6 text-muted form-label my-auto">ID :</label>
                      <label className="fs-6 text-muted form-label my-auto">Automatic by System</label>
                    </div>
                    <hr />

                    <div className="col-12 justify-content-start my-3">
                      <label htmlFor="name" className="fs-6 text-muted form-label my-auto">
                        Name Job
                      </label>
                      <input id="name" type="text" name="name" className="form-control" placeholder="Name Job" onChange={handleChange} defaultValue={data.name} />
                    </div>
                    <hr />

                    <div className="col-12 justify-content-start my-3">
                      <label htmlFor="position" className="fs-6 text-muted form-label my-auto">
                        Position Job
                      </label>

                      <input id="position" type="text" name="position" className="form-control" placeholder="Position Job" onChange={handleChange} defaultValue={data.brand} />
                    </div>
                    <hr />

                    <div className="col-12 justify-content-start my-3">
                      <label htmlFor="skill" className="fs-6 text-muted form-label my-auto">
                        Skill Job
                      </label>
                      <div className="d-flex ">
                        <Select
                          className="col-10"
                          name="skill_list"
                          placeholder="Search Skill"
                          isSearchable={true}
                          options={Skill}
                          getOptionLabel={(e) => e.name}
                          getOptionValue={(e) => e.id}
                          // defaultValue={tags}
                          onChange={(e) => {
                            setDataSkillValueName(e.name);
                            setDataSkillValueId(e.id);
                          }}
                        />
                        <div className="col-2 d-grid px-2">
                          <button
                            type="button"
                            className=" btn btn-success "
                            onClick={() => {
                              handleSetSkillValueIdReady();
                              handleSetSkillValueNameReady();
                            }}
                          >
                            Add Skill
                          </button>
                        </div>
                      </div>

                      <div className="container d-flex border border-1 rounded mt-3 py-2">
                        {dataSkillNameReady.map((item, index) => (
                          <div className="d-flex border border-1 mx-2 px-3 py-2" key={item}>
                            <span>{item}</span>
                            <p className="mx-2">Index : {index}</p>
                            <button
                              name={index}
                              type="button"
                              onClick={() => {
                                handleDeleteSkillValueIdReady(index);
                                handleDeleteSkillValueNameReady(index);
                              }}
                              className="btn btn-success"
                            >
                              x
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <hr />

                    {/* <div className="col-12 justify-content-start my-3 search-skill">
                      <div className="search">
                        <h1>Search</h1>

                        <Select
                          name="category_id"
                          placeholder="Category Product"
                          isSearchable={true}
                          options={Skill}
                          getOptionLabel={(e) => e.name}
                          getOptionValue={(e) => e.id}
                          // defaultValue={tags}
                          // onChange={(e) => setTags(e.id)}
                        />
                      </div>
                    </div>
                    <hr /> */}

                    <div className="col-12 my-3">
                      <label className="fs-6 text-muted form-label my-auto">System Work </label>
                      <div className="d-flex justify-content-center">
                        <div className="d-flex justify-content-center  mx-auto">
                          <input type="radio" defaultValue="on-site" onChange={handleChange} name="system" className="form-check-input" id="on-site" />
                          <label className="text-muted" htmlFor="on-site">
                            &nbsp;On Site
                          </label>
                        </div>
                        <div className="d-flex justify-content-center  mx-auto">
                          <input type="radio" defaultValue="remote" onChange={handleChange} name="system" className="form-check-input" id="remote" />
                          <label className="text-muted" htmlFor="remote">
                            &nbsp; Remote
                          </label>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="col-12 my-3">
                      <label className="fs-6 text-muted form-label my-auto">Type Job</label>
                      <div className="d-flex justify-content-center">
                        <div className="d-flex justify-content-center  mx-auto">
                          <input type="radio" defaultValue="full-time" onChange={handleChange} name="type" className="form-check-input" id="full-time" />
                          <label className="text-muted" htmlFor="full-time">
                            &nbsp; Full Time
                          </label>
                        </div>
                        <div className="d-flex justify-content-center  mx-auto">
                          <input type="radio" defaultValue="part-time" onChange={handleChange} name="type" className="form-check-input" id="part-time" />
                          <label className="text-muted" htmlFor="part-time">
                            &nbsp; Part Time
                          </label>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="col-12 my-3">
                      <label className="fs-6 text-muted form-label my-auto">Available Job</label>

                      <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-center  mx-auto">
                          <input type="radio" defaultValue="on" onChange={handleChange} name="available" className="form-check-input" id="on" />

                          <label className="text-muted" htmlFor="on">
                            &nbsp; On
                          </label>
                        </div>
                        <div className="d-flex justify-content-center mx-auto">
                          <input type="radio" defaultValue="off" onChange={handleChange} name="available" className="form-check-input" id="off" />
                          <label className="text-muted" htmlFor="off">
                            &nbsp;Off
                          </label>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div className="col-12 my-3  ">
                      <label htmlFor="product_description" className="fs-6 text-muted form-label">
                        Description Job
                      </label>
                      <textarea className="form-control" id="product_description" rows="5" name="description" placeholder="Product Description" onChange={handleChange} defaultValue={data.description}></textarea>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-center my-3">
                    <button
                      type="submit"
                      className="btn btn-success  px-5"
                      // data-bs-toggle="pill"
                      // data-bs-target="#v-pills-product"
                      // role="tab"
                      //         aria-controls="v-pills-product"
                      //         aria-selected="true"
                      // onClick={() => {
                      //   setTimeout(() => {
                      //     setNewPhoto();
                      //     setPreview();
                      //   }, 1500);

                      // }}
                    >
                      Publish Job
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RecruiterTabJobCreateJob;

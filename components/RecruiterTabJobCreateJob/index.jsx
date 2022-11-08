import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { postRecruiterJobPostJob } from "../../app/redux/Slice/RecruiterJobPostJobSlice";

import Select from "react-select";
import { getJobSearch } from "../../app/redux/Slice/JobSearchSlice";
const RecruiterTabJobCreateJob = ({ token, refreshToken, id, Skill }) => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    position: "",
    system: "",
    type: "",
    description: "",
    available: "on",
    min_salary: "",
    max_salary: "",
    experience_time: "",
    recruiter_id: id,
    skill_id: [],
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(data)

  const handleCreate = async (e) => {
    const valueSearch = `search={"job.recruiter_id":"${id}"}&sortby=created_on&sort=desc&page=1&limit=10`;
    await e.preventDefault();

    await dispatch(postRecruiterJobPostJob({ token, refreshToken, data }))
      .unwrap()
      .then(() => {
        dispatch(getJobSearch(valueSearch));
        document.getElementById("FormCreateJob").reset();
        setSelect(null)
      });
  };

  const handleSkill = (e) => {
    setData({
      ...data,
      skill_id: e,
    });
  };

  const [select, setSelect] = useState(null);


  return (
    <Fragment>
      <div className="container-fluid">
        <div className="col-12 justify-content-start">
          <div className="col-12 d-flex justify-content-between">
            <h4 className="modal-title fw-bold " id="modalProfileLabel">
              Create a Job
            </h4>
          </div>
          <div className="col-12 d-flex justify-content-between"></div>
          <hr />
          
              <div className="container-fluid"> 
               <form id="FormCreateJob" onSubmit={handleCreate}>
                <div className="col-12 justify-content-start mt-1 mb-4">
                  <div className="col-12 d-flex justify-content-between my-3">
                    <label className="fs-6 text-muted form-label my-auto">ID :</label>
                    <label className="fs-6 text-muted form-label my-auto">Automatic by System</label>
                  </div>
                  <hr />

                  <div className="col-12 d-flex my-3">
                    <label htmlFor="name" className="col-2 fs-6 text-muted form-label my-auto">
                      Job :
                    </label>
                    <input id="name" type="text" name="name" className="form-control" placeholder="Name Job" onChange={handleChange} defaultValue={data.name} />
                  </div>
                  <hr />

                  <div className="d-flex col-12 my-3">
                    <label htmlFor="position" className="col-2 fs-6 text-muted form-label my-auto">
                      Position Job :
                    </label>
                    <input id="position" type="text" name="position" className="form-control" placeholder="Position Job" onChange={handleChange} defaultValue={data.position} />
                  </div>
                  <hr />

                  <div className="col-12 d-flex my-3">
                    <label htmlFor="skill" className="col-2 fs-6 text-muted form-label my-auto">
                      Skill Job :
                    </label>
                    <Select
                      id="long-value-select"
                      instanceId="long-value-select"
                      className="col-10"
                      name="skill_id"
                      placeholder="Search Skill"
                      isSearchable={true}
                      options={Skill}
                      getOptionLabel={(e) => e.name}
                      getOptionValue={(e) => e.id}
                      isMulti
                      onChange={(e) => {
                        handleSkill(e.map((item) => item.id));
                      }}
                      DefaultValues={select}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: "0.375rem",
                        colors: {
                          ...theme.colors,
                          primary25: "#e9ecef",
                          primary: "var(--bs-success)",
                          neutral90: "white",
                        },
                      })}
                    />
                  </div>
                  <hr />

                  <div className="col-12 my-3 d-flex ">
                    <label className="col-2 fs-6 text-muted form-label my-auto">System Job :</label>
                    <div className="col-10 d-flex justify-content-center my-auto">
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
                  <div className="col-12 my-3 d-flex  ">
                    <label className="col-2 fs-6 text-muted form-label my-auto">Type Job :</label>
                    <div className="col-10 d-flex justify-content-center my-auto">
                      <div className="d-flex justify-content-center  mx-auto">
                        <input type="radio" defaultValue="internship" onChange={handleChange} name="type" className="form-check-input" id="internship" />
                        <label className="text-muted" htmlFor="full-time">
                          &nbsp; Internship
                        </label>
                      </div>
                      <div className="d-flex justify-content-center  mx-auto">
                        <input type="radio" defaultValue="full-time" onChange={handleChange} name="type" className="form-check-input" id="part-time" />
                        <label className="text-muted" htmlFor="part-time">
                          &nbsp; Full-Time
                        </label>
                      </div>
                      <div className="d-flex justify-content-center  mx-auto">
                        <input type="radio" defaultValue="part-time" onChange={handleChange} name="type" className="form-check-input" id="part-time" />
                        <label className="text-muted" htmlFor="part-time">
                          &nbsp; Part-Time
                        </label>
                      </div>
                      <div className="d-flex justify-content-center  mx-auto">
                        <input type="radio" defaultValue="freelance" onChange={handleChange} name="type" className="form-check-input" id="freelance" />
                        <label className="text-muted" htmlFor="part-time">
                          &nbsp; Freelance
                        </label>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="col-12 my-3 d-flex justify-content-start align-items-start">
                    <label className="col-2 fs-6 text-muted form-label ">Experience Time Job :</label>
                    <div className="col-10 my-auto">
                      <div className="col-12 d-flex ps-2">
                        <div className="col-6 d-flex justify-content-start ">
                          <input type="radio" defaultValue="0" onChange={handleChange} name="experience_time" className="form-check-input" id="experience_time_0_0" />
                          <label className="text-muted" htmlFor="experience_time_0_0">
                            &nbsp; No Experience
                          </label>
                        </div>
                        <div className="col-6 d-flex justify-content-start ">
                          <input type="radio" defaultValue="8765" onChange={handleChange} name="experience_time" className="form-check-input" id="experience_time_0_1" />
                          <label className="text-muted " htmlFor="experience_time_0_1">
                            &nbsp; Under 1 Years
                          </label>
                        </div>
                      </div>
                      <div className="d-flex ps-2">
                        <div className="col-6 d-flex justify-content-start  ">
                          <input type="radio" defaultValue="26297" onChange={handleChange} name="experience_time" className="form-check-input" id="experience_time_1_3" />
                          <label className="text-muted" htmlFor="experience_time_1_3">
                            &nbsp; 1 - 3 Years
                          </label>
                        </div>
                        <div className="col-6 d-flex justify-content-start  ">
                          <input type="radio" defaultValue="43829" onChange={handleChange} name="experience_time" className="form-check-input" id="experience_time_3_5" />
                          <label className="text-muted" htmlFor="experience_time_3_5">
                            &nbsp; 3 - 5 Years
                          </label>
                        </div>
                      </div>
                      <div className="d-flex ps-2">
                        <div className="col-6 d-flex justify-content-start  ">
                          <input type="radio" defaultValue="87659" onChange={handleChange} name="experience_time" className="form-check-input" id="experience_time_5_10" />
                          <label className="text-muted" htmlFor="experience_time_5_10">
                            &nbsp; 5 - 10 Years
                          </label>
                        </div>
                        <div className="col-6 d-flex justify-content-start ">
                          <input type="radio" defaultValue="87661" onChange={handleChange} name="experience_time" className="form-check-input" id="experience_time_10_U" />
                          <label className="text-muted" htmlFor="experience_time_10_U">
                            &nbsp; More than 10 Years
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="col-12 d-flex my-3">
                    <label className="col-2 fs-6 text-muted form-label my-auto">Min/Max Salary :</label>
                    <input id="min_salary" type="text" name="min_salary" className="form-control me-1 my-auto" placeholder="Minimum Salary" onChange={handleChange} defaultValue={data.min_salary} />
                    <span className=" fs-6 text-muted form-label my-auto">-</span>
                    <input id="max_salary" type="text" name="max_salary" className="form-control ms-1  my-auto" placeholder="Maximum Salary" onChange={handleChange} defaultValue={data.max_salary} />
                  </div>

                  <div className="col-12 my-3  ">
                    <label htmlFor="job_description" className="fs-6 text-muted form-label">
                      Description Job
                    </label>
                    
                    <textarea className="form-control" id="job_description" rows="5" name="description" placeholder="Description Job" onChange={handleChange} defaultValue={data.description}></textarea>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center my-3">
                  <button type="submit" className="btn btn-success  px-5">
                    Publish Job
                  </button>
                </div> </form>
              </div>
           
        </div>
      </div>
    </Fragment>
  );
};

export default RecruiterTabJobCreateJob;

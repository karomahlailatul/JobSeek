import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putRecruiterJobPutJob } from "../../app/redux/Slice/RecruiterJobPutJobSlice";
import PreLoaderComponent from "../PreLoaderComponent";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getJobSearch } from "../../app/redux/Slice/JobSearchSlice";

const RecruiterTabJobEditJob = ({
  token,
  refreshToken,
  // role, 
  id,
  Skill,
  idJob,
  // setIdJob,
  setShowMyJob,
}) => {
  const dispatch = useDispatch();

  const { JobSearch } = useSelector((state) => state.JobSearch);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [listSkillId, setListSkillId] = useState([]);

  useEffect(() => {
    JobSearch.map(async (item) => {
      if (item.id == idJob) {
        const dataSkill = [];

        await item.skill_id.map(async (e) => {
          await Skill.map((u, i) => {
            if (u.id == e) {
              dataSkill.push(i);
            }
          });
        });

        setData(item);
        setIsLoading(false);
        setListSkillId(dataSkill);
        window.scrollTo(0, 0);
      }
    });
  }, [idJob]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    const valueSearch = `search={"job.recruiter_id":"${id}"}&sortby=created_on&sort=desc&page=1&limit=10`
    await e.preventDefault();
    await dispatch(putRecruiterJobPutJob({ token, refreshToken, idJob, data }))
    .unwrap()
    .then(() => dispatch(getJobSearch(valueSearch)));
  };

  const handleSkill = (e) => {
    setData({
      ...data,
      skill_id: e,
    });
  };

  // console.log(data);

  return (
    <Fragment>
      {isLoading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          // style={{ height: `${heightJob}px` }}
        >
          <PreLoaderComponent isLoading={isLoading} />
        </div>
      ) : (
        <div className="container-fluid">
          <div className="col-12 justify-content-start">
            <div className="col-12 d-flex justify-content-between">
              <h4 className="modal-title fw-bold " id="modalProfileLabel">
                Edit a Job
              </h4>
              <button
                className="btn btn-success px-4"
                onClick={() => {
                  setShowMyJob(true);
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span className="ps-2">Back</span>
              </button>
            </div>
            <div className="col-12 d-flex justify-content-between"></div>
            <hr />
            <div className="">
              <form onSubmit={handleEdit}>
                <div className="container-fluid">
                  <div className="col-12 justify-content-start mt-1 mb-4">
                    <div className="col-12 d-flex justify-content-between my-3">
                      <label className="fs-6 text-muted form-label my-auto">ID :</label>
                      <label className="fs-6 text-muted form-label my-auto">{idJob}</label>
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
                        name="skill_list"
                        placeholder="Search Skill"
                        isSearchable={true}
                        options={Skill}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id}
                        isMulti
                        defaultValue={listSkillId?.map((x) => Skill[x])}
                        onChange={(e) => {
                          handleSkill(e.map((item) => item.id));
                        }}
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
                          <input type="radio" defaultValue="on-site" onChange={handleChange} name="system" className="form-check-input" id="on-site" checked={data?.system == "on-site" ? true : false} />
                          <label className="text-muted" htmlFor="on-site">
                            &nbsp;On Site
                          </label>
                        </div>
                        <div className="d-flex justify-content-center  mx-auto">
                          <input type="radio" defaultValue="remote" onChange={handleChange} name="system" className="form-check-input" id="remote" checked={data?.system == "remote" ? true : false} />
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
                          <input type="radio" defaultValue="internship" onChange={handleChange} name="type" className="form-check-input" id="internship" checked={data?.type == "internship"} />
                          <label className="text-muted" htmlFor="full-time">
                            &nbsp; Internship
                          </label>
                        </div>
                        <div className="d-flex justify-content-center  mx-auto">
                          <input type="radio" defaultValue="full-time" onChange={handleChange} name="type" className="form-check-input" id="part-time" checked={data?.type == "full-time"} />
                          <label className="text-muted" htmlFor="part-time">
                            &nbsp; Full-Time
                          </label>
                        </div>
                        <div className="d-flex justify-content-center  mx-auto">
                          <input type="radio" defaultValue="part-time" onChange={handleChange} name="type" className="form-check-input" id="part-time" checked={data?.type == "part-time"} />
                          <label className="text-muted" htmlFor="part-time">
                            &nbsp; Part-Time
                          </label>
                        </div>
                        <div className="d-flex justify-content-center  mx-auto">
                          <input type="radio" defaultValue="freelance" onChange={handleChange} name="type" className="form-check-input" id="freelance" checked={data?.type == "freelance"} />
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
                            <input type="radio" defaultValue="0" onChange={handleChange} name="experience_time" className="form-check-input" id="experience_time_0_0" checked={data?.experience_time == "0"} />
                            <label className="text-muted" htmlFor="experience_time_0_0">
                              &nbsp; No Experience
                            </label>
                          </div>
                          <div className="col-6 d-flex justify-content-start ">
                            <input type="radio" defaultValue="8765" onChange={handleChange} name="experience_time" className="form-check-input" id="experience_time_0_1" checked={data?.experience_time == "8765"} />
                            <label className="text-muted " htmlFor="experience_time_0_1">
                              &nbsp; Under 1 Years
                            </label>
                          </div>
                        </div>
                        <div className="d-flex ps-2">
                          <div className="col-6 d-flex justify-content-start  ">
                            <input type="radio" defaultValue="26297" onChange={handleChange} name="experience_time" className="form-check-input" id="experience_time_1_3" checked={data?.experience_time == "26297"} />
                            <label className="text-muted" htmlFor="experience_time_1_3">
                              &nbsp; 1 - 3 Years
                            </label>
                          </div>
                          <div className="col-6 d-flex justify-content-start  ">
                            <input type="radio" defaultValue="43829" onChange={handleChange} name="experience_time" className="form-check-input" id="experience_time_3_5" checked={data?.experience_time == "43829"} />
                            <label className="text-muted" htmlFor="experience_time_3_5">
                              &nbsp; 3 - 5 Years
                            </label>
                          </div>
                        </div>
                        <div className="d-flex ps-2">
                          <div className="col-6 d-flex justify-content-start  ">
                            <input type="radio" defaultValue="87659" onChange={handleChange} name="experience_time" className="form-check-input" id="experience_time_5_10" checked={data?.experience_time == "87659"} />
                            <label className="text-muted" htmlFor="experience_time_5_10">
                              &nbsp; 5 - 10 Years
                            </label>
                          </div>
                          <div className="col-6 d-flex justify-content-start ">
                            <input type="radio" defaultValue="87661" onChange={handleChange} name="experience_time" className="form-check-input" id="experience_time_10_U" checked={data?.experience_time == "87661"} />
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
                    <hr />
                    <div className="col-12 my-3 d-flex">
                      <label className="col-2 fs-6 text-muted form-label my-auto">Available Job : </label>

                      <div className="col-10 d-flex justify-content-between">
                        <div className="d-flex justify-content-center  mx-auto">
                          <input type="radio" defaultValue="on" onChange={handleChange} name="available" className="form-check-input" id="on" checked={data?.available == "on"} />
                          <label className="text-muted" htmlFor="on">
                            &nbsp; On
                          </label>
                        </div>
                        <div className="d-flex justify-content-center mx-auto">
                          <input type="radio" defaultValue="off" onChange={handleChange} name="available" className="form-check-input" id="off" checked={data?.available == "off"} />
                          <label className="text-muted" htmlFor="off">
                            &nbsp;Off
                          </label>
                        </div>
                      </div>
                    </div>
                    <hr />

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
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default RecruiterTabJobEditJob;

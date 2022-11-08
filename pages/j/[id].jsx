import {
  Fragment,
  // useEffect,
  useState,
} from "react";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import { getJobDetails } from "../../app/redux/Slice/JobDetailsSlice";
// import { toast } from "react-toastify";
// import PreLoader from "../../components/PreLoader";
import { wrapper } from "../../app/redux/store";
import Image from "next/image";

import useWindowSize from "../../components/WindowsSize";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
// import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
// import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getJobSearch } from "../../app/redux/Slice/JobSearchSlice";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { postJobApplyPost } from "../../app/redux/Slice/JobApplyPostSlice";
import { getJobApplyByJob } from "../../app/redux/Slice/JobApplyGetByJobSlice";
import { useEffect } from "react";
export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const jobId = ctx?.query?.id || null;
  await store.dispatch(getJobDetails(jobId));
  await store.dispatch(getJobApplyByJob(jobId));
  // console.log(store.getState().JobDetails.JobDetails);
  const JobDetails = await store.getState().JobDetails.JobDetails || []
  const isLoading = await store.getState().JobDetails.isLoading || []
  const JobApplyByJob = await store.getState().JobApplyGetByJob.JobApplyByJob || []

  const id = ctx?.req?.cookies?.id || null;
  const token = ctx?.req?.cookies?.token || null;
  const refreshToken = ctx?.req?.cookies?.refreshToken || null;
  const role = ctx?.req?.cookies?.role || null;
  // const lockCredential = ctx?.req?.cookies?.lockCredential || null;

  // if (id && token && refreshToken && role && lockCredential) {
  //   // if ( role != "recruiter") {
  //   //   return {
  //   //     redirect: {
  //   //       destination: "/sign-in",
  //   //       permanent: false,
  //   //     },
  //   //   };
  //   // }

  const {
    // id,
    // name,
    position,
    // system,
    // type,
    // description,
    // min_salary,
    // max_salary,
    // count_apply,
    // experience_time,
    // available,
    recruiter_id,
    // promotion_until,
    // created_on,
    // updated_on,
    // recruiter_users_id,
    // recruiter_position,
    // recruiter_company,
    // recruiter_email,
    // recruiter_address,
    // recruiter_logo,
    // recruiter_phone,
    // recruiter_description,
    // users_name,
    // users_email,
    // users_gender,
    // users_phone,
    // users_date_of_birth,
    // users_picture,
    // users_job_desk,
    // users_domicile,
    // users_location,
    // users_description,
    // users_created_on,
    // skill_id,
    // skill_name,
  } = JobDetails;

  const dataArraySearchParam = [
    `search={"job.position":"${position}"}&limit=3`,
    `search={"job.recruiter_id":"${recruiter_id}"}&limit=3`,
    // `search={"job.name":"${name}"}&limit=3`
  ];

  let valueSenderSearch = dataArraySearchParam[Math.floor(Math.random() * dataArraySearchParam.length)];
  await store.dispatch(getJobSearch(valueSenderSearch));
  const JobSearchFamiliar = await store.getState().JobSearch.JobSearch;

  return {
    props: {
      JobDetails: JobDetails,
      isLoading: isLoading,
      JobSearchFamiliar: JobSearchFamiliar,
      token: token,
      refreshToken: refreshToken,
      role: role,
      userId: id,
      JobApplyByJob: JobApplyByJob,
    },
  };
});

const JobDetails = ({
  JobDetails,
  // isLoading,
  JobSearchFamiliar,
  userId,
  token,
  refreshToken,
  role,
  JobApplyByJob,
}) => {
  const {
    id,
    name,
    position,
    system,
    type,
    description,
    min_salary,
    max_salary,
    count_apply,
    experience_time,
    // available,
    // recruiter_id,
    // promotion_until,
    created_on,
    updated_on,
    recruiter_users_id,
    // recruiter_position,
    recruiter_company,
    // recruiter_email,
    recruiter_address,
    recruiter_logo,
    // recruiter_phone,
    // recruiter_description,
    // users_name,
    // users_email,
    // users_gender,
    // users_phone,
    // users_date_of_birth,
    // users_picture,
    // users_job_desk,
    // users_domicile,
    // users_location,
    // users_description,
    // users_created_on,
    // skill_id,
    skill_name,
  } = JobDetails;

  console.log(JobApplyByJob);
  const size = useWindowSize();

  const dispatch = useDispatch();
  const router = useRouter();

  const dayConvert = (duration) => {
    var d = moment.duration(duration, "milliseconds");
    var day = Math.floor(d.asDays());
    var hours = Math.floor(d.asHours());
    var mins = Math.floor(d.asMinutes()) - hours * 60;
    if (day >= 1 && hours >= 24) {
      return `${day} days ago`;
    }
    if (hours < 24) {
      return `${hours} hours ago`;
    }
    if (mins < 60 && hours < 1) {
      return `${mins} minutes ago`;
    }
  };

  const [
    data,
    // setData
  ] = useState({
    job_id: id,
    users_id: userId,
    status: "prepared",
    message: "waiting approve recruiter",
  });

  const handleSubmit = () => {
    if ((token, refreshToken, role)) {
      dispatch(postJobApplyPost({ token, refreshToken, data }));
      // toast.success("before Apply Job, Please Sign in/Sign Up", { toastId: "errorNoSign" });
    } else {
      toast.success("before Apply Job, Please Sign in/Sign Up", { toastId: "errorNoSign" });
      router.push("/sign-in");
    }
  };

  const [dataIncludeApplyJob, setDataIncludeApplyJob] = useState(false);

  // console.log(

  useEffect(() => {
    JobApplyByJob.map((e) => (e.users_id == userId ? setDataIncludeApplyJob(true) : null));
  }, [JobApplyByJob]);

  return (
    <Fragment>
      <div className="container-xl container-lg container-md-fluid container-sm-fluid d-xl-flex  d-lg-flex  d-md-grid  d-sm-grid" style={{ minHeight: `${size.height - 381}px` }}>
        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
          <div className="px-3 py-3 border rounded">
            <div className="d-flex">
              <div className="col-2 d-flex align-items-start justify-content-center ">
                {recruiter_logo ? (
                  <Image src={recruiter_logo} width="90px" height="90px" className="col-3 rounded-img border" alt="" />
                ) : (
                  <div className="d-flex align-items-center justify-content-center" style={{ width: "90px", height: "90px", borderRadius: "50%", backgroundColor: "grey" }}>
                    <FontAwesomeIcon icon={faStore} style={{ color: "white", fontSize: "50px" }} />
                  </div>
                )}
              </div>
              <div className="col-10 d-grid align-items-center">
                <h5 className="fw-bold my-0"> {name} </h5>
                <span className="fw-bold text-success  my-0  ">
                  <small>{recruiter_company}</small>
                </span>

                <hr className="mb-0 mt-2" />
                <div className="col-12 justify-content-start my-2">
                  <span className="d-flex">
                    <FontAwesomeIcon icon={faSuitcase} className="text-secondary  my-auto " />
                    <p className=" text-secondary my-auto ps-2">Position :</p>
                    <p className="text-secondary my-auto ps-2">{position}</p>
                  </span>
                  <span className="d-flex">
                    <FontAwesomeIcon icon={faBusinessTime} className="text-secondary my-auto" />
                    <p className=" text-secondary my-auto ps-2">Type/System :</p>
                    <p className=" text-secondary text-capitalize my-auto ps-2">{`${type}/${system}`}</p>
                  </span>
                </div>
                <hr className="my-0" />
                <div className="col-12 justify-content-start my-2">
                  <span className="d-flex">
                    <FontAwesomeIcon icon={faUserTie} className="text-secondary  my-auto " />
                    <p className=" text-secondary my-auto ps-2">Experience Time : </p>
                    {experience_time == 0 ? <p className="text-secondary my-auto ps-2">No Experience</p> : null}
                    {experience_time == 8765 ? <p className="text-secondary my-auto ps-2">Under 1 Years</p> : null}
                    {experience_time == 26297 ? <p className="text-secondary my-auto ps-2">1 - 3 Years</p> : null}
                    {experience_time == 43829 ? <p className="text-secondary my-auto ps-2">3 - 5 Years</p> : null}
                    {experience_time == 87659 ? <p className="text-secondary my-auto ps-2">5 - 10 Years</p> : null}
                    {experience_time == 87661 ? <p className="text-secondary my-auto ps-2">More than 10 Years</p> : null}
                  </span>
                </div>
                <hr className="my-0" />

                <div className="d-grid my-2">
                  <span className="col-4 text-secondary">
                    <FontAwesomeIcon icon={faLocationDot} className=" my-auto" />
                    <span className="my-auto ps-2">{recruiter_address ? recruiter_address : "Office does not exist"}</span>
                  </span>
                  <span className="col-4 text-secondary">
                    <FontAwesomeIcon icon={faHandHoldingDollar} className=" my-auto" />
                    <span className="my-auto ps-2">{min_salary ? (max_salary ? `${min_salary} - ${max_salary}/month` : "Hidden by company") : "Hidden by company"}</span>
                  </span>
                  <span className="col-4 text-secondary">
                    <FontAwesomeIcon icon={faLightbulb} className=" my-auto" />
                    <span className="my-auto ps-2">{`${count_apply} People Apply`}</span>
                  </span>
                </div>

                <hr className="my-0" />
                <div className="d-flex my-2">
                  <small className="col-12 d-flex ">
                    <span className="col-6 d-flex justify-content-start text-success ">
                      <FontAwesomeIcon icon={faClock} className="my-auto my-0" />
                      <span className="my-auto ps-2">Created at {dayConvert(parseInt(moment.utc().valueOf()) - parseInt(moment.utc(created_on).valueOf()))}</span>
                      {/* <span className="my-auto ps-1">Updated {dayConvert(parseInt(moment().valueOf()) - parseInt(moment(item.updated_on).valueOf()))}</span> */}
                    </span>
                    <span className="col-6 d-flex justify-content-start text-success ">
                      <FontAwesomeIcon icon={faClockRotateLeft} className="my-auto my-0" />
                      <span className="my-auto ps-2">Updated {dayConvert(parseInt(moment.utc().valueOf()) - parseInt(moment.utc(updated_on).valueOf()))}</span>
                      {/* <span className="my-auto ps-1">Updated {dayConvert(parseInt(moment().valueOf()) - parseInt(moment(item.updated_on).valueOf()))}</span> */}
                    </span>
                  </small>
                </div>

                <div className="d-flex col-12 my-2">
                  <div className="d-flex">
                    {dataIncludeApplyJob ? (
                      <Fragment>
                        <hr className="my-0" />
                        <button className=" btn btn-success px-5" disabled onClick={handleSubmit}>
                          <FontAwesomeIcon icon={faCircleDown} className=" my-auto" />
                          <span className="my-auto ps-2">You&apos;re Already Applied this Job</span>
                        </button>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <hr className="my-0" />
                        <button className=" btn btn-success px-5" disabled={recruiter_users_id == userId} onClick={handleSubmit}>
                          <FontAwesomeIcon icon={faCircleDown} className=" my-auto" />
                          <span className="my-auto ps-2">{recruiter_users_id == userId ? `You're Owned this Job` : `Apply Job`}</span>
                        </button>
                      </Fragment>
                    )}
                  </div>
                  {/* <div className="d-flex ps-3">
                  <button className=" btn btn-outline-success" disabled={recruiter_users_id == userId }>
                    <FontAwesomeIcon icon={faBookmark} className=" my-auto" />
                    <span className="my-auto ps-2">Save Job</span>
                  </button>
                </div> */}
                </div>
              </div>
            </div>
            <hr className="w-100 my-0" />
            <div className="col-12 my-2">
              <span className="fw-bold">Skills Required :</span>
              <div className=" row d-flex container pt-2 pb-1">
                {skill_name.map((item, index) => (
                  <Fragment key={index}>
                    <button className="col fw-bold rounded-pill ms-2 mb-1 border text-muted" disabled type="button">
                      {item}
                    </button>
                  </Fragment>
                ))}
              </div>
            </div>
            <hr className="w-100 my-0" />
            <div className="col-12 my-2 ">
              <span className="fw-bold">Description :</span>
              <p className="">{description}</p>
            </div>
            {/* <hr className="w-100 my-0" /> */}
          </div>
        </div>

        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ps-xl-3 ps-lg-3 ps-md-0 ps-sm-0 pt-xl-0 pt-lg-0 pt-md-5 pt-sm-5">
          <label className="fw-bold fs-5">Recommended Job </label>
          {JobSearchFamiliar.map((item) => (
            <Fragment key={item.id}>
              <div className="d-flex col-xl-12 col-lg-12 col-md-12 col-sm-12 my-2 pointer-button" key={item.id}>
                <Link className="text-decoration-none " href={`/j/${item.id}`}>
                  <Card className="container-fluid col-12 border border-muted text-center rounded py-3 card-job align-items-center">
                    <div className="col-12 d-flex mb-3 container">
                      {/* <Image src={item.recruiter_logo == null ? "/assets/icons/ico-user.svg" : item.recruiter_logo} width="48px" height="48px" className="col-3 rounded-img" alt="" /> */}

                      {item.recruiter_logo ? (
                        <Image src={item.recruiter_logo} width="48px" height="48px" className="col-3 rounded-img border" alt="" />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "grey" }}>
                          <FontAwesomeIcon icon={faStore} style={{ color: "white", fontSize: "25px" }} />
                        </div>
                      )}

                      <div className="col-9 ps-3 text-start my-0">
                        <h5 className="text-dark fw-bold my-auto text-truncate">{item.name} </h5>
                        <h6 className="text-success my-auto text-truncate">
                          <small>{item.recruiter_company}</small>{" "}
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex row text-start ps-3">
                      <hr className="text-success w-100 my-0" />
                      <div className=" justify-content-start my-1">
                        <small>
                          <span className="d-flex">
                            <FontAwesomeIcon icon={faSuitcase} className="text-secondary col-1 my-auto" />
                            <p className="col-5 text-secondary my-auto ps-1">Position :</p>
                            <p className="col-6 text-secondary my-auto ps-1">{item.position}</p>
                          </span>

                          <span className="d-flex">
                            <FontAwesomeIcon icon={faSuitcase} className="text-secondary col-1 my-auto" />
                            <p className="col-5 text-secondary my-auto ps-1">Type/System :</p>
                            <p className="col-6 text-secondary text-capitalize my-auto  ps-1">{`${item.type}/${item.system}`}</p>
                          </span>
                        </small>
                      </div>

                      <hr className="text-success w-100 my-0 " />

                      <small className="d-grid my-1 ">
                        <span className="text-secondary">
                          <FontAwesomeIcon icon={faLocationDot} className="col-1 my-auto" />
                          <span className="my-auto ps-1">{item.recruiter_address ? item.recruiter_address : "Office does not exist"}</span>
                        </span>
                        <span className="text-secondary">
                          <FontAwesomeIcon icon={faHandHoldingDollar} className="col-1 my-auto" />
                          <span className="my-auto ps-1">{item.min_salary != "undefined" ? (item.max_salary != "undefined" ? `${item.min_salary} - ${item.max_salary}/month` : "Hidden by company") : "Hidden by company"}</span>{" "}
                        </span>
                        <span className="text-secondary">
                          <FontAwesomeIcon icon={faLightbulb} className="col-1 my-auto" />
                          <span className="my-auto ps-1">{`${item.count_apply} People Apply`}</span>
                        </span>
                      </small>

                      <hr className="text-success w-100 my-0" />

                      <small className="mt-2">
                        <span className="d-flex justify-content-end text-success text-right  ">
                          <FontAwesomeIcon icon={faClock} className="col-1 my-auto my-0" />
                          <span className="my-auto ps-1">Updated {dayConvert(parseInt(moment.utc().valueOf()) - parseInt(moment.utc(item.updated_on).valueOf()))}</span>
                          {/* <span className="my-auto ps-1">Updated {dayConvert(parseInt(moment().valueOf()) - parseInt(moment(item.updated_on).valueOf()))}</span> */}
                        </span>
                      </small>
                    </div>
                  </Card>
                </Link>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default JobDetails;

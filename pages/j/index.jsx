import { useState, useEffect, Fragment, useRef } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { getJobSearch } from "../../app/redux/Slice/JobSearchSlice";
import MyPagination from "../../components/Pagination";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import useWindowSize from "../../components/WindowsSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
// import PreLoader from "../../components/PreLoader";
import PreLoaderComponent from "../../components/PreLoaderComponent";
import Draggable from "react-draggable";
import Select from "react-select";
import { faBusinessTime } from "@fortawesome/free-solid-svg-icons";

const SearchRecipes = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [keywordParamSearch, setKeywordParamSearch] = useState(router.query.keyword);
  const [sortbyParamSearch, setSortbyParamSearch] = useState(router.query.sortby);
  const [sortParamSearch, setSortParamSearch] = useState(router.query.sort);
  const [pageParamSearch, setPageParamSearch] = useState(router.query.page);
  const [limitParamSearch, setLimitParamSearch] = useState(router.query.limit);
  useEffect(() => {
    setKeywordParamSearch(router.query.keyword);
    setSortbyParamSearch(router.query.sortby || "updated_on");
    setSortParamSearch(router.query.sort || "desc");
    setPageParamSearch(router.query.page || "1");
    setLimitParamSearch(router.query.limit || "12");
  }, [router]);

  // Filter search bu column table
  const [searchKey, setSearchKey] = useState();
  const [searchArray, setSearchArray] = useState({
    "job.available": "on",
  });
  const searchString = JSON.stringify(searchArray);

  useEffect(() => {
    if (keywordParamSearch && keywordParamSearch != searchKey) {
      setSearchArray(() => {
        return {
          ...searchArray,
          "job.name": keywordParamSearch,
        };
      });
      setSearchKey(keywordParamSearch);
    }
  }, [keywordParamSearch]);

  // filter sorting / limit / pages
  const [valueSearch, setValueSearch] = useState();
  useEffect(() => {
    if (sortbyParamSearch && sortParamSearch && pageParamSearch && limitParamSearch) {
      setValueSearch(`sortby=${sortbyParamSearch}&sort=${sortParamSearch}&page=${pageParamSearch}&limit=${limitParamSearch}`);
    }
  }, [sortbyParamSearch, sortParamSearch, pageParamSearch, limitParamSearch]);

  // const isLoading = true
  const {
    isLoading,
    JobSearch,
    // statusCode,
    pagination_currentPage,
    pagination_totalData,
    //  pagination_limit,
    pagination_totalPage,
  } = useSelector((state) => state.JobSearch);

  const dispatchGetJob = async () => {
    let searchString = `search=${JSON.stringify(searchArray)}&`;
    if (keywordParamSearch && searchArray.length != 0 && valueSearch) {
      if (searchString.includes(keywordParamSearch)) {
        let valueSenderSearch = searchString + valueSearch;
        return dispatch(getJobSearch(valueSenderSearch));
      }
    }
    if (!keywordParamSearch && searchArray.length != 0 && valueSearch) {
      let valueSenderSearch = searchString + valueSearch;
      return dispatch(getJobSearch(valueSenderSearch));
    }
    if (!keywordParamSearch && searchArray.length == 0 && valueSearch) {
      let valueSenderSearch = valueSearch;
      await dispatch(getJobSearch(valueSenderSearch)).unwrap();
    }
  };

  // seting up filter checkbox
  const handleChangeCheckBox = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    if (e.target.checked) {
      setSearchArray(() => {
        if (JSON.stringify(searchArray).includes(e.target.name)) {
          return {
            ...searchArray,
            [key]: [...searchArray[key], value],
          };
        } else {
          return {
            ...searchArray,
            [e.target.name]: [e.target.value],
          };
        }
      });
    } else {
      setSearchArray((items) => {
        if (searchArray[key].length > 1) {
          return {
            ...searchArray,
            [key]: [...searchArray[key].filter((valueBefore) => valueBefore != value)],
          };
        } else {
          const copy = { ...items }; //  create copy of state object
          delete copy[key]; //  remove salary key from object
          return copy;
        }
      });
    }
  };
  // seting up filter radiobutton
  const handleChangeRadioButton = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const valueAfterSplit = value.split(",");
    // console.log(valueAfterSplit);
    if (valueAfterSplit.length > 1) {
      setSearchArray(() => {
        return {
          ...searchArray,
          [key]: [valueAfterSplit[0], valueAfterSplit[1]],
        };
      });
    } else {
      setSearchArray(() => {
        return {
          ...searchArray,
          [key]: [valueAfterSplit[0]],
        };
      });
    }
  };

  useEffect(() => {
    dispatchGetJob();
  }, [keywordParamSearch, searchArray, valueSearch]);

  // handle update on job
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

  // handle sticky sidebar
  const [clientWindowHeight, setClientWindowHeight] = useState(0);
  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const [stickySidebarTop, setStickySidebarTop] = useState("0");

  const nodeRef = useRef(null);
  const [controlledPosition, setControlledPosition] = useState({
    x: -11,
    y: clientWindowHeight,
  });

  useEffect(() => {
    setControlledPosition({
      ...controlledPosition,
      y: clientWindowHeight + 200,
    });

    if (clientWindowHeight < 80) {
      setStickySidebarTop("100px");
      // setStickySidebarTop("0");
    }
    if (clientWindowHeight >= 80 && clientWindowHeight < 100) {
      setStickySidebarTop("100px");
      // setStickySidebarTop(`${clientWindowHeight}px`);
    }
    if (clientWindowHeight >= 100) {
      setStickySidebarTop("100px");
    }
  }, [clientWindowHeight]);


  // handle size height minimum
  // const [dataSizeJob, setDataSizeJob] = useState("600");
  // useEffect(() => {
  //   if (JobSearch?.length == 0) {
  //     setDataSizeJob(`${size.height - 413}`);
  //   }
  //   if (JobSearch?.length <= 4 && JobSearch?.length >= 1) {
  //     setDataSizeJob(`${size.height - 451}`);
  //   }
  //   if (JobSearch?.length > 4) {
  //     setDataSizeJob("auto");
  //   }
  // }, [size, JobSearch]);

  // handle toggle filter
  const onControlledDrag = (position) => {
    const { x } = position;
    if (x > (-11 + (size.width - 53)) / 2) {
      setControlledPosition({
        ...controlledPosition,
        x: size.width - 53,
      });
    } else {
      setControlledPosition({
        ...controlledPosition,
        x: -11,
      });
    }
  };

  // handle scroll page
  useEffect(() => {
    if (size.width > 991) {
      setControlledPosition({
        ...controlledPosition,
        x: -11,
      });
      // window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
      window.scrollTo(0, 0);
    } else {
      // window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
      window.scrollTo(0, 0);
    }
  }, [size.width]);

  // show canvas mobile
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const handleCloseOffCanvas = () => setShowOffCanvas(false);
  const handleShowOffCanvas = (e, position) => {
    const { x } = position;
    if (x == controlledPosition.x) {
      setShowOffCanvas(true);
    }
    // if ( x != controlledPosition.x ) {
    //   setShowOffCanvas(true) }
  };

  useEffect(() => {
    if (keywordParamSearch == undefined || keywordParamSearch == "" || keywordParamSearch == null) {
      document.title = "Search All Job | JobSeek";
    } else {
      document.title = `Search Job ${keywordParamSearch} | JobSeek`;
    }
  }, [keywordParamSearch]);

  const Sort = [
    { value: "desc", label: "Latest Job Updated" },
    { value: "asc", label: "Oldest Job Updated" },
  ];

  const Limit = [
    { value: "12", label: "Show 12" },
    { value: "24", label: "Show 24" },
    { value: "48", label: "Show 48" },
  ];

  return (
    <Fragment>
      <div
        className="container-xxl container-xl container-lg container-md-fluid container-sm-fluid container-job"
        style={{ overflowX: `${size.width > 991 ? `visible` : `hidden`}` }}
      >
        <div
          className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid "
          style={{
            minHeight: `${size.height - 500}px`,
          }}
        >
          {size.width < 991 ? (
            // mobile show offcanvas and button toggle filter
            <Fragment>
              <Draggable
                axis="x"
                // bounds="body"
                bounds={{
                  // top: -100,
                  left: -11,
                  right: size.width - 53,
                  // bottom: 100
                }}
                position={controlledPosition}
                // onDrag={onControlledDrag}
                onDrag={onControlledDrag}
                nodeRef={nodeRef}
                onStop={handleShowOffCanvas}
              >
                <div ref={nodeRef} className="box" style={{ zIndex: 1 }}>
                  <button className="act-btn btn btn-success mt-5" type="button">
                    <FontAwesomeIcon icon={faFilter} className="mx-0" />
                    <span>
                      <br />
                      F<br /> i<br /> l<br /> t<br /> e<br /> r<br />
                    </span>
                  </button>
                </div>
              </Draggable>

             
                
                

              <Offcanvas show={showOffCanvas} onHide={handleCloseOffCanvas}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Filter Search</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div className="offcanvas-filter text-secondary">
                    <div className="col-12 d-flex my-3" style={{ fontSize: "14px" }}>
                      <div className="col-8 d-flex align-items-center">
                        <Select
                          id="search-sort-select"
                          instanceId="search-sort-select"
                          className="col-12"
                          name="sort"
                          isSearchable={false}
                          placeholder="Type"
                          options={Sort}
                          // isMulti
                          // defaultValue={Sort.map((x, index) => {
                          //   if (x.value == sortParamSearch)
                          //     Sort[index]
                          //   }
                          // )}
                          defaultValue={Sort.map((x, index) => (x.value == sortParamSearch ? Sort[index] : null))}
                          onChange={(e) => {
                            if (keywordParamSearch == undefined || keywordParamSearch == "" || keywordParamSearch == null) {
                              router.push({
                                pathname: `/j`,
                                query: {
                                  sort: [e.value],
                                  page: 1,
                                  limit: limitParamSearch,
                                },
                              });
                            } else {
                              router.push({
                                pathname: `/j`,
                                query: {
                                  keyword: keywordParamSearch,
                                  sort: [e.value],
                                  page: 1,
                                  limit: limitParamSearch,
                                },
                              });
                            }
                          }}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: "0.375rem",
                            colors: {
                              ...theme.colors,
                              primary25: "#e9ecef",
                              primary: "var(--bs-success)",
                              // neutral50: "white",
                              neutral90: "white",
                            },
                          })}
                        />
                      </div>
                      <div className="col-4 d-flex align-items-center">
                        <Select
                          id="search-limit-select"
                          instanceId="search-limit-select"
                          className="col-12 ps-1"
                          name="limit"
                          isSearchable={false}
                          placeholder="Type"
                          options={Limit}
                          // isMulti
                          defaultValue={Limit.map((x, index) => (x.value == limitParamSearch ? Limit[index] : null))}
                          onChange={(e) => {
                            if (keywordParamSearch == undefined || keywordParamSearch == "" || keywordParamSearch == null) {
                              router.push({
                                pathname: `/j`,
                                query: {
                                  sort: sortParamSearch,
                                  page: 1,
                                  limit: [e.value],
                                },
                              });
                            } else {
                              router.push({
                                pathname: `/j`,
                                query: {
                                  keyword: keywordParamSearch,
                                  sort: sortParamSearch,
                                  page: 1,
                                  limit: [e.value],
                                },
                              });
                            }
                          }}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: "0.375rem",
                            colors: {
                              ...theme.colors,
                              primary25: "#e9ecef",
                              primary: "var(--bs-success)",
                              // neutral50: "white",
                              neutral90: "white",
                            },
                          })}
                        />
                      </div>
                    </div>

                    <hr className="text-success w-100 my-0" />
                    <div className="col-12 mt-1">
                      <ul className="list-unstyled ps-0">
                        <div className="nav nav-pills d-grid" id="v-pills-tab" role="tablist" aria-orientation="horizontal">
                          <li className="mb-1 ">
                            <div className="d-flex justify-content-between ">
                              <button className="nav-link d-flex justify-content-start collapsed w-100 " data-bs-toggle="collapse" data-bs-target="#job-type-collapse" aria-expanded="true">
                                <span className="label-sidebar my-auto">Job Type</span>
                              </button>
                              <button className="btn-toggle rounded " data-bs-toggle="collapse" data-bs-target="#job-type-collapse" aria-expanded="true"></button>
                            </div>

                            <div className="collapse show ps-3" id="job-type-collapse">
                              <ul className="btn-toggle-nav list-unstyled fw-normal  small ">
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.type"
                                    type="checkbox"
                                    value="internship"
                                    onChange={handleChangeCheckBox}
                                    id="job-type-internship"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    // defaultChecked={refFilter.current.checked}
                                    defaultChecked={searchArray["job.type"]?.includes("internship") ? true : false}
                                  />
                                  <span> Internship</span>
                                </li>
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.type"
                                    type="checkbox"
                                    value="full-time"
                                    onChange={handleChangeCheckBox}
                                    id="job-type-full-time"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    defaultChecked={searchArray["job.type"]?.includes("full-time") ? true : false}
                                  />
                                  <span> Full-Time</span>
                                </li>
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.type"
                                    type="checkbox"
                                    value="part-time"
                                    onChange={handleChangeCheckBox}
                                    id="job-type-part-time"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    defaultChecked={searchArray["job.type"]?.includes("part-time") ? true : false}
                                  />
                                  <span> Part-Time</span>
                                </li>
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.type"
                                    type="checkbox"
                                    value="freelance"
                                    onChange={handleChangeCheckBox}
                                    id="job-type-freelance"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    defaultChecked={searchArray["job.type"]?.includes("freelance") ? true : false}
                                  />
                                  <span> Freelance</span>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <hr className="text-success w-100 my-0" />
                          <li className="mb-1">
                            <div className="d-flex justify-content-between ">
                              <button className="nav-link d-flex justify-content-start collapsed w-100   " data-bs-toggle="collapse" data-bs-target="#job-system-collapse" aria-expanded="true">
                                <span className="label-sidebar my-auto">Job System</span>
                              </button>
                              <button className="btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#job-system-collapse" aria-expanded="true"></button>
                            </div>

                            <div className="collapse show ps-3" id="job-system-collapse">
                              <ul className="btn-toggle-nav list-unstyled fw-normal  small ">
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.system"
                                    type="checkbox"
                                    value="on-site"
                                    onChange={handleChangeCheckBox}
                                    id="job-system-on-site"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    defaultChecked={searchArray["job.system"]?.includes("on-site") ? true : false}
                                  />
                                  <span> On-Site</span>
                                </li>
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.system"
                                    type="checkbox"
                                    value="remote"
                                    onChange={handleChangeCheckBox}
                                    id="job-system-remote"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    defaultChecked={searchArray["job.system"]?.includes("remote") ? true : false}
                                  />
                                  <span> Remote</span>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <hr className="text-success w-100 my-0" />
                          <li className="mb-1">
                            <div className="d-flex justify-content-between ">
                              <button className="nav-link d-flex justify-content-start collapsed w-100   " data-bs-toggle="collapse" data-bs-target="#work-experience-collapse" aria-expanded="true">
                                <span className="label-sidebar my-auto">Work Experience</span>
                              </button>
                              <button className="btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#work-experience-collapse" aria-expanded="true"></button>
                            </div>

                            <div className="collapse show ps-3" id="work-experience-collapse">
                              <ul className="btn-toggle-nav list-unstyled fw-normal small">
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.experience_time"
                                    type="radio"
                                    value="=0,=0"
                                    onChange={handleChangeRadioButton}
                                    id="job-experience-time-zero-experience"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    defaultChecked={searchArray["job.experience_time"]?.includes("=0") && searchArray["job.experience_time"]?.includes("=0") ? true : false}
                                  />
                                  <span>No Experience</span>
                                </li>
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.experience_time"
                                    type="radio"
                                    value=">=0,<=8759"
                                    onChange={handleChangeRadioButton}
                                    id="job-experience-time-less-1-year"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}

                                    defaultChecked={searchArray["job.experience_time"]?.includes(">=0") && searchArray["job.experience_time"]?.includes("<=8759") ? true : false}
                                  />
                                  <span> Less than a year</span>
                                </li>
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.experience_time"
                                    type="radio"
                                    value=">=8760,<=26279"
                                    onChange={handleChangeRadioButton}
                                    id="job-experience-time-less-3-year-more-1-year"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    defaultChecked={searchArray["job.experience_time"]?.includes(">=8760") && searchArray["job.experience_time"]?.includes("<=26279") ? true : false}
                                  />
                                  <span> 1 - 3 years</span>
                                </li>
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.experience_time"
                                    type="radio"
                                    value=">=26280,<=43799"
                                    onChange={handleChangeRadioButton}
                                    id="job-experience-time-less-5-year-more-3-year"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    defaultChecked={searchArray["job.experience_time"]?.includes(">=26280") && searchArray["job.experience_time"]?.includes("<=43799") ? true : false}
                                  />
                                  <span> 3 - 5 years</span>
                                </li>
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.experience_time"
                                    type="radio"
                                    value=">=43800,<=87599"
                                    onChange={handleChangeRadioButton}
                                    id="job-experience-time-less-10-year-more-5-year"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    defaultChecked={searchArray["job.experience_time"]?.includes(">=43800") && searchArray["job.experience_time"]?.includes("<=87599") ? true : false}
                                  />
                                  <span> 5 - 10 years</span>
                                </li>
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.experience_time"
                                    type="radio"
                                    value=">=87600,<=9999999"
                                    onChange={handleChangeRadioButton}
                                    id="job-experience-time-more-10"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    defaultChecked={searchArray["job.experience_time"]?.includes(">=87600") && searchArray["job.experience_time"]?.includes("<=9999999") ? true : false}
                                  />
                                  <span> More than 10 years</span>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <hr className="text-success w-100 my-0" />
                          <li className="mb-1">
                            <div className="d-flex justify-content-between ">
                              <button className="nav-link d-flex justify-content-start collapsed w-100   " data-bs-toggle="collapse" data-bs-target="#job-updated-on-collapse" aria-expanded="true">
                                <span className="label-sidebar my-auto">Last Updated</span>
                              </button>
                              <button className="btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#job-updated-on-collapse" aria-expanded="true"></button>
                            </div>

                            <div className="collapse show ps-3" id="job-updated-on-collapse">
                              <ul className="btn-toggle-nav list-unstyled fw-normal small">
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.updated_on"
                                    type="radio"
                                    value={`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}',>='${moment().utc().subtract(1, "days").format("YYYY-MM-DDTHH:mm:ss")}'`}
                                    onChange={handleChangeRadioButton}
                                    id="job-updated-on-1-day"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    defaultChecked={
                                      searchString.includes("job.updated_on") && searchString.includes(moment().utc().format("YYYY-MM-DDTHH")) && searchString.includes(moment().utc().subtract(1, "days").format("YYYY-MM-DDTHH")) ? true : false
                                    }
                                  />
                                  <span>Past 24 hours</span>
                                </li>
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.updated_on"
                                    type="radio"
                                    value={`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}',>='${moment().utc().subtract(7, "days").format("YYYY-MM-DDTHH:mm:ss")}'`}
                                    onChange={handleChangeRadioButton}
                                    id="job-updated-on-1-week"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    // defaultChecked= {searchArray["job.experience_time"]?.includes(`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}'`) && searchArray["job.experience_time"]?.includes(`>='${moment().utc().subtract(7, "days").format("YYYY-MM-DDTHH:mm:ss")}'`) ? true : false}

                                    defaultChecked={
                                      searchString.includes("job.updated_on") && searchString.includes(moment().utc().format("YYYY-MM-DDTHH")) && searchString.includes(moment().utc().subtract(7, "days").format("YYYY-MM-DDTHH")) ? true : false
                                    }
                                  />
                                  <span>Past a Week </span>
                                </li>
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.updated_on"
                                    type="radio"
                                    value={`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}',>='${moment().utc().subtract(1, "month").format("YYYY-MM-DDTHH:mm:ss")}'`}
                                    onChange={handleChangeRadioButton}
                                    id="job-updated-on-1-month"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    // defaultChecked= {searchArray["job.experience_time"]?.includes(`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}'`) && searchArray["job.experience_time"]?.includes(`>='${moment().utc().subtract(1, "month").format("YYYY-MM-DDTHH:mm:ss")}'`) ? true : false}

                                    defaultChecked={
                                      searchString.includes("job.updated_on") && searchString.includes(moment().utc().format("YYYY-MM-DDTHH")) && searchString.includes(moment().utc().subtract(1, "month").format("YYYY-MM-DDTHH")) ? true : false
                                    }
                                  />
                                  <span>Past a month </span>
                                </li>
                                <li className="form-check">
                                  <input
                                    className="form-check-input"
                                    name="job.updated_on"
                                    type="radio"
                                    // value={`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}',<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}'`}
                                    value={`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}'`}
                                    onChange={handleChangeRadioButton}
                                    id="job-updated-on-any-time"
                                    // ref={refFilter}
                                    // defaultChecked={refFilter?.current?.checked}
                                    // defaultChecked= {searchArray["job.experience_time"]?.includes(`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}'`) && searchArray["job.experience_time"]?.includes(`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}'`) ? true : false}
                                    defaultChecked={searchArray["job.updated_on"]?.length == 1 && searchString.includes(moment().utc().format("YYYY-MM-DDTHH")) ? true : false}
                                  />
                                  <span>Any Time</span>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </div>
                      </ul>
                    </div>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
            </Fragment>
          ) : (
            <Fragment>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 pe-3 text-secondary">
                <div
                  className="container border border-muted rounded side-scroll side-bar-search"
                  style={{
                    top: `${stickySidebarTop}`,
                  }}
                >
                  <div className="text-center my-2">
                    <span>Filter Search</span>
                  </div>
                  <hr className="text-success w-100 my-0" />
                  <div className="col-12 d-flex my-3" style={{ fontSize: "14px" }}>
                    <div className="col-8 d-flex align-items-center">
                      <Select
                        id="search-sort-select"
                        instanceId="search-sort-select"
                        className="col-12"
                        name="sort"
                        isSearchable={false}
                        placeholder="Type"
                        options={Sort}
                        // isMulti
                        defaultValue={Sort.map((x, index) => (x.value == sortParamSearch ? Sort[index] : null))}
                        onChange={(e) => {
                          if (keywordParamSearch == undefined || keywordParamSearch == "" || keywordParamSearch == null) {
                            router.push({
                              pathname: `/j`,
                              query: {
                                sort: [e.value],
                                page: 1,
                                limit: limitParamSearch,
                              },
                            });
                          } else {
                            router.push({
                              pathname: `/j`,
                              query: {
                                keyword: keywordParamSearch,
                                sort: [e.value],
                                page: 1,
                                limit: limitParamSearch,
                              },
                            });
                          }
                        }}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: "0.375rem",
                          colors: {
                            ...theme.colors,
                            primary25: "#e9ecef",
                            primary: "var(--bs-success)",
                            // neutral50: "white",
                            neutral90: "white",
                          },
                        })}
                      />
                    </div>
                    <div className="col-4 d-flex align-items-center">
                      <Select
                        id="search-limit-select"
                        instanceId="search-limit-select"
                        className="col-12 ps-1"
                        name="limit"
                        isSearchable={false}
                        placeholder="Type"
                        options={Limit}
                        // isMulti
                        defaultValue={Limit.map((x, index) => (x.value == limitParamSearch ? Limit[index] : null))}
                        onChange={(e) => {
                          if (keywordParamSearch == undefined || keywordParamSearch == "" || keywordParamSearch == null) {
                            router.push({
                              pathname: `/j`,
                              query: {
                                sort: sortParamSearch,
                                page: 1,
                                limit: [e.value],
                              },
                            });
                          } else {
                            router.push({
                              pathname: `/j`,
                              query: {
                                keyword: keywordParamSearch,
                                sort: sortParamSearch,
                                page: 1,
                                limit: [e.value],
                              },
                            });
                          }
                        }}
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: "0.375rem",
                          colors: {
                            ...theme.colors,
                            primary25: "#e9ecef",
                            primary: "var(--bs-success)",
                            // neutral50: "white",
                            neutral90: "white",
                          },
                        })}
                      />
                    </div>
                  </div>
                  <hr className="text-success w-100 my-0" />
                  <div className="sidebar-filter col-12 mt-1">
                    <ul className="list-unstyled ps-0">
                      <div className="nav nav-pills d-grid" id="v-pills-tab" role="tablist" aria-orientation="horizontal">
                        <li className="mb-1 ">
                          <div className="d-flex justify-content-between ">
                            <button className="nav-link d-flex justify-content-start collapsed w-100 " data-bs-toggle="collapse" data-bs-target="#job-type-collapse" aria-expanded="true">
                              <span className="label-sidebar my-auto">Job Type</span>
                            </button>
                            <button className="btn-toggle rounded " data-bs-toggle="collapse" data-bs-target="#job-type-collapse" aria-expanded="true"></button>
                          </div>

                          <div className="collapse show ps-3" id="job-type-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal  small ">
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.type"
                                  type="checkbox"
                                  value="internship"
                                  onChange={handleChangeCheckBox}
                                  id="job-type-internship"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  // defaultChecked={refFilter.current.checked}
                                  defaultChecked={searchArray["job.type"]?.includes("internship") ? true : false}
                                />
                                <span> Internship</span>
                              </li>
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.type"
                                  type="checkbox"
                                  value="full-time"
                                  onChange={handleChangeCheckBox}
                                  id="job-type-full-time"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  defaultChecked={searchArray["job.type"]?.includes("full-time") ? true : false}
                                />
                                <span> Full-Time</span>
                              </li>
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.type"
                                  type="checkbox"
                                  value="part-time"
                                  onChange={handleChangeCheckBox}
                                  id="job-type-part-time"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  defaultChecked={searchArray["job.type"]?.includes("part-time") ? true : false}
                                />
                                <span> Part-Time</span>
                              </li>
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.type"
                                  type="checkbox"
                                  value="freelance"
                                  onChange={handleChangeCheckBox}
                                  id="job-type-freelance"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  defaultChecked={searchArray["job.type"]?.includes("freelance") ? true : false}
                                />
                                <span> Freelance</span>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <hr className="text-success w-100 my-0" />
                        <li className="mb-1">
                          <div className="d-flex justify-content-between ">
                            <button className="nav-link d-flex justify-content-start collapsed w-100   " data-bs-toggle="collapse" data-bs-target="#job-system-collapse" aria-expanded="true">
                              <span className="label-sidebar my-auto">Job System</span>
                            </button>
                            <button className="btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#job-system-collapse" aria-expanded="true"></button>
                          </div>

                          <div className="collapse show ps-3" id="job-system-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal  small ">
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.system"
                                  type="checkbox"
                                  value="on-site"
                                  onChange={handleChangeCheckBox}
                                  id="job-system-on-site"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  defaultChecked={searchArray["job.system"]?.includes("on-site") ? true : false}
                                />
                                <span> On-Site</span>
                              </li>
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.system"
                                  type="checkbox"
                                  value="remote"
                                  onChange={handleChangeCheckBox}
                                  id="job-system-remote"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  defaultChecked={searchArray["job.system"]?.includes("remote") ? true : false}
                                />
                                <span> Remote</span>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <hr className="text-success w-100 my-0" />
                        <li className="mb-1">
                          <div className="d-flex justify-content-between ">
                            <button className="nav-link d-flex justify-content-start collapsed w-100   " data-bs-toggle="collapse" data-bs-target="#work-experience-collapse" aria-expanded="true">
                              <span className="label-sidebar my-auto">Work Experience</span>
                            </button>
                            <button className="btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#work-experience-collapse" aria-expanded="true"></button>
                          </div>

                          <div className="collapse  show ps-3" id="work-experience-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal small">
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.experience_time"
                                  type="radio"
                                  value="=0,=0"
                                  onChange={handleChangeRadioButton}
                                  id="job-experience-time-zero-experience"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  defaultChecked={searchArray["job.experience_time"]?.includes("=0") && searchArray["job.experience_time"]?.includes("=0") ? true : false}
                                />
                                <span>No Experience</span>
                              </li>
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.experience_time"
                                  type="radio"
                                  value=">=0,<=8759"
                                  onChange={handleChangeRadioButton}
                                  id="job-experience-time-less-1-year"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}

                                  defaultChecked={searchArray["job.experience_time"]?.includes(">=0") && searchArray["job.experience_time"]?.includes("<=8759") ? true : false}
                                />
                                <span> Less than a year</span>
                              </li>
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.experience_time"
                                  type="radio"
                                  value=">=8760,<=26279"
                                  onChange={handleChangeRadioButton}
                                  id="job-experience-time-less-3-year-more-1-year"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  defaultChecked={searchArray["job.experience_time"]?.includes(">=8760") && searchArray["job.experience_time"]?.includes("<=26279") ? true : false}
                                />
                                <span> 1 - 3 years</span>
                              </li>
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.experience_time"
                                  type="radio"
                                  value=">=26280,<=43799"
                                  onChange={handleChangeRadioButton}
                                  id="job-experience-time-less-5-year-more-3-year"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  defaultChecked={searchArray["job.experience_time"]?.includes(">=26280") && searchArray["job.experience_time"]?.includes("<=43799") ? true : false}
                                />
                                <span> 3 - 5 years</span>
                              </li>
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.experience_time"
                                  type="radio"
                                  value=">=43800,<=87599"
                                  onChange={handleChangeRadioButton}
                                  id="job-experience-time-less-10-year-more-5-year"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  defaultChecked={searchArray["job.experience_time"]?.includes(">=43800") && searchArray["job.experience_time"]?.includes("<=87599") ? true : false}
                                />
                                <span> 5 - 10 years</span>
                              </li>
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.experience_time"
                                  type="radio"
                                  value=">=87600,<=9999999"
                                  onChange={handleChangeRadioButton}
                                  id="job-experience-time-more-10"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  defaultChecked={searchArray["job.experience_time"]?.includes(">=87600") && searchArray["job.experience_time"]?.includes("<=9999999") ? true : false}
                                />
                                <span> More than 10 years</span>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <hr className="text-success show w-100 my-0" />
                        <li className="mb-1">
                          <div className="d-flex justify-content-between ">
                            <button className="nav-link d-flex justify-content-start collapsed w-100   " data-bs-toggle="collapse" data-bs-target="#job-updated-on-collapse" aria-expanded="true">
                              <span className="label-sidebar my-auto">Last Updated</span>
                            </button>
                            <button className="btn-toggle rounded collapsed" data-bs-toggle="collapse" data-bs-target="#job-updated-on-collapse" aria-expanded="true"></button>
                          </div>

                          <div className="collapse  show ps-3" id="job-updated-on-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal small">
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.updated_on"
                                  type="radio"
                                  value={`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}',>='${moment().utc().subtract(1, "days").format("YYYY-MM-DDTHH:mm:ss")}'`}
                                  onChange={handleChangeRadioButton}
                                  id="job-updated-on-1-day"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  defaultChecked={
                                    searchString.includes("job.updated_on") && searchString.includes(moment().utc().format("YYYY-MM-DDTHH")) && searchString.includes(moment().utc().subtract(1, "days").format("YYYY-MM-DDTHH")) ? true : false
                                  }
                                />
                                <span>Past 24 hours</span>
                              </li>
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.updated_on"
                                  type="radio"
                                  value={`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}',>='${moment().utc().subtract(7, "days").format("YYYY-MM-DDTHH:mm:ss")}'`}
                                  onChange={handleChangeRadioButton}
                                  id="job-updated-on-1-week"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  // defaultChecked= {searchArray["job.experience_time"]?.includes(`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}'`) && searchArray["job.experience_time"]?.includes(`>='${moment().utc().subtract(7, "days").format("YYYY-MM-DDTHH:mm:ss")}'`) ? true : false}

                                  defaultChecked={
                                    searchString.includes("job.updated_on") && searchString.includes(moment().utc().format("YYYY-MM-DDTHH")) && searchString.includes(moment().utc().subtract(7, "days").format("YYYY-MM-DDTHH")) ? true : false
                                  }
                                />
                                <span>Past a Week </span>
                              </li>
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.updated_on"
                                  type="radio"
                                  value={`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}',>='${moment().utc().subtract(1, "month").format("YYYY-MM-DDTHH:mm:ss")}'`}
                                  onChange={handleChangeRadioButton}
                                  id="job-updated-on-1-month"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  // defaultChecked= {searchArray["job.experience_time"]?.includes(`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}'`) && searchArray["job.experience_time"]?.includes(`>='${moment().utc().subtract(1, "month").format("YYYY-MM-DDTHH:mm:ss")}'`) ? true : false}

                                  defaultChecked={
                                    searchString.includes("job.updated_on") && searchString.includes(moment().utc().format("YYYY-MM-DDTHH")) && searchString.includes(moment().utc().subtract(1, "month").format("YYYY-MM-DDTHH")) ? true : false
                                  }
                                />
                                <span>Past a month </span>
                              </li>
                              <li className="form-check">
                                <input
                                  className="form-check-input"
                                  name="job.updated_on"
                                  type="radio"
                                  // value={`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}',<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}'`}
                                  value={`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}'`}
                                  onChange={handleChangeRadioButton}
                                  id="job-updated-on-any-time"
                                  // ref={refFilter}
                                  // defaultChecked={refFilter?.current?.checked}
                                  // defaultChecked= {searchArray["job.experience_time"]?.includes(`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}'`) && searchArray["job.experience_time"]?.includes(`<='${moment().utc().format("YYYY-MM-DDTHH:mm:ss")}'`) ? true : false}
                                  defaultChecked={searchArray["job.updated_on"]?.length == 1 && searchString.includes(moment().utc().format("YYYY-MM-DDTHH")) ? true : false}
                                />
                                <span>Any Time</span>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </Fragment>
          )}

          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <div className="container-xl container-lg container-md-fluid container-sm-fluid  col-12 py-2 border rounded ">
              {keywordParamSearch ? (
                <Fragment>
                  <h4 className="fw-bold text-truncate pe-5 my-0">Find Job : {keywordParamSearch}</h4>
                  <small>
                    <p className="my-0 text-muted">Total Job Available {pagination_totalData}</p>
                  </small>
                </Fragment>
              ) : (
                <Fragment>
                  <h4 className="fw-bold my-0">Show All Job </h4>
                  <small>
                    <p className=" my-0 text-muted">Total Job Available {pagination_totalData}</p>
                  </small>
                </Fragment>
              )}
            </div>
            {isLoading ? (
              <Fragment>
                <div className="col-12 ">
                  <div
                    className="col-12 container-xl container-lg container-md-fluid container-sm-fluid  my-2 d-grid"
                    style={{
                      minHeight: `${size.height - 500}px`,
                    }}
                  >
                    <PreLoaderComponent isLoading={isLoading} />
                  </div>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {/* {size.width < 991 ? <Fragment></Fragment> : <Fragment> </Fragment> } */}

                {JobSearch?.length > 0 ? (
                  <Fragment>
                    {/* <div className="col-xxl-9 col-xl-8 col-lg-8 col-md-12 col-sm-12"> */}
                    <div className="row d-flex">
                      <Fragment>
                        {JobSearch.map((item) => (
                          <div className="d-flex col-xl-6 col-lg-6 col-md-6 col-sm-6 my-2 pointer-button" key={item.id}>
                            <Link className="text-decoration-none " href={`/j/${item.id}`}>
                              <Card className="container col-12 border border-muted text-center rounded py-3 card-job align-items-center">
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
                                        <FontAwesomeIcon icon={faBusinessTime} className="text-secondary col-1 my-auto" />
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
                        ))}
                      </Fragment>
                    </div>
                    {/* </div> */}
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="col-12 ">
                      <div
                        className="col-12  container-xl container-lg container-md-fluid container-sm-fluid  container-xxl  rounded my-2 d-grid"
                        style={{
                          minHeight: `${size.height - 481}px`,
                        }}
                      >
                        <div className="d-grid mx-auto my-auto text-center">
                          <FontAwesomeIcon icon={faTriangleExclamation} className="mx-auto text-success" style={{ fontSize: "150px", transform: "rotate(15deg)" }} />
                          <span className="mt-3 text-success" style={{ fontSize: "28px" }}>
                            Job Not Found
                          </span>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                )}
              </Fragment>
            )}
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center  ">
          <MyPagination
            total={pagination_totalPage}
            current={pagination_currentPage}
            // onChangePage={(e) => handleChangePage}
            // keywordParam = {keywordParam}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default SearchRecipes;

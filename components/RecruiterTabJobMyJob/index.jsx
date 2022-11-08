import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getJobSearch } from "../../app/redux/Slice/JobSearchSlice";
import Image from "next/image";

import IconSearch from "../../public/assets/icons/search.svg";
import RecruiterTabJobEditJob from "../RecruiterTabJobEditJob";

import ModalView from "../Modal";
import MyPaginationTable from "../PaginationTable";

import useWindowSize from "../WindowsSize";

import PreLoaderComponent from "../PreLoaderComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import Select from "react-select";
const RecruiterTabJobMyJob = ({ token, refreshToken, role, id, Skill }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // set id Job if selected
  const [idJob, setIdJob] = useState();

  // set default job table
  const [showMyJob, setShowMyJob] = useState(true);

  // default search
  const [sortBy, setSortBy] = useState("created_on");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("10");

  // Filter search keyword bu column table
  const [keyword, setKeyword] = useState();
  const [valueInputKeyword, setInputValueKeyword] = useState();

  const [searchArray, setSearchArray] = useState({
    "job.recruiter_id": id,
  });
  // const searchString = JSON.stringify(searchArray);

  const handleKeywordSearchTable = (e) => {
    setInputValueKeyword(e.target.value);
    setKeyword(e.target.value);
  };

  const handleKeypressSearchTable = async (e) => {
    if (e.key == "Enter") {
      dispatchGetRecruiterJobMyJob();
    }
  };

  useEffect(() => {
    setSearchArray((items) => {
      if (valueInputKeyword && keyword) {
        return {
          ...searchArray,
          "job.name": keyword,
        };
      } else {
        const copy = { ...items };
        delete copy["job.name"];
        return copy;
      }
    });
  }, [keyword]);

  // filter sorting / limit / pages
  const [valueSearch, setValueSearch] = useState();
  useEffect(() => {
    if (sortBy && sort && page && limit) {
      setValueSearch(`sortby=${sortBy}&sort=${sort}&page=${page}&limit=${limit}`);
    }
  }, [sortBy, sort, page, limit]);

  const {
    // isLoading,
    JobSearch,
    // statusCode,
    pagination_currentPage,
    // pagination_totalData,
    //  pagination_limit,
    pagination_totalPage,
  } = useSelector((state) => state.JobSearch);

  const dispatchGetRecruiterJobMyJob = async () => {
    let searchString = `search=${JSON.stringify(searchArray)}&`;
    if (keyword && searchArray.length != 0 && valueSearch) {
      if (searchString.includes(keyword)) {
        let valueSenderSearch = searchString + valueSearch;
        return dispatch(getJobSearch(valueSenderSearch));
      }
    }
    if (!keyword && searchArray.length != 0 && valueSearch) {
      let valueSenderSearch = searchString + valueSearch;
      return dispatch(getJobSearch(valueSenderSearch));
    }
    if (!keyword && searchArray.length == 0 && valueSearch) {
      let valueSenderSearch = valueSearch;
      return dispatch(getJobSearch(valueSenderSearch));
    }
    setIsLoading(false);
  };

  // final dispatch search
  useEffect(() => {
    dispatchGetRecruiterJobMyJob();
    window.scrollTo(0, 0);
  }, [dispatch, searchArray, valueSearch, showMyJob]);

  // handle delete selected
  const [checkBoxValueList, setCheckBoxValueList] = useState([]);

  // final value array as string
  const dataCheckBoxValueList = checkBoxValueList.map((item) => `'${item}'`).toString();

  // handle check all
  const HandleCheckAll = (e) => {
    const checkBoxRow = document.querySelectorAll("#checkbox");
    checkBoxRow.forEach((item) => {
      if (e) {
        item.checked = true;
        setCheckBoxValueList((arr) => [...arr, `${item.value}`]);
      } else {
        item.checked = false;
        setCheckBoxValueList([]);
      }
    });
  };

  // handle only check selected
  const HandleCheckSelected = (e) => {
    if (e.checked) {
      setCheckBoxValueList((arr) => [...arr, `${e.value}`]);
    } else {
      setCheckBoxValueList(checkBoxValueList.filter((item) => item !== e.value));
    }
  };

  // handle size loading
  const size = useWindowSize();
  const [heightJob, setHeightJob] = useState("838.8");
  useEffect(() => {
    if (showMyJob) {
      // limit 10 = 838.8px
      // limit 20 = 1388.8px
      // limit 20 = 1938.8px
      if (!isLoading) {
        if (limit == "10") {
          setHeightJob("838.8");
        }
        if (limit == "20") {
          setHeightJob("1388.8");
        }
        if (limit == "30") {
          setHeightJob("1938.8");
        }
      } else {
        setHeightJob("452");
      }
    }
  }, [size]);

  const SortTable = [
    { value: "desc", label: "Latest" },
    { value: "asc", label: "Oldest" },
  ];

  const SortByTable = [
    { value: "name", label: "Job" },
    { value: "position", label: "Position Job" },
    { value: "type", label: "Type Job" },
    { value: "system", label: "System Job" },
    { value: "count_apply", label: "Total Apply Job" },
    { value: "created_on", label: "Created Job" },
    { value: "updated_on", label: "Updated Job" },
  ];

  const LimitTable = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "30", label: "30" },
  ];

  // console.log(dataCheckBoxValueList)

  return (
    // <Fragment>
    //   {isLoading ? (
    //     <div className="d-flex align-items-center justify-content-center" style={{ height: `${heightJob}px` }}>
    //       <PreLoaderComponent isLoading={isLoading} />
    //     </div>
    //   ) : (
    //     <div className="container-fluid ">
    //       {showMyJob ? (
    //         <Fragment>
    //           <div className="col-12 justify-content-start">
    //             <h4 className=" fw-bold ">My Job List</h4>
    //           </div>
    //           <div className="col-12 d-flex">
    //             <div className={`${dataCheckBoxValueList ? `col-10 ` : `col-12 `} d-flex border form-input my-3`}>
    //               <div className="col-11 ">
    //                 <input className="form-control  border-0 " id="input-search-table" type="search" placeholder="Search" aria-label="Search" defaultValue={keyword} onChange={handleKeywordSearchTable} onKeyPress={handleKeypressSearchTable} />
    //               </div>
    //               <div className="col-1 d-flex justify-content-center ">
    //                 <Image
    //                   onClick={() => {
    //                     setKeyword(valueInputKeyword);
    //                     dispatchGetRecruiterJobMyJob();
    //                   }}
    //                   src={IconSearch}
    //                   width="18px"
    //                   height="30px"
    //                   alt=""
    //                   className="py-0"
    //                 />
    //               </div>
    //             </div>
    //             <ModalView
    //               modalType="delete-selected-job"
    //               setCheckBoxValueList={setCheckBoxValueList}
    //               dataCheckBoxValueList={dataCheckBoxValueList}
    //               dispatchGetRecruiterJobMyJob={dispatchGetRecruiterJobMyJob}
    //               isLoading={isLoading}
    //               setIsLoading={setIsLoading}
    //               token={token}
    //               refreshToken={refreshToken}
    //             />
    //           </div>

    //           {JobSearch?.length > 0 ? (
    //             <Fragment>
    //               <div
    //                 className="col-12 h-100 "
    //                 style={{
    //                   minHeight: `${size.height - 589}px`,
    //                 }}
    //               >
    //                 <table className="table table-bordered shadow text-secondary">
    //                   <thead>
    //                     <tr className="bg-success text-center ">
    //                       <th scope="col" className="">
    //                         <input type="checkbox" className="form-check-input" name="" id="" onChange={(e) => HandleCheckAll(e.target.checked)} />
    //                       </th>
    //                       <th scope="col">
    //                         <span className="text-light">Job</span>
    //                       </th>
    //                       <th scope="col">
    //                         <span className="text-light">Position</span>
    //                       </th>
    //                       <th scope="col">
    //                         <span className="text-light">Apply</span>
    //                       </th>
    //                       <th scope="col">
    //                         <span className="text-light">Available</span>
    //                       </th>
    //                       <th scope="col">
    //                         <span className="text-light">Action</span>
    //                       </th>
    //                     </tr>
    //                   </thead>
    //                   <tbody>
    //                     {JobSearch.map((item) => (
    //                       <tr key={item.id} className="">
    //                         <td style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: "0", maxWidth: "0" }}>
    //                           <input type="checkbox" className="form-check-input" name="id" id="checkbox" value={item.id} onChange={(e) => HandleCheckSelected(e.target)} />
    //                         </td>
    //                         <td style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: "auto", maxWidth: "0" }}>{item.name}</td>
    //                         <td style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: "15%", maxWidth: "0" }}>{item.position}</td>
    //                         <td style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: "0", maxWidth: "0" }}>{item.count_apply}</td>
    //                         <td className="text-capitalize" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: "0", maxWidth: "0" }}>
    //                           {item.available}
    //                         </td>
    //                         <td style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: size.width > 991 ? "20%" : "0", maxWidth: "0px" }}>
    //                           <button
    //                             className="btn btn-success w-100"
    //                             onClick={() => {
    //                               setIdJob(item.id);
    //                               setShowMyJob(false);
    //                             }}
    //                           >
    //                             {size.width > 991 ? (
    //                               <Fragment>
    //                                 <FontAwesomeIcon icon={faInfo} />
    //                                 <span className="ps-2">Detail</span>
    //                               </Fragment>
    //                             ) : (
    //                               <Fragment>
    //                                 <FontAwesomeIcon icon={faInfo} />
    //                               </Fragment>
    //                             )}
    //                           </button>
    //                         </td>
    //                       </tr>
    //                     ))}
    //                   </tbody>
    //                 </table>
    //               </div>
    //               <div className="col-12 d-grid">
    //                 <div className="col-12 d-flex d-flex justify-content-between">
    //                   <div className="col-3 d-xl-flex d-lg-flex justify-content-start align-items-center text-start text-secondary">
    //                     <span className="col-3">Sort : </span>

    //                     <Select
    //                       id="table-sort-select"
    //                       instanceId="table-sort-select"
    //                       className="col-9"
    //                       name="sort"
    //                       isSearchable={false}
    //                       placeholder="Sort Table"
    //                       options={SortTable}
    //                       defaultValue={SortTable.map((x, index) => (x.value == sort ? SortTable[index] : null))}
    //                       onChange={(e) => {
    //                         setSort(e.value);
    //                       }}
    //                       theme={(theme) => ({
    //                         ...theme,
    //                         borderRadius: "0.375rem",
    //                         colors: {
    //                           ...theme.colors,
    //                           primary25: "#e9ecef",
    //                           primary: "var(--bs-success)",
    //                           neutral90: "white",
    //                         },
    //                       })}
    //                     />
    //                   </div>

    //                   <div className="col-5 d-xl-flex d-lg-flex justify-content-center align-items-center  text-start text-secondary">
    //                     <span className="col-3">Sort By : </span>

    //                     <Select
    //                       id="table-sortby-select"
    //                       instanceId="table-sortby-select"
    //                       className="col-9"
    //                       name="sortby"
    //                       isSearchable={false}
    //                       placeholder="Sort By Table"
    //                       options={SortByTable}
    //                       defaultValue={SortByTable.map((x, index) => (x.value == sortBy ? SortByTable[index] : null))}
    //                       onChange={(e) => {
    //                         setSortBy(e.value);
    //                       }}
    //                       theme={(theme) => ({
    //                         ...theme,
    //                         borderRadius: "0.375rem",
    //                         colors: {
    //                           ...theme.colors,
    //                           primary25: "#e9ecef",
    //                           primary: "var(--bs-success)",
    //                           neutral90: "white",
    //                         },
    //                       })}
    //                     />
    //                   </div>

    //                   <div className="col-2  d-xl-flex d-lg-flex justify-content-center align-items-center text-start text-secondary">
    //                     <span className="col-3 me-3">Limit: </span>

    //                     <Select
    //                       id="table-limit-select"
    //                       instanceId="table-limit-select"
    //                       className="col-9"
    //                       name="limit"
    //                       isSearchable={false}
    //                       placeholder="Limit Table"
    //                       options={LimitTable}
    //                       defaultValue={LimitTable.map((x, index) => (x.value == limit ? LimitTable[index] : null))}
    //                       onChange={(e) => {
    //                         setLimit(e.value);
    //                       }}
    //                       theme={(theme) => ({
    //                         ...theme,
    //                         borderRadius: "0.375rem",
    //                         colors: {
    //                           ...theme.colors,
    //                           primary25: "#e9ecef",
    //                           primary: "var(--bs-success)",

    //                           neutral90: "white",
    //                         },
    //                       })}
    //                     />
    //                   </div>
    //                 </div>
    //                 {pagination_totalPage > 1 ? (
    //                   <div className="col-12 d-flex justify-content-center align-items-center mt-4">
    //                     <MyPaginationTable setPage={setPage} limit={limit} currentPage={pagination_currentPage} totalPage={pagination_totalPage} />
    //                   </div>
    //                 ) : null}
    //               </div>
    //             </Fragment>
    //           ) : (
    //             <Fragment>
    //               <div className="col-12 ">
    //                 <div
    //                   className="col-12  container-xl container-lg container-md-fluid container-sm-fluid  container-xxl border border-muted rounded my-2 d-grid"
    //                   style={{
    //                     height: `${size.height - 560}px`,
    //                   }}
    //                 >
    //                   <div className="d-grid mx-auto my-auto text-center">
    //                     <FontAwesomeIcon icon={faTriangleExclamation} className="mx-auto text-success" style={{ fontSize: "150px", transform: "rotate(15deg)" }} />
    //                     <span className="mt-3 text-success" style={{ fontSize: "28px" }}>
    //                       Job Not Found
    //                     </span>
    //                   </div>
    //                 </div>
    //               </div>
    //             </Fragment>
    //           )}
    //         </Fragment>
    //       ) : (

    //         <RecruiterTabJobEditJob token={token} refreshToken={refreshToken} role={role} id={id} Skill={Skill} idJob={idJob} setIdJob={setIdJob} setShowMyJob={setShowMyJob} />
    //       )}
    //     </div>
    //   )}
    //   {/* </div> */}
    // </Fragment>
    // <></>

    //

    <Fragment>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center" style={{ height: `${heightJob}px` }}>
          <PreLoaderComponent isLoading={isLoading} />
        </div>
      ) : (
        <div className="container-fluid ">
          <div style={{ display: showMyJob ? "block" : "none" }}>
            <div className="col-12 justify-content-start">
              <h4 className=" fw-bold ">My Job List</h4>
            </div>
            <div className="col-12 d-flex">
              <div className={`${dataCheckBoxValueList ? `col-10 ` : `col-12 `} d-flex border form-input my-3`}>
                <div className="col-11 ">
                  <input className="form-control  border-0 " id="input-search-table" type="search" placeholder="Search" aria-label="Search" defaultValue={keyword} onChange={handleKeywordSearchTable} onKeyPress={handleKeypressSearchTable} />
                </div>
                <div className="col-1 d-flex justify-content-center ">
                  <Image
                    onClick={() => {
                      setKeyword(valueInputKeyword);
                      dispatchGetRecruiterJobMyJob();
                    }}
                    src={IconSearch}
                    width="18px"
                    height="30px"
                    alt=""
                    className="py-0"
                  />
                </div>
              </div>
              <ModalView
                modalType="delete-selected-job"
                setCheckBoxValueList={setCheckBoxValueList}
                dataCheckBoxValueList={dataCheckBoxValueList}
                dispatchGetRecruiterJobMyJob={dispatchGetRecruiterJobMyJob}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                token={token}
                refreshToken={refreshToken}
              />
            </div>

            {JobSearch?.length > 0 ? (
              <Fragment>
                <div
                  className="col-12 h-100 "
                  style={{
                    minHeight: `${size.height - 589}px`,
                  }}
                >
                  <table className="table table-bordered shadow text-secondary">
                    <thead>
                      <tr className="bg-success text-center ">
                        <th scope="col" className="">
                          <input type="checkbox" className="form-check-input" name="" id="" onChange={(e) => HandleCheckAll(e.target.checked)} />
                        </th>
                        <th scope="col">
                          <span className="text-light">Job</span>
                        </th>
                        <th scope="col">
                          <span className="text-light">Position</span>
                        </th>
                        <th scope="col">
                          <span className="text-light">Apply</span>
                        </th>
                        <th scope="col">
                          <span className="text-light">Available</span>
                        </th>
                        <th scope="col">
                          <span className="text-light">Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {JobSearch.map((item) => (
                        <tr key={item.id} className="">
                          <td style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: "0", maxWidth: "0" }}>
                            <input type="checkbox" className="form-check-input" name="id" id="checkbox" value={item.id} onChange={(e) => HandleCheckSelected(e.target)} />
                          </td>
                          <td style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: "auto", maxWidth: "0" }}>{item.name}</td>
                          <td style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: "15%", maxWidth: "0" }}>{item.position}</td>
                          <td style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: "0", maxWidth: "0" }}>{item.count_apply}</td>
                          <td className="text-capitalize" style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: "0", maxWidth: "0" }}>
                            {item.available}
                          </td>
                          <td style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", width: size.width > 991 ? "20%" : "0", maxWidth: "0px" }}>
                            <button
                              className="btn btn-success w-100"
                              onClick={() => {
                                setIdJob(item.id);
                                setShowMyJob(false);
                              }}
                            >
                              {size.width > 991 ? (
                                <Fragment>
                                  <FontAwesomeIcon icon={faInfo} />
                                  <span className="ps-2">Detail</span>
                                </Fragment>
                              ) : (
                                <Fragment>
                                  <FontAwesomeIcon icon={faInfo} />
                                </Fragment>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-12 d-grid">
                  <div className="col-12 d-flex d-flex justify-content-between">
                    <div className="col-3 d-xl-flex d-lg-flex justify-content-start align-items-center text-start text-secondary">
                      <span className="col-3">Sort : </span>

                      <Select
                        id="table-sort-select"
                        instanceId="table-sort-select"
                        className="col-9"
                        name="sort"
                        isSearchable={false}
                        placeholder="Sort Table"
                        options={SortTable}
                        defaultValue={SortTable.map((x, index) => (x.value == sort ? SortTable[index] : null))}
                        onChange={(e) => {
                          setSort(e.value);
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

                    <div className="col-5 d-xl-flex d-lg-flex justify-content-center align-items-center  text-start text-secondary">
                      <span className="col-3">Sort By : </span>

                      <Select
                        id="table-sortby-select"
                        instanceId="table-sortby-select"
                        className="col-9"
                        name="sortby"
                        isSearchable={false}
                        placeholder="Sort By Table"
                        options={SortByTable}
                        defaultValue={SortByTable.map((x, index) => (x.value == sortBy ? SortByTable[index] : null))}
                        onChange={(e) => {
                          setSortBy(e.value);
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

                    <div className="col-2  d-xl-flex d-lg-flex justify-content-center align-items-center text-start text-secondary">
                      <span className="col-3 me-3">Limit: </span>

                      <Select
                        id="table-limit-select"
                        instanceId="table-limit-select"
                        className="col-9"
                        name="limit"
                        isSearchable={false}
                        placeholder="Limit Table"
                        options={LimitTable}
                        defaultValue={LimitTable.map((x, index) => (x.value == limit ? LimitTable[index] : null))}
                        onChange={(e) => {
                          setLimit(e.value);
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
                  </div>
                  {pagination_totalPage > 1 ? (
                    <div className="col-12 d-flex justify-content-center align-items-center mt-4">
                      <MyPaginationTable setPage={setPage} limit={limit} currentPage={pagination_currentPage} totalPage={pagination_totalPage} />
                    </div>
                  ) : null}
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="col-12 ">
                  <div
                    className="col-12  container-xl container-lg container-md-fluid container-sm-fluid  container-xxl border border-muted rounded my-2 d-grid"
                    style={{
                      height: `${size.height - 560}px`,
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
          </div>

          <div style={{ display: !showMyJob ? "block" : "none" }}>
            <RecruiterTabJobEditJob token={token} refreshToken={refreshToken} role={role} id={id} Skill={Skill} idJob={idJob} setIdJob={setIdJob} setShowMyJob={setShowMyJob} />
          </div>
        </div>
      )}
      {/* </div> */}
    </Fragment>
  );
};

export default RecruiterTabJobMyJob;

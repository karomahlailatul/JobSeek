import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getRecruiterJobMyJob } from "../../app/redux/Slice/RecruiterJobMyJobSlice";

import Image from "next/image";

import IconSearch from "../../public/assets/icons/search.svg";
import RecruiterTabJobEditJob from "../RecruiterTabJobEditJob";

import Modal from "../Modal";
import MyPaginationTable from "../PaginationTable";
import PreLoader from "../PreLoader";

const RecruiterTabJobMyJob = () => {
  
  const dispatch = useDispatch();

  const [showMyJob, setShowMyJob] = useState(true);

  const { isLoading, RecruiterJobMyJob, statusCode, pagination_currentPage, pagination_totalData, pagination_limit, pagination_totalPage } = useSelector((state) => state.RecruiterJobMyJob);

  const [keyword, setKeyword] = useState(null);
  
  const [valueInputKeyword, setInputValueKeyword] = useState(null);

  const [sortBy, setSortBy] = useState("created_on");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("10");

  let keywordSearch = `search=${keyword}&`;
  let valueSearch = `sortby=${sortBy}&sort=${sort}&page=${page}&limit=${limit}`;

  const handleKeywordSearchTable = (e) => {
    setInputValueKeyword(e.target.value)
  };

  const handleKeypressSearchTable = (e) => {
    if (e.key == "Enter") {
      setKeyword(valueInputKeyword);
      dispatchGetRecruiterJobMyJob();
    }
  };

  const dispatchGetRecruiterJobMyJob = async () => {
    if (!document.getElementById("input-search-table").value) {
      let valueSenderSearch = valueSearch;
      await dispatch(getRecruiterJobMyJob(valueSenderSearch)).unwrap();
    } else if (keyword) {
      let valueSenderSearch = keywordSearch + valueSearch;
      await dispatch(getRecruiterJobMyJob(valueSenderSearch)).unwrap();
    }
  };

  const [checkBoxValueList, setCheckBoxValueList] = useState([]);

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

  const dataCheckBoxValueList = checkBoxValueList.map((item) => `'${item}'`).toString();


  const HandleCheckSelected = (e) => {
    if (e.checked) {
      setCheckBoxValueList((arr) => [...arr, `${e.value}`]);
    } else {
      setCheckBoxValueList(checkBoxValueList.filter((item) => item !== e.value));
    }
  };

  useEffect(() => {
    dispatchGetRecruiterJobMyJob();

  }, [dispatch, keywordSearch, valueSearch]);

  return (
    <Fragment>
      <PreLoader isLoading={isLoading} />
      <div className="tab-pane fade " id="v-pills-my-job" role="tabpanel" aria-labelledby="v-pills-my-job-tab" data-toggle="button">
        {/* <button onClick={() => setShowMyJob(true)}>show tab list</button>
        <button onClick={() => setShowMyJob(false)}>show edit list</button> */}

        <div className="container-fluid">
          {showMyJob ? (
            <Fragment>
              <div className="col-12 justify-content-start">
                <h4 className=" fw-bold ">
                  My Job List
                </h4>
              </div>
              <div className="col-12 d-flex">
                <div className="col-10 d-flex border border-1  form-input my-3">
                  <div className="col-11 ">
                    <input
                      className="form-control  border-0 "
                      id="input-search-table"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                      defaultValue={keyword}
                      // onChange={(e) => setKeyword(e.target.value)}
                      
                      onChange={handleKeywordSearchTable}
                      onKeyPress={handleKeypressSearchTable}
                    />
                  </div>
                  <div className="col-1 d-flex justify-content-center ">
                    <Image onClick={() => {
                      setKeyword(valueInputKeyword);
                      dispatchGetRecruiterJobMyJob()}
                    } src={IconSearch} width="18px" height="30px" alt="" className="py-0" />
                  </div>
                </div>
                <Modal modalType="delete-selected-job" dataCheckBoxValueList={dataCheckBoxValueList} dispatchGetRecruiterJobMyJob={dispatchGetRecruiterJobMyJob} />
              </div>
              <table className="table table-bordered shadow vh-100">
                <thead>
                  <tr className="table-success text-center">
                    <th scope="col">
                      <input type="checkbox" name="" id="" onChange={(e) => HandleCheckAll(e.target.checked)} />
                    </th>
                    <th scope="col">
                      <span className="text-dark">Name Job</span>
                    </th>
                    <th scope="col">
                      <span className="text-dark">Position</span>
                    </th>
                    <th scope="col">
                      <span className="text-dark">Description</span>
                    </th>
                    <th scope="col">
                      <span className="text-dark">Available</span>
                    </th>
                    <th scope="col">
                      <span className="text-dark">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RecruiterJobMyJob.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center">
                        <input type="checkbox" name="id" id="checkbox" value={item.id} onChange={(e) => HandleCheckSelected(e.target)} />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.position}</td>
                      <td>{item.description}</td>
                      <td>{item.available}</td>

                      <td>
                        <button className="btn btn-success" style={{ marginRight: "10px" }}>
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="col-12 d-flex mt-5">
                <div className="col-5 d-flex justify-content-center align-items-center my-auto">
                  <MyPaginationTable setPage={setPage} currentPage={pagination_currentPage} totalPage={pagination_totalPage} />
                </div>
                <div className="col-2 d-flex justify-content-center align-items-start px-2 ">
                  <select
                    className="form-select"
                    onChange={(e) => {
                      setSort(e.target.value);
                    }}
                    aria-label="form-select-sort"
                  >
                    <option value="DESC">Latest</option>
                    <option value="ASC">Oldest</option>
                  </select>
                </div>
                <div className="col-3 d-flex justify-content-center align-items-start px-2 ">
                <select
                    className="form-select"
                    onChange={(e) => {
                      setSortBy(e.target.value);
                    }}
                    aria-label="form-select-sortby"
                  >
                    <option value="name">Name Job</option>
                    <option value="position">Position Job</option>
                    <option value="domicile">Domicile Job</option>
                    <option value="type">Type Job</option>
                    <option value="created_on">First Create</option>
                    <option value="updated_on">Latest Update</option>
                  </select>
                </div>
                <div className="col-2 d-flex justify-content-center align-items-start px-2 ">
                <select
                    className="form-select"
                    onChange={(e) => {
                      setLimit(e.target.value);
                    }}
                    aria-label="form-select-limit"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
              
            </Fragment>
          ) : (
            <RecruiterTabJobEditJob />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default RecruiterTabJobMyJob;

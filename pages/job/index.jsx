import { useEffect, Fragment } from "react";
// import { useSearchParams } from "react-router-dom";

import Form from "react-bootstrap/Form";

import { useDispatch, useSelector } from "react-redux";

import { getJobSearch } from "../../app/redux/Slice/JobSearchSlice";

import MyPagination from "../../components/Pagination";
// import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import { useRouter } from "next/router";

const SearchRecipes = () => {
  const router = useRouter();
  // console.log(router.query.keyword);
  
  let keywordParamSearch = router.query.keyword 

  let sortbyParamSearch =  router.query.sortby || "created_on";
  let sortParamSearch =  router.query.sort || "desc";
  let pageParamSearch =   router.query.page || "1";
  let limitParamSearch =  router.query.limit  || "24";

  // console.log(keywordParamSearch)
  // console.log(sortbyParamSearch)
  // console.log(sortParamSearch)
  // console.log(sortbyParamSearch)
  // console.log(limitParamSearch)


  let keywordSearch = `search=${keywordParamSearch}&`;
  let valueSearch = `sortby=${sortbyParamSearch}&sort=${sortParamSearch}&page=${pageParamSearch}&limit=${limitParamSearch}`;

  const dispatch = useDispatch();
  const {
    JobSearch,
    // statusCode,
    pagination_currentPage,
    pagination_totalData,
    //  pagination_limit,
    pagination_totalPage,
  } = useSelector((state) => state.JobSearch);


  const dispatchGetCategoryRecipes = async () => {
    // if (!document.getElementById("input-search").value) {
    //   let valueSenderSearch = valueSearch;
    //   await dispatch(getSearchRecipes(valueSenderSearch)).unwrap();
    // } else if (document.getElementById("input-search").value) {
    //   let valueSenderSearch = keywordSearch + valueSearch;
    //   await dispatch(getSearchRecipes(valueSenderSearch)).unwrap();
    // }

    if (!document.getElementById("input-search").value) {
      let valueSenderSearch = valueSearch;
      await dispatch(getJobSearch(valueSenderSearch)).unwrap();
    } else if (keywordParamSearch !== null) {
      let valueSenderSearch = keywordSearch + valueSearch;
      await dispatch(getJobSearch(valueSenderSearch)).unwrap();
    }
  };

  useEffect(() => {
    dispatchGetCategoryRecipes();
  }, [router, keywordSearch, valueSearch]);



  // const [searchParams, setSearchParams] = useSearchParams();
  // let keywordParamSearch = searchParams.get("keyword");

  // let sortbyParamSearch = searchParams.get("sortby") || "created_on";
  // let sortParamSearch = searchParams.get("sort") || "desc";
  // let pageParamSearch = searchParams.get("page") || "1";
  // let limitParamSearch = searchParams.get("limit") || "24";

  // let keywordSearch = `search=${keywordParamSearch}&`;
  // let valueSearch = `sortby=${sortbyParamSearch}&sort=${sortParamSearch}&page=${pageParamSearch}&limit=${limitParamSearch}`;

  // const dispatch = useDispatch();
  // const {
  //   SearchRecipes,
  //   // statusCode,
  //   pagination_currentPage,
  //   pagination_totalData,
  //   //  pagination_limit,
  //   pagination_totalPage,
  // } = useSelector((state) => state.JobSearch);


  // const dispatchGetCategoryRecipes = async () => {
  //   // if (!document.getElementById("input-search").value) {
  //   //   let valueSenderSearch = valueSearch;
  //   //   await dispatch(getSearchRecipes(valueSenderSearch)).unwrap();
  //   // } else if (document.getElementById("input-search").value) {
  //   //   let valueSenderSearch = keywordSearch + valueSearch;
  //   //   await dispatch(getSearchRecipes(valueSenderSearch)).unwrap();
  //   // }

  //   if (!document.getElementById("input-search").value) {
  //     let valueSenderSearch = valueSearch;
  //     await dispatch(getJobSearch(valueSenderSearch)).unwrap();
  //   } else if (keywordParamSearch !== null) {
  //     let valueSenderSearch = keywordSearch + valueSearch;
  //     await dispatch(getJobSearch(valueSenderSearch)).unwrap();
  //   }
  // };

  // useEffect(() => {
  //   dispatchGetCategoryRecipes();
  // }, [searchParams, keywordSearch, valueSearch]);

  return (
    <Fragment>
      <section>
        <div className="container mt-5 ">
          <div className="row-new">
            <div className="row">
              <div className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid ">
                <div className="col-xxl-8 col-xl-7 col-lg-6 col-md-12 col-sm-12">
                  {keywordParamSearch !== null ? (
                    <div>
                      <h1 className="fw-bold">Find : {keywordParamSearch}</h1>
                      <p className="fs-6 text-muted">
                        Total Job Available {pagination_totalData}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h1 className="fw-bold">Search All Job </h1>
                      <p className="fs-6 text-muted">
                        Total Job Available {pagination_totalData}
                      </p>
                    </div>
                  )}
                </div>
                <div className="d-flex col-xxl-4 col-xl-5 col-lg-6 col-md-12 col-sm-12">
                  <div className="col-8 d-flex align-items-center">
                    <Form.Select
                      className="w-100 me-2 ShadowBox"
                      onChange={(e) => {
                        if (keywordParamSearch === null) {
                          // setSearchParams({
                          //   sort: [e.target.value],
                          //   page: 1,
                          //   limit: limitParamSearch,
                          // });
                          router.push({
                            pathname: `/job`,
                            query: {
                  
                              sort: [e.target.value],
                              page: 1,
                              limit: limitParamSearch,
                            },
                          });
                        } else {
                          // setSearchParams({
                          //   keyword: keywordParamSearch,
                          //   sort: [e.target.value],
                          //   page: 1,
                          //   limit: limitParamSearch,
                          // });
                          router.push({
                            pathname: `/job`,
                            query: {
                              keyword: keywordParamSearch,
                              sort: [e.target.value],
                              page: 1,
                              limit: limitParamSearch,
                            },
                          });
                        }
                      }}
                    >
                      <option value="desc">New Job Created</option>
                      <option value="asc">Oldest Job Created</option>
                    </Form.Select>
                  </div>
                  <div className="col-4 d-flex align-items-center">
                    <Form.Select
                      className="w-100  ShadowBox"
                      onChange={(e) => {
                        if (keywordParamSearch === null) {
                          // setSearchParams({
                          //   sort: sortParamSearch,
                          //   page: 1,
                          //   limit: [e.target.value],
                          // });
                          router.push({
                            pathname: `/job`,
                            query: {
                              sort: sortParamSearch,
                              page: 1,
                              limit: [e.target.value],
                            },
                          });
                        } else {
                          // setSearchParams({
                          //   keyword: keywordParamSearch,
                          //   sort: sortParamSearch,
                          //   page: 1,
                          //   limit: [e.target.value],
                          // });
                          router.push({
                            pathname: `/job`,
                            query: {
                              keyword: keywordParamSearch,
                              sort: sortParamSearch,
                              page: 1,
                              limit: [e.target.value],
                            },
                          });
                        }
                      }}
                    >
                      <option className="option-box" value="24">
                        Show 24
                      </option>
                      <option className="option-box" value="48">
                        Show 48
                      </option>
                      <option className="option-box" value="84">
                        Show 84
                      </option>
                    </Form.Select>
                  </div>
                </div>
              </div>

              <div className="col-12 my-3">
                <div className="row d-flex">
                  <Fragment>
                    {JobSearch.map((item) => (
                      <Link
                        className="col-xl-4 col-lg-4 col-md-6 col-sm-6 my-2 link-product text-decoration-none"
                        href={`/job/${item.id}`}
                        key={item.id}
                      >
                        <Card className="container border rounded align-items-center ShadowBox">
                          <div key={item.id}>
                            <div className="d-flex justify-content-center out-img-recipes">
                              <img
                                className="img-recipes"
                                referrerPolicy="no-referrer"
                                src={item.photo_id}
                                alt=""
                              />
                            </div>
                            <h5 className="text-dark fw-bold title-recipes">
                              {item.name}
                            </h5>
                            <p className="text-muted text-description-search">
                              {" "}
                              {item.description}
                            </p>
                            <div className="d-flex justify-content-center">
                              <button className="btn btn-warning  mt-xl-5 mt-lg-5 mt-md-2 mt-sm-2 text-light mb-3">
                                Learn More
                              </button>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))}
                  </Fragment>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center my-3">
                <MyPagination
                  total={pagination_totalPage}
                  current={pagination_currentPage}
                  // onChangePage={(e) => handleChangePage}
                  // keywordParam = {keywordParam}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default SearchRecipes;

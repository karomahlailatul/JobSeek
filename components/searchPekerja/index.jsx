import Head from "next/head";
import React, { useEffect, Fragment } from "react";

import Footer from "../../components/footer/index";
//import { SwiperSlide } from "swiper";

const SearchPekerja = () => {
  return (
    <div>
      <Fragment>
        <div className="container ">
          <div className="container mt-5 ">
            <div className="row-new">
              <div className="row">
                <div className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid ">
                  <div className="col-xxl-8 col-xl-7 col-lg-6 col-md-12 col-sm-12">
                    {/* {keywordParamSearch !== null ? (
                      <div>
                        <h1 className="fw-bold">Find : {keywordParamSearch}</h1>
                        <p className="fs-6 text-muted">
                          Total Recipes {pagination_totalData}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h1 className="fw-bold">Show All Recipes</h1>
                        <p className="fs-6 text-muted">
                          Total Recipes {pagination_totalData}
                        </p>
                      </div>
                    )} */}
                  </div>
                  <div className="d-flex col-xxl-4 col-xl-5 col-lg-6 col-md-12 col-sm-12">
                    <div className="col-8 d-flex align-items-center">
                      {/* <Form.Select
                      className="w-100 me-2 ShadowBox"
                      onChange={(e) => {
                        if (keywordParamSearch === null) {
                          setSearchParams({
                            sort: [e.target.value],
                            page: 1,
                            limit: limitParamSearch,
                          });
                        } else {
                          setSearchParams({
                            keyword: keywordParamSearch,
                            sort: [e.target.value],
                            page: 1,
                            limit: limitParamSearch,
                          });
                        }
                      }}
                    >
                      <option value="desc">New Recipes</option>
                      <option value="asc">Oldest Recipes</option>
                    </Form.Select> */}
                    </div>
                    <div className="col-4 d-flex align-items-center">
                      {/* <Form.Select
                      className="w-100  ShadowBox"
                      onChange={(e) => {
                        if (keywordParamSearch === null) {
                          setSearchParams({
                            sort: sortParamSearch,
                            page: 1,
                            limit: [e.target.value],
                          });
                        } else {
                          setSearchParams({
                            keyword: keywordParamSearch,
                            sort: sortParamSearch,
                            page: 1,
                            limit: [e.target.value],
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
                    </Form.Select> */}
                    </div>
                  </div>
                </div>

                <div className="col-12 my-3">
                  <div className="row d-flex">
                    <Fragment>
                      {/* {SearchRecipes.map((item) => (
                      <Link className="col-xl-4 col-lg-4 col-md-6 col-sm-6 my-2 link-product text-decoration-none" to={`../recipes/${item.id}`} key={item.id}>
                        <Card className="container border rounded align-items-center ShadowBox">
                          <div key={item.id}>
                            <div className="d-flex justify-content-center out-img-recipes">
                              <img className="img-recipes" referrerPolicy="no-referrer" src={item.photo_id} alt="" />
                            </div>
                            <h5 className="text-dark fw-bold title-recipes">{item.name}</h5>
                            <p className="text-muted text-description-search"> {item.description}</p>
                            <div className="d-flex justify-content-center">
                              <button className="btn btn-warning rounded-pill mt-xl-5 mt-lg-5 mt-md-2 mt-sm-2 text-light mb-3">Learn More</button>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    ))} */}
                    </Fragment>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center my-3">
                  {/* <MyPagination
                  total={pagination_totalPage}
                  current={pagination_currentPage}
             
                /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};

export default SearchPekerja;

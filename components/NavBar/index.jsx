import React, { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";
import ImageNavbar from "../../assets/images/peworld_jingga.png";
import IconSearch from "../../public/assets/icons/search.svg";
import PhotoEmpty from "../../public/assets/icons/ico-user.svg";

import useWindowSize from "../WindowsSize";

import axios from "axios";

const NavBar = () => {
  const user_picture = "";

  // let isAuth = "";
  const [isAuth, setIsAuth] = useState("");

  const router = useRouter();

  const expand = "lg";

  // const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const size = useWindowSize();

  const [profileUser, setProfileUser] = useState([]);
  const getDataProfile = async () => {
    if (isAuth) {
      await axios
        .get(process.env.REACT_APP_API_BACKEND + "users/profile", {
          headers: {
            Authorization: `Bearer ${isAuth}`,
            "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
          },
        })
        .then((response) => {
          setProfileUser(response.data.data);
          //   console.log(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // console.log(profileUser)

  const handleSearch = (e) => {
    setSearch(e.currentTarget.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search !== "") {
      setSearchParams({
        keyword: search,
      });
    }
  };

  const [show, setShow] = useState(false);
  const toggleOffcanvas = () => {
    setShow(!show);
  };

  const handleSignOut = () => {
    setIsAuth("");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  const pictureThumbnails = (
    <span>
      <Image
        className="pictureThumbnails"
        referrerPolicy="no-referrer"
        src={
          profileUser.picture === null || profileUser.picture === undefined
            ? "/assets/icons/ico-user.svg"
            : profileUser.picture
        }
        width={24}
        height={24}
        layout="fixed"
        // src={"/assets/icons/ico-user.svg"}
        alt=""
      />
    </span>
  );

  useEffect(() => {
    // dispatchProfileUser();
    getDataProfile();
    setIsAuth(localStorage.getItem("token"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <Fragment>
      <Navbar
        key={expand}
        bg="white"
        expand={expand}
        className="mb-5 shadow"
      >
        <Container fluid="sm">
          <Navbar.Brand className="me-5">
            <a
              onClick={() => {
                router.push("/");
              }}
              className="col-lg-3 col-md-3 col-sm-3 cursor-pointer"
            >
              <Image
                src={"/assets/logo_colour.svg"}
                width="180px"
                height="45px"
                alt=""
                layout="fixed"
              />
            </a>
          </Navbar.Brand>

          <Navbar.Toggle
            onClick={toggleOffcanvas}
            aria-controls={`offcanvasNavbar-expand-${expand}`}
          />

          <Navbar.Offcanvas
            show={show}
            id={`offcanvasNavbar-expand-${"expand"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="bottom"
          >
            <Offcanvas.Header className="ShadowBox">
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-${expand}`}
                className="col-12 d-flex justify-content-between"
              >
                <div
                  onClick={() => {
                    if (size <= 992) {
                      toggleOffcanvas();
                      router.push("/home");
                    } else router.push("/home");
                  }}
                  className="col-lg-3 col-md-3 col-sm-3 link-redirect"
                >
                  <Image
                    src={"/assets/logo_colour.svg"}
                    width="120px"
                    height="30px"
                    className="App-logo"
                    alt=""
                  />
                </div>
                <div
                  className="btn-close-offcanvas "
                  onClick={toggleOffcanvas}
                ></div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {isAuth ? (
                router.pathname === "/profile/recuiter" ? (
                  <Fragment>
                    {/* Navbar Recuiter Auth */}
                    <div className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid ">
                      {size.width <= 992 ? (
                        <Fragment>
                          {/* <div className="col-xl-8 col-lg-8">
                        </div>

                        <div className="d-grid ">
                          <div className="col-12 d-flex mt-4">
                            <div className="col-2 border border-0 rounded-3 d-flex justify-content-center align-items-center block">
                              <img
                                className="photoSide"
                                crossOrigin="anonymous"
                                src={(seller_logo === null || seller_logo === undefined ? PhotoEmpty : seller_logo)} alt="" 
                                />
                            </div>
                            <div className="col-8">
                              <h5 className="fw-bold text-muted">email</h5>
                              <p className="text-muted">UID Seller : </p>
                            </div>
                            <div className="col-2 d-flex ">
                              <div className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block" type="button">
                               </div>
                              <div className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block" type="button">
                              </div>
                            </div>
                          </div>

                          <div className="col-12 d-grid mt-4">
                            <Button
                              variant="outline-danger"
                              onClick={() => {
                                router.push("/profile/seller");
                                toggleOffcanvas();
                              }}
                              className=" rounded-pill block  "
                              type="button"
                            >
                              <p className="my-auto"> My Profile Seller</p>
                            </Button>
                          </div>

                          <Nav.Link>
                            <div className="col-12 d-grid mt-4">
                              <Button
                                variant="outline-danger"
                                onClick={() => {
                                  router.push("/profile/user");
                                  toggleOffcanvas();
                                }}
                                className=" rounded-pill block  "
                                type="button"
                              >
                                <p className="my-auto"> Switch to User</p>
                              </Button>
                            </div>
                          </Nav.Link>

                          <div className="col-12 d-grid mt-4">
                            <Button
                              variant="danger"
                              onClick={() => {
                                router.push("/home");
                                toggleOffcanvas();
                                handleSignOut();
                              }}
                              className=" rounded-pill block  "
                              type="button"
                            >
                              <p className="my-auto">Sign Out</p>
                            </Button>
                          </div>
                        </div> */}
                        </Fragment>
                      ) : (
                        <Fragment>
                          {/* <div className="col-xl-10 col-lg-10">
                          
                        </div>

                        <div className="col-xl-2 col-lg-2 d-flex">
                          <div className="col-8 d-flex ">
                            <div className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block" type="button">
                              <img className="ico" src={require("../../assets/images/icons/bell.svg").default} alt="" />
                            </div>
                            <div className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block" type="button">
                              <img className="ico" src={require("../../assets/images/icons/mail.svg").default} alt="" />
                            </div>
                          </div>
                          <div className="col-4 d-flex justify-content-center align-items-center block">
                            <NavDropdown title={logoThumbnails} align="end" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                              <NavDropdown.Header className="d-grid ">
                                <p className="mb-0 fw-bold">email</p>
                                <p className="mb-0">
                                  <small> UID Seller : email</small>
                                </p>
                              </NavDropdown.Header>
                              <NavDropdown.Divider />
                              <NavDropdown.Item
                                onClick={() => {
                                  router.push("/profile/seller");
                                }}
                              >
                                My Profile Seller
                              </NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item
                                onClick={() => {
                                  router.push("/profile/user");
                                }}
                              >
                                Switch to User
                              </NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item
                                onClick={() => {
                                  router.push("/home");
                                  handleSignOut();
                                }}
                              >
                                Sign Out
                              </NavDropdown.Item>
                            </NavDropdown>
                          </div>
                        </div> */}
                        </Fragment>
                      )}
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    {/* Navbar User Auth */}
                    <div className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid ">
                      {size.width <= 992 ? (
                        <Fragment>
                          <div className="col-xl-8 col-lg-8">
                            <Form
                              onSubmit={handleSearchSubmit}
                              className="form-search d-flex"
                            >
                              <div className="col-12 d-flex border border-1 rounded-pill form-input">
                                <div className="col-11">
                                  <input
                                    className="form-control rounded-pill border-0 "
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    onChange={handleSearch}
                                  />
                                </div>
                                <Button
                                  onClick={() => {
                                    router.push("/find-job?" + searchParams);
                                  }}
                                  className="bg-transparent border-0 px-0 py-0"
                                  type="submit"
                                >
                                  <Image
                                    src={IconSearch}
                                    width="18x"
                                    height="18px"
                                    alt=""
                                    // layout=""
                                    className="icon-search"
                                  />
                                </Button>
                              </div>
                            </Form>
                          </div>

                          <div className="d-grid ">
                            <div className="col-12 d-flex mt-4">
                              <div className="col-2 border border-0 rounded-3 d-flex justify-content-center align-items-center block">
                                {/* <img className="photoSide" crossOrigin="anonymous" 
                              // src={user_picture} alt="" 
                              src={(user_picture === null || user_picture === undefined ? PhotoEmpty : user_picture)} alt="" 
                              /> */}

                                <Image
                                  className="photoSide"
                                  referrerPolicy="no-referrer"
                                  src={
                                    profileUser.picture === null ||
                                    profileUser.picture === undefined
                                      ? "/assets/icons/ico-user.svg"
                                      : profileUser.picture
                                  }
                                  width={72}
                                  height={72}
                                  layout="fixed"
                                  // src={"/assets/icons/ico-user.svg"}
                                  alt=""
                                />
                              </div>
                              <div className="col-8">
                                <h5 className="fw-bold text-muted">
                                  {profileUser.email}
                                </h5>
                                <p className="text-muted">
                                  UID : {profileUser.id}
                                </p>
                              </div>
                              <div className="col-2 d-flex ">
                                <div
                                  className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block"
                                  type="button"
                                >
                                  {/* <img className="ico" src={require("../../assets/images/icons/bell.svg").default} alt="" /> */}
                                  <Image
                                    className="pictureThumbnails"
                                    referrerPolicy="no-referrer"
                                    width={24}
                                    height={24}
                                    layout="fixed"
                                    src={"/assets/icons/bell.svg"}
                                    alt=""
                                  />
                                </div>
                                <div
                                  className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block"
                                  type="button"
                                >
                                  {/* <img className="ico" src={require("../../assets/images/icons/mail.svg").default} alt="" /> */}
                                  <Image
                                    className="pictureThumbnails"
                                    referrerPolicy="no-referrer"
                                    width={24}
                                    height={24}
                                    layout="fixed"
                                    src={"/assets/icons/mail.svg"}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-12 d-grid mt-4">
                              <Button
                                variant="outline-success"
                                onClick={() => {
                                  router.push("/profile/users");
                                  toggleOffcanvas();
                                }}
                                className=" rounded-pill block  "
                                type="button"
                              >
                                <p className="my-auto"> My Profile</p>
                              </Button>
                            </div>

                            <Nav.Link>
                              <div className="col-12 d-grid mt-4">
                                <Button
                                  variant="outline-success"
                                  onClick={() => {
                                    router.push("/profile/recuiter");
                                    toggleOffcanvas();
                                  }}
                                  className=" rounded-pill block  "
                                  type="button"
                                >
                                  <p className="my-auto"> Switch to Recuiter</p>
                                </Button>
                              </div>
                            </Nav.Link>

                            <div className="col-12 d-grid mt-4">
                              <Button
                                variant="warning text-light"
                                onClick={() => {
                                  router.push("/");
                                  toggleOffcanvas();
                                  handleSignOut();
                                }}
                                className=" rounded-pill block  "
                                type="button"
                              >
                                <p className="my-auto">Sign Out</p>
                              </Button>
                            </div>
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <div className="col-xl-8 col-lg-8">
                            <Form
                              onSubmit={handleSearchSubmit}
                              className="form-search d-flex"
                            >
                              <div className="col-11 d-flex border border-1 rounded-pill form-input">
                                <div className="col-11">
                                  <input
                                    className="form-control rounded-pill border-0 "
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    onChange={handleSearch}
                                  />
                                </div>
                                <Button
                                  onClick={() => {
                                    router.push("/find-job?" + searchParams);
                                  }}
                                  className="bg-transparent border-0 py-0"
                                  type="submit"
                                >
                                  <Image
                                    src={IconSearch}
                                    width="18px"
                                    height="18px"
                                    alt=""
                                    // layout=""
                                    className="icon-search py-0"
                                  />
                                </Button>
                              </div>
                            </Form>
                          </div>
                          <div className="col-xl-2 col-lg-2">
                          </div>
                          <div className="col-xl-2 col-lg-2 d-flex">
                            <div className="col-8 d-flex ">
                              <div
                                className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block"
                                type="button"
                              >
                                <Image
                                  className="pictureThumbnails"
                                  referrerPolicy="no-referrer"
                                  width={24}
                                  height={24}
                                  layout="fixed"
                                  src={"/assets/icons/bell.svg"}
                                  alt=""
                                />
                              </div>
                              <div
                                className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block"
                                type="button"
                              >
                                <Image
                                  className="pictureThumbnails"
                                  referrerPolicy="no-referrer"
                                  width={24}
                                  height={24}
                                  layout="fixed"
                                  src={"/assets/icons/mail.svg"}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="col-4 d-flex justify-content-center align-items-center block">
                              <NavDropdown
                                title={pictureThumbnails}
                                align="end"
                                id={`offcanvasNavbarDropdown-expand-${expand}`}
                              >
                                <NavDropdown.Header className="d-grid ">
                                  <p className="mb-0 fw-bold">
                                    {profileUser.email}{" "}
                                  </p>
                                  <p className="mb-0">
                                    <small> UID : {profileUser.id}</small>
                                  </p>
                                </NavDropdown.Header>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                  onClick={() => {
                                    router.push("/profile/users");
                                  }}
                                >
                                  My Profile
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                  onClick={() => {
                                    router.push("/profile/recuiter");
                                  }}
                                >
                                  Switch to Recuiter
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                  onClick={() => {
                                    router.push("/");
                                    handleSignOut();
                                  }}
                                >
                                  Sign Out
                                </NavDropdown.Item>
                              </NavDropdown>
                            </div>
                          </div>
                        </Fragment>
                      )}
                    </div>
                  </Fragment>
                )
              ) : (
                <Fragment>
                  {/* Navbar User No Auth */}
                  <div className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid ">
                    {size.width <= 992 ? (
                      <Fragment>
                        <div className="col-xl-8 col-lg-8">
                          <Form
                            onSubmit={handleSearchSubmit}
                            className="form-search d-flex"
                          >
                            <div className="col-12 d-flex border border-1 rounded-pill form-input">
                              <div className="col-11">
                                <input
                                  className="form-control rounded-pill border-0 "
                                  type="search"
                                  placeholder="Search"
                                  aria-label="Search"
                                  onChange={handleSearch}
                                />
                              </div>
                              <Button
                                onClick={() => {
                                  router.push("/find-job?" + searchParams);
                                }}
                                className="bg-transparent border-0 px-0 py-0"
                                type="submit"
                              >
                                <Image
                                  src={IconSearch}
                                  width="18x"
                                  height="18px"
                                  alt=""
                                  // layout=""
                                  className="icon-search"
                                />
                              </Button>
                            </div>
                          </Form>
                        </div>
                        <div className="d-flex mt-4 ">
                          <div className="col-6 d-grid px-2">
                            <Button
                              variant="success"
                              onClick={() => {
                                router.push("/sign-in");
                                toggleOffcanvas();
                              }}
                              className=" rounded-pill block "
                              type="button"
                            >
                              <p className="my-auto">Login</p>
                            </Button>
                          </div>
                          <div className="col-6 d-grid">
                            <Button
                              variant="outline-success"
                              onClick={() => {
                                router.push("/sign-up");
                                toggleOffcanvas();
                              }}
                              className=" rounded-pill block  "
                              type="button"
                            >
                              <p className="my-auto"> Sign Up</p>
                            </Button>
                          </div>
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className="col-xl-8 col-lg-8">
                          <Form
                            onSubmit={handleSearchSubmit}
                            className="form-search d-flex"
                          >
                            <div className="col-11 d-flex border border-1 rounded-pill form-input">
                              <div className="col-11">
                                <input
                                  className="form-control rounded-pill border-0 "
                                  type="search"
                                  placeholder="Search"
                                  aria-label="Search"
                                  onChange={handleSearch}
                                />
                              </div>
                              <Button
                                onClick={() => {
                                  router.push("/find-job?" + searchParams);
                                }}
                                className="bg-transparent border-0 py-0"
                                type="submit"
                              >
                                <Image
                                  src={IconSearch}
                                  width="18px"
                                  height="18px"
                                  alt=""
                                  // layout=""
                                  className="icon-search py-0"
                                />
                              </Button>
                            </div>
                          </Form>
                        </div>
                        <div className="col-xl-4 col-lg-4 d-flex">
                          <div className="col-6 d-grid px-2">
                            <Button
                              variant="success"
                              onClick={() => {
                                router.push("/sign-in");
                              }}
                              className=" rounded-pill block "
                              type="button"
                            >
                              <p className="my-auto">Login</p>
                            </Button>
                          </div>
                          <div className="col-6 d-grid">
                            <Button
                              variant="outline-success"
                              onClick={() => {
                                router.push("/sign-up");
                              }}
                              className=" rounded-pill block  "
                              type="button"
                            >
                              <p className="my-auto"> Sign Up</p>
                            </Button>
                          </div>
                        </div>
                      </Fragment>
                    )}
                  </div>
                </Fragment>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default NavBar;

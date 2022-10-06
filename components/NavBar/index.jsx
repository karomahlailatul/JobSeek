import { useState, Fragment, useEffect } from "react";
import Router, { useRouter } from "next/router";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

import Image from "next/image";
import IconSearch from "../../public/assets/icons/search.svg";

import useWindowSize from "../WindowsSize";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import { getNavBarUsers } from "../../app/redux/Slice/NavBarUsersSlice";

const NavigationBar = () =>
  // { id, role, token, refreshToken, lockCredential }
  {
    const dispatch = useDispatch();

    const size = useWindowSize();
    const router = useRouter();

    const expand = "lg";

    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [role, setRole] = useState(null);
    const [id, setId] = useState(null);
    const [lockCredential, setLockCredential] = useState(null);

    const [valueSearch, setValueSearch] = useState("");
    const [showOffCanvas, setShowOffcanvas] = useState(false);

    const dispatchGetNavBarUsers = async () => {
      await dispatch(getNavBarUsers()).unwrap();
    };

    const { NavBarUsers, isLoading } = useSelector((state) => state.NavBarUsers);

    const handleSignOut = () => {
      setToken("");
      setRefreshToken("");
      setRole("");
      setId("");
      Cookies.remove("id");
      Cookies.remove("role");
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      Cookies.remove("lockCredential");
    };

    const pictureThumbnails = (
      <span>
        <Image className="pictureThumbnails" referrerPolicy="no-referrer" src={NavBarUsers.picture === null || NavBarUsers.picture === undefined ? "/assets/icons/ico-user.svg" : NavBarUsers.picture} width={24} height={24} layout="fixed" alt="" />
      </span>
    );

    const handleSearching = (valueSearch) => {
      // await e.preventDefault();
      if (valueSearch !== "") {
        Router.push({
          pathname: `/job`,
          query: {
            keyword: `${valueSearch}`,
          },
        });
      }
    };

    const handleKeypressSearch = (e) => {
      if (e.key == "Enter" && size.width <= 992) {
        handleSearching(valueSearch);
        setShowOffcanvas(false);
      } else if (e.key == "Enter" && size.width >= 992) {
        handleSearching(valueSearch);
      }
    };

    useEffect(() => {
      dispatchGetNavBarUsers();

      setToken(Cookies.get("token"));
      setRefreshToken(Cookies.get("refreshToken"));
      setRole(Cookies.get("role"));
      setId(Cookies.get("id"));
      setLockCredential(Cookies.get("lockCredential"));

      if (size.width >= 992 && showOffCanvas) {
        setShowOffcanvas(false);
      }
    }, [dispatch, router, token, refreshToken, role, id, lockCredential, size.width]);

    return (
      <Fragment>
        <Navbar key={expand} bg="white" expand={expand} className="mb-5 shadow">
          <Container fluid="sm">
            <Navbar.Brand className="me-5">
              <a
                onClick={() => {
                  router.push("/");
                  dispatchGetNavBarUsers();
                }}
                className="col-lg-3 col-md-3 col-sm-3 cursor-pointer"
              >
                <Image src={"/assets/logo_colour.svg"} width="180px" height="45px" alt="" layout="fixed" />
              </a>
            </Navbar.Brand>

            <Navbar.Toggle onClick={() => setShowOffcanvas(true)} aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas show={showOffCanvas} id={`offcanvasNavbar-expand-${"expand"}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="bottom">
              <Offcanvas.Header className="ShadowBox">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className="col-12 d-flex justify-content-between">
                  <div
                    onClick={() => {
                      if (size <= 992) {
                        setShowOffcanvas(false);
                        router.push("/");
                        dispatchGetNavBarUsers();
                      } else {
                        setShowOffcanvas(false);
                        router.push("/");
                        dispatchGetNavBarUsers();
                      }
                    }}
                    className="col-lg-3 col-md-3 col-sm-3 link-redirect"
                  >
                    <Image src={"/assets/logo_colour.svg"} width="120px" height="30px" className="App-logo" alt="" />
                  </div>
                  <div className="btn-close-offcanvas " onClick={() => setShowOffcanvas(false)}></div>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {
                  isLoading ? (
                    <div className="col-12 d-flex justify-content-end">
                      <div className="">
                        <div className="spinner-border text-success" style={{ width: "2rem", height: "2rem", opacity: "0.8" }} role="status"></div>
                      </div>
                    </div>
                  ) : // {
                   ( token && refreshToken && role && id && lockCredential ? (
                    
                      <Fragment>
                        {/* Navbar User Auth */}
                        <div className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid ">
                          {/* Navbar User Auth Mobile */}
                          {size.width <= 992 ? (
                            <Fragment>
                              <div className="col-xl-8 col-lg-8">
                                <div className="col-12 d-flex border border-1 rounded-pill form-input">
                                  <div className="col-11">
                                    <input
                                      className="form-control rounded-pill border-0 "
                                      id="input-search"
                                      type="search"
                                      placeholder="Search"
                                      aria-label="Search"
                                      defaultValue={router.query.keyword ? router.query.keyword : null}
                                      onChange={(e) => setValueSearch(e.target.value)}
                                      onKeyPress={handleKeypressSearch}
                                    />
                                  </div>
                                  <div className="col-1 d-flex justify-content-center">
                                    <Image onClick={() => handleSearching(valueSearch)} src={IconSearch} width="18px" height="30px" alt="" className="py-0" />
                                  </div>
                                </div>
                              </div>

                              <div className="d-grid ">
                                <div className="col-12 d-flex mt-4">
                                  <div className="col-2 border border-0 rounded-3 d-flex justify-content-center align-items-center block">
                                    <Image
                                      className="photoSide"
                                      referrerPolicy="no-referrer"
                                      src={NavBarUsers.picture === null || NavBarUsers.picture === undefined ? "/assets/icons/ico-user.svg" : NavBarUsers.picture}
                                      width={72}
                                      height={72}
                                      layout="fixed"
                                      alt=""
                                    />
                                  </div>
                                  <div className="col-8">
                                    <h5 className="fw-bold text-muted">{NavBarUsers.email}</h5>
                                    <p className="text-muted">UID : {NavBarUsers.id}</p>
                                  </div>
                                  <div className="col-2 d-flex ">
                                    <div className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block" type="button">
                                      <Image className="pictureThumbnails" referrerPolicy="no-referrer" width={24} height={24} layout="fixed" src={"/assets/icons/bell.svg"} alt="" />
                                    </div>
                                    <div className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block" type="button">
                                      <Image className="pictureThumbnails" referrerPolicy="no-referrer" width={24} height={24} layout="fixed" src={"/assets/icons/mail.svg"} alt="" />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-12 d-grid mt-4">
                                  <Button
                                    variant="outline-success"
                                    onClick={() => {
                                      router.push("/users/profile");
                                      setShowOffcanvas(false);
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
                                        router.push("/recruiter/profile");
                                        setShowOffcanvas(false);
                                      }}
                                      className=" rounded-pill block  "
                                      type="button"
                                    >
                                      <p className="my-auto"> Profile Recruiter</p>
                                    </Button>
                                  </div>
                                </Nav.Link>

                                <div className="col-12 d-grid mt-4">
                                  <Button
                                    variant="warning text-light"
                                    onClick={() => {
                                      router.push("/");
                                      setShowOffcanvas(false);
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
                                <div className="col-11 d-flex border border-1 rounded-pill form-input">
                                  <div className="col-11">
                                    <input
                                      className="form-control rounded-pill border-0"
                                      id="input-search"
                                      type="search"
                                      placeholder="Search"
                                      aria-label="Search"
                                      defaultValue={router.query.keyword ? router.query.keyword : null}
                                      onChange={(e) => setValueSearch(e.target.value)}
                                      onKeyPress={handleKeypressSearch}
                                    />
                                  </div>
                                  <div className="col-1 d-flex justify-content-center">
                                    <Image onClick={() => handleSearching(valueSearch)} src={IconSearch} width="18px" height="30px" alt="" className="py-0" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-2 col-lg-2"></div>
                              <div className="col-xl-2 col-lg-2 d-flex">
                                <div className="col-8 d-flex ">
                                  <div className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block" type="button">
                                    <Image className="pictureThumbnails" referrerPolicy="no-referrer" width={24} height={24} layout="fixed" src={"/assets/icons/bell.svg"} alt="" />
                                  </div>
                                  <div className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block" type="button">
                                    <Image className="pictureThumbnails" referrerPolicy="no-referrer" width={24} height={24} layout="fixed" src={"/assets/icons/mail.svg"} alt="" />
                                  </div>
                                </div>
                                <div className="col-4 d-flex justify-content-center align-items-center block">
                                  <NavDropdown title={pictureThumbnails} align="end" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                                    <NavDropdown.Header className="d-grid ">
                                      <p className="mb-0 fw-bold">{NavBarUsers.email}</p>
                                      <p className="mb-0">
                                        <small> UID :{NavBarUsers.id}</small>
                                      </p>
                                    </NavDropdown.Header>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                      onClick={() => {
                                        router.push("/users/profile");
                                      }}
                                    >
                                      My Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                      onClick={() => {
                                        router.push("/recruiter/profile");
                                      }}
                                    >
                                      Profile Recruiter
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
                  ) : (
                    <Fragment>
                      {/* Navbar No Auth */}
                      <div className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid ">
                            {/* Navbar No Auth Mobile */}
                             {size.width <= 992 ? (
                          <Fragment>
                            <div className="col-xl-8 col-lg-8">
                              <div className="col-12 d-flex border border-1 rounded-pill form-input">
                                <div className="col-11">
                                  <input
                                    className="form-control rounded-pill border-0"
                                    id="input-search"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    defaultValue={router.query.keyword ? router.query.keyword : null}
                                    onChange={(e) => setValueSearch(e.target.value)}
                                    onKeyPress={handleKeypressSearch}
                                  />
                                </div>
                                <div className="col-1 d-flex justify-content-center">
                                  <Image onClick={() => handleSearching(valueSearch)} src={IconSearch} width="18px" height="30px" alt="" className="py-0" />
                                </div>
                              </div>
                            </div>
                            <div className="d-flex mt-4 ">
                              <div className="col-6 d-grid px-2">
                                <Button
                                  variant="success"
                                  onClick={() => {
                                    router.push("/sign-in");
                                    setShowOffcanvas(false);
                                  }}
                                  className=" rounded-pill block "
                                  type="button"
                                >
                                  <p className="my-auto">Sign In</p>
                                </Button>
                              </div>
                              <div className="col-6 d-grid">
                                <Button
                                  variant="outline-success"
                                  onClick={() => {
                                    router.push("/sign-up");
                                    setShowOffcanvas(false);
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
                              <div className="col-11 d-flex border border-1 rounded-pill form-input">
                                <div className="col-11">
                                  <input
                                    className="form-control rounded-pill border-0"
                                    id="input-search"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    defaultValue={router.query.keyword ? router.query.keyword : null}
                                    onChange={(e) => setValueSearch(e.target.value)}
                                    onKeyPress={handleKeypressSearch}
                                  />
                                </div>

                                <div className="col-1 d-flex justify-content-center">
                                  <Image onClick={() => handleSearching(valueSearch)} src={IconSearch} width="18px" height="30px" alt="" className="py-0" />
                                </div>
                              </div>
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
                                  <p className="my-auto">Sign In</p>
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
                  )
                  // }
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </Fragment>
    );
  };

export default NavigationBar;

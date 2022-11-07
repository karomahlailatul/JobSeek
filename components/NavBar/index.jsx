import { useState, Fragment, useEffect, useRef } from "react";
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
import { getUsersProfile } from "../../app/redux/Slice/UsersProfileSlice";

import Select from "react-select";

const NavigationBar = ({ id, role, token, refreshToken, lockCredential }) => {
  const dispatch = useDispatch();

  const size = useWindowSize();
  const router = useRouter();

  const expand = "lg";

  const [tokenNav, setTokenNav] = useState(token);
  const [refreshTokenNav, setRefreshTokenNav] = useState(refreshToken);
  const [roleNav, setRoleNav] = useState(role);
  const [idNav, setIdNav] = useState(id);
  const [lockCredentialNav, setLockCredentialNav] = useState(lockCredential);

  const [valueSearch, setValueSearch] = useState();
  const [typeSearch, setTypeSearch] = useState("j");
  const [showOffCanvas, setShowOffcanvas] = useState(false);

  const { UsersProfile } = useSelector((state) => state.UsersProfile);

  const dispatchUsers = async () => {
    dispatch(getUsersProfile(tokenNav, refreshTokenNav));
  };

  const handleSignOut = () => {
    setTokenNav();
    setRefreshTokenNav();
    setRoleNav();
    setLockCredentialNav();
    Cookies.remove("id");
    Cookies.remove("role");
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    Cookies.remove("lockCredential");
  };

  const pictureThumbnails = (
    <span className="d-flex align-items-center justify-content-center">
      <Image className="pictureThumbnails border" referrerPolicy="no-referrer" src={UsersProfile.picture ? UsersProfile.picture : "/assets/icons/ico-user.svg"} width={24} height={24} layout="fixed" alt="" objectFit="cover" />
    </span>
  );

  const handleSearching = (valueSearch) => {
    // await e.preventDefault();

    if (valueSearch) {
      Router.push({
        pathname: `/${typeSearch}`,
        query: {
          keyword: `${valueSearch}`,
        },
      });
    } else {
      Router.push({
        pathname: `/${typeSearch}`,
      });
    }
    if (size.width <= 992) {
      setShowOffcanvas(false);
    }
  };

  const handleKeypressSearch = (e) => {
    // if (e.key == "Enter" && size.width <= 992) {
    //   handleSearching(valueSearch);
    //   setShowOffcanvas(false);
    // } else if (e.key == "Enter" && size.width >= 992) {
    //   handleSearching(valueSearch);
    // }
    if (e.key == "Enter") {
      handleSearching(valueSearch);
    }
  };

  useEffect(() => {
    if (idNav && roleNav && tokenNav && refreshTokenNav && lockCredentialNav) {
      dispatchUsers();
    }
    if (!idNav && !roleNav && !tokenNav && !refreshTokenNav && !lockCredentialNav) {
      setTokenNav(Cookies.get("token"));
      setRefreshTokenNav(Cookies.get("refreshToken"));
      setRoleNav(Cookies.get("role"));
      setIdNav(Cookies.get("id"));
      setLockCredentialNav(Cookies.get("lockCredential"));
      dispatchUsers();
    }
  }, [dispatch, router, idNav, roleNav, tokenNav, refreshTokenNav, lockCredentialNav]);

  useEffect(() => {
    if (size.width >= 992 && showOffCanvas) {
      setShowOffcanvas(false);
    }
  }, [size]);

  const TypeSearch = [
    { value: "j", label: "Job" },
    { value: "r", label: "Recruiters" },
    { value: "u", label: "Users" },
  ];

  return (
    <Fragment>
      <Navbar key={expand} bg="white" expand={expand} className="shadow sticky-top mb-5">
        <Container fluid="lg">
          <Navbar.Brand className="">
            <a
              onClick={() => {
                router.push("/");
              }}
              className="col-lg-3 col-md-3 col-sm-3 cursor-pointer"
            >
              <Image src={"/assets/logo_colour.svg"} width="180px" height="45px" alt="" layout="fixed" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle onClick={() => setShowOffcanvas(true)} aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas show={showOffCanvas} id={`offcanvasNavbar-expand-${"expand"}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="bottom">
            <Offcanvas.Header className="shadow">
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className="col-12 d-flex justify-content-between">
                <div
                  onClick={() => {
                    if (size <= 992) {
                      setShowOffcanvas(false);
                      router.push("/");
                    } else {
                      setShowOffcanvas(false);
                      router.push("/");
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
              {idNav && roleNav && tokenNav && refreshTokenNav && lockCredentialNav ? (
                // => Navbar Auth
                <Fragment>
                  <div className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid ">
                    {size.width <= 991 ? (
                      // => Navbar Auth Mobile
                      <Fragment>
                        <div className="col-12 d-flex">
                          <div className="col-9 d-flex border border-1  form-input">
                            <div className="col-11">
                              <input
                                className="form-control border-0 "
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
                              <Image
                                onClick={() => {
                                  handleSearching(valueSearch);
                                }}
                                src={IconSearch}
                                width="18px"
                                height="30px"
                                alt=""
                                className="py-0"
                              />
                            </div>
                          </div>

                          <div className="col-3 ps-1">
                            <Select
                              id="search-type-select"
                              instanceId="search-type-select"
                              className="col-12"
                              name="skill_list"
                              isSearchable={false}
                              placeholder="Type"
                              options={TypeSearch}
                              defaultValue={TypeSearch.map((x, index) => (x.value == typeSearch ? TypeSearch[index] : null))}
                              onChange={(e) => setTypeSearch(e.value)}
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
                        <div className="d-grid ">
                          <div className="col-12 d-flex mt-4">
                            <div className="col-2 border border-0 rounded-3 d-flex justify-content-center align-items-center block">
                              <Image className="photoSide" referrerPolicy="no-referrer" src={UsersProfile.picture ? UsersProfile.picture : "/assets/icons/ico-user.svg"} width={72} height={72} layout="fixed" alt="" />
                            </div>
                            <div className="col-8">
                              <h5 className="fw-bold text-muted">{UsersProfile.email}</h5>
                              <p className="text-muted">UID : {UsersProfile.id}</p>
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
                                router.push("/u/profile");
                                setShowOffcanvas(false);
                              }}
                              className=" block  "
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
                                  router.push("/r/profile");
                                  setShowOffcanvas(false);
                                }}
                                className=" block  "
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
                              className="  block  "
                              type="button"
                            >
                              <p className="my-auto">Sign Out</p>
                            </Button>
                          </div>
                        </div>
                      </Fragment>
                    ) : (
                      // => Navbar Auth Desktop
                      <Fragment>
                        <div className="col-xl-9 d-flex col-lg-9 px-5 ">
                          <div className="col-9 d-flex border border-1 form-input ">
                            <div className="col-11 ">
                              <input
                                className="form-control  border-0"
                                id="input-search"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                defaultValue={router.query.keyword ? router.query.keyword : null}
                                onChange={(e) => setValueSearch(e.target.value)}
                                onKeyPress={handleKeypressSearch}
                              />
                            </div>
                            <div className="col-1 d-flex justify-content-center ">
                              <Image onClick={() => handleSearching(valueSearch)} src={IconSearch} width="18px" height="30px" alt="" className="py-0" />
                            </div>
                          </div>
                          <div className="col-3 ps-1">
                            <Select
                              id="search-type-select"
                              instanceId="search-type-select"
                              className="col-12"
                              name="skill_list"
                              isSearchable={false}
                              placeholder="Type"
                              options={TypeSearch}
                              defaultValue={TypeSearch.map((x, index) => (x.value == typeSearch ? TypeSearch[index] : null))}
                              onChange={(e) => setTypeSearch(e.value)}
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
                        <div className="col-xl-3 col-lg-3 d-flex justify-content-end">
                          <div className="col-6 d-flex ">
                            <div className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block" type="button">
                              <Image className="pictureThumbnails" referrerPolicy="no-referrer" width={24} height={24} layout="fixed" src={"/assets/icons/bell.svg"} alt="" />
                            </div>
                            <div className="col-6 border border-0 rounded-3 d-flex justify-content-center align-items-center block" type="button">
                              <Image className="pictureThumbnails" referrerPolicy="no-referrer" width={24} height={24} layout="fixed" src={"/assets/icons/mail.svg"} alt="" />
                            </div>
                          </div>
                          <div className="col-3 d-flex justify-content-center align-items-center block">
                            <NavDropdown title={pictureThumbnails} align="end" id={`offcanvasNavbarDropdown-expand-${expand}`}>
                              <NavDropdown.Header className="d-grid ">
                                <p className="mb-0 fw-bold">{UsersProfile.email}</p>
                                <p className="mb-0">
                                  <small> UID :{UsersProfile.id}</small>
                                </p>
                              </NavDropdown.Header>
                              <NavDropdown.Divider />
                              <NavDropdown.Item
                                onClick={() => {
                                  router.push("/u/profile");
                                }}
                              >
                                My Profile
                              </NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item
                                onClick={() => {
                                  router.push("/r/profile");
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
                // => Navbar No-Auth
                <Fragment>
                  <div className="col-12 d-xl-flex d-lg-flex d-md-grid d-sm-grid ">
                    {size.width <= 991 ? (
                      // => Navbar No-Auth Mobile
                      <Fragment>
                        <div className="col-12 d-flex">
                          <div className="col-9 d-flex border border-1  form-input">
                            <div className="col-11">
                              <input
                                className="form-control  border-0"
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
                          <div className="col-3 ps-1">
                            <Select
                              id="search-type-select"
                              instanceId="search-type-select"
                              className="col-12"
                              name="skill_list"
                              isSearchable={false}
                              placeholder="Type"
                              options={TypeSearch}
                              defaultValue={TypeSearch.map((x, index) => (x.value == typeSearch ? TypeSearch[index] : null))}
                              onChange={(e) => setTypeSearch(e.value)}
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
                        <div className="d-flex mt-4 ">
                          <div className="col-6 d-grid px-2">
                            <Button
                              variant="success"
                              onClick={() => {
                                router.push("/sign-in");
                                setShowOffcanvas(false);
                              }}
                              className="  block "
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
                              className="  block  "
                              type="button"
                            >
                              <p className="my-auto"> Sign Up</p>
                            </Button>
                          </div>
                        </div>
                      </Fragment>
                    ) : (
                      // => Navbar No-Auth Desktop
                      <Fragment>
                        <div className="col-xl-9 col-lg-9 d-flex px-5 ">
                          <div className="col-9 d-flex border border-1  form-input">
                            <div className="col-11">
                              <input
                                className="form-control  border-0"
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
                          <div className="col-3 ps-1">
                            <Select
                              id="search-type-select"
                              instanceId="search-type-select"
                              className="col-12"
                              name="skill_list"
                              isSearchable={false}
                              placeholder="Type"
                              options={TypeSearch}
                              defaultValue={TypeSearch.map((x, index) => (x.value == typeSearch ? TypeSearch[index] : null))}
                              onChange={(e) => setTypeSearch(e.value)}
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
                        <div className="col-xl-3 col-lg-3 d-flex">
                          <div className="col-6 d-grid px-2">
                            <Button
                              variant="success"
                              onClick={() => {
                                router.push("/sign-in");
                              }}
                              className="  block "
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
                              className="  block  "
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

export default NavigationBar;

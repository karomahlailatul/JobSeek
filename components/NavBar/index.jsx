import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";
// import ImageNavbar from "../../assets/images/peworld_jingga.png";
import IconSearch from "../../public/assets/icons/search.svg";
// import PhotoEmpty from "../../public/assets/icons/ico-user.svg";

import useWindowSize from "../WindowsSize";
// import axios from "axios";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import { getNavBar } from "../../app/redux/Slice/NavBarSlice";

const NavigationBar = () => {
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");

  const expand = "lg";
  const size = useWindowSize();
  const router = useRouter();

  const dispatch = useDispatch();
  const dispatchNavBar = async () => {
    await dispatch(getNavBar()).unwrap();
  };

  const { NavBar } = useSelector((state) => state.NavBar);

  // const [searchParams, setSearchParams] = useSearchParams();
  // const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // setSearch(e.currentTarget.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // if (search !== "") {
    //   setSearchParams({
    //     keyword: search,
    //   });
    // }
  };

  const [showOffCanvas, setShowOffcanvas] = useState(false);
  // const toggleOffcanvas = () => {
  //   setShow(!show);
  // };

  const handleSignOut = () => {
    setToken("");
    setRefreshToken("");
    setRole("");
    setId("");
    Cookies.remove("id");
    Cookies.remove("role");
    Cookies.remove("token");
    Cookies.remove("refreshToken");
  };

  const pictureThumbnails = (
    <span>
      <Image
        className="pictureThumbnails"
        referrerPolicy="no-referrer"
        src={NavBar.picture === null || NavBar.picture === undefined ? "/assets/icons/ico-user.svg" : NavBar.picture}
        width={24}
        height={24}
        layout="fixed"
        // src={"/assets/icons/ico-user.svg"}
        alt=""
      />
    </span>
  );

  const logoThumbnails = (
    <span>
      {/* <img className="pictureThumbnails" crossOrigin="anonymous" src={seller_logo === null || seller_logo === undefined ? PhotoEmpty : seller_logo} alt="" /> */}

     <Image
        className="pictureThumbnails"
        referrerPolicy="no-referrer"
        src={NavBar.picture === null || NavBar.picture === undefined ? "/assets/icons/ico-user.svg" : NavBar.picture}
        width={24}
        height={24}
        layout="fixed"
        // src={"/assets/icons/ico-user.svg"}
        alt=""
      />
       
      {/* <img className="pictureThumbnails" crossOrigin="anonymous" src={seller_logo} alt="" /> */}
    </span>
  );

  useEffect(() => {
    dispatchNavBar();
    // getDataProfile();
    // setIsAuth(localStorage.getItem("token"));
    setToken(Cookies.get("token"));
    setRefreshToken(Cookies.get("refreshToken"));
    setRole(Cookies.get("role"));
    setId(Cookies.get("id"));
  }, [dispatch,token, refreshToken, role, id]);

  return (
    <Fragment>
      <Navbar key={expand} bg="white" expand={expand} className="mb-5 shadow">
        <Container fluid="sm">
          <Navbar.Brand className="me-5">
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
            <Offcanvas.Header className="ShadowBox">
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} className="col-12 d-flex justify-content-between">
                <div
                  onClick={() => {
                    if (size <= 992) {
                      setShowOffcanvas(false)
                      router.push("/");
                    } else {
                      setShowOffcanvas(false)
                      router.push("/")}
                  }}
                  className="col-lg-3 col-md-3 col-sm-3 link-redirect"
                >
                  <Image src={"/assets/logo_colour.svg"} width="120px" height="30px" className="App-logo" alt="" />
                </div>
                <div className="btn-close-offcanvas " onClick={()=>setShowOffcanvas(false)}></div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {token ? (
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
                          <div className="col-xl-10 col-lg-10">
                          
                        </div>

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
                        </div>
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
                            <Form onSubmit={handleSearchSubmit} className="form-search d-flex">
                              <div className="col-12 d-flex border border-1 rounded-pill form-input">
                                <div className="col-11">
                                  <input className="form-control rounded-pill border-0 " type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
                                </div>
                                <Button
                                  onClick={() => {
                                    // router.push("/find-job?" + searchParams);
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
                      

                                <Image
                                  className="photoSide"
                                  referrerPolicy="no-referrer"
                                  src={NavBar.picture === null || NavBar.picture === undefined ? "/assets/icons/ico-user.svg" : NavBar.picture}
                                  width={72}
                                  height={72}
                                  layout="fixed"
                                
                                  alt=""
                                />
                              </div>
                              <div className="col-8">
                                <h5 className="fw-bold text-muted">{NavBar.email}</h5>
                                <p className="text-muted">UID : {NavBar.id}</p>
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
                                  router.push("/profile/users");
                                  setShowOffcanvas(false)
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
                                    setShowOffcanvas(false)
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
                                  setShowOffcanvas(false)
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
                            <Form onSubmit={handleSearchSubmit} className="form-search d-flex">
                              <div className="col-11 d-flex border border-1 rounded-pill form-input">
                                <div className="col-11">
                                  <input className="form-control rounded-pill border-0 " type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
                                </div>
                                <Button
                                  onClick={() => {
                                    // router.push("/find-job?" + searchParams);
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
                                  <p className="mb-0 fw-bold">{NavBar.email}</p>
                                  <p className="mb-0">
                                    <small> UID :{NavBar.id}</small>
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
                          <Form onSubmit={handleSearchSubmit} className="form-search d-flex">
                            <div className="col-12 d-flex border border-1 rounded-pill form-input">
                              <div className="col-11">
                                <input className="form-control rounded-pill border-0 " type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
                              </div>
                              <Button
                                onClick={() => {
                                  // router.push("/find-job?" + searchParams);
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
                                setShowOffcanvas(false)
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
                                setShowOffcanvas(false)
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
                          <Form onSubmit={handleSearchSubmit} className="form-search d-flex">
                            <div className="col-11 d-flex border border-1 rounded-pill form-input">
                              <div className="col-11">
                                <input className="form-control rounded-pill border-0 " type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
                              </div>
                              <Button
                                onClick={() => {
                                  // router.push("/find-job?" + searchParams);
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

export default NavigationBar;

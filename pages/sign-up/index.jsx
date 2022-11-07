import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { postSignUpUser } from "../../app/redux/Slice/SignUpUserSlice";

import PreLoader from "../../components/PreLoader";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const UserCreate = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "" || "user",
    company: "",
    position: "",
  });

  const handleChange = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
    // console.log(dataUser);
  };

  const handleCreate = async (e) => {
    await e.preventDefault();

    let param = "";
    if (document.getElementById("user").checked) {
      param = "users/register";
    } else if (document.getElementById("recruiter").checked) {
      param = "users/register-user-recruiter";
    }

    await dispatch(postSignUpUser({ param, dataUser }))
      .unwrap()
      .then((item) => {
        if (item?.statusCode === 201) {
          router.push("/sign-in");
        }
      });
  };

  const [toggle, setToggle] = useState(true);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const { isLoading } = useSelector((state) => state.SignUpUser);
  const { UsersProfile } = useSelector((state) => state.UsersProfile);

  useEffect(() => {
    document.title = "Sign Up | JobSeek";
  });

  // SSO Google
  const redirectgoogle = async () => {
    const urlBeGoogle = `${process.env.REACT_APP_API_BACKEND}users/auth/google`;
    let height = 800;
    let width = 700;
    let left = (screen.width - width) / 2;
    let top = (screen.height - height) / 2;
    window.open(urlBeGoogle, "center window", "resizable = yes, width=" + width + ", height=" + height + ", top=" + top + ", left=" + left);
  };

  useEffect(() => {
    let timer = setInterval(() => {
      if (Cookies.get("token") && Cookies.get("refreshToken") && Cookies.get("id") && Cookies.get("role") && Cookies.get("lockCredential")) {
        clearInterval(timer);
        router.push("/");
        toast.success("Sign In Success. Welcome " + UsersProfile.name, { toastId: "successSignIn" });
      }
    }, 250);
  }, []);

  return (
    <Fragment>
      <PreLoader isLoading={isLoading} />
      <div className="register-page">
        <div className="container">
          <a className="d-flex justify-content-center mb-3" onClick={() => router.push("/")}>
            <Image src={"/assets/logo_colour.svg"} width="180px" height="60px" className="App-logo" alt="" />
          </a>
          <h5 className="text-banner text-center mb-3">Please sign up with your account</h5>
          <div className="mt-5">
            <form onSubmit={handleCreate}>
              <div className="my-3 mb-3">
                <div className="mx-5 mb-5 d-flex justify-content-center align-items-center btn-group text-center justify-content-center" role="group">
                  <input type="radio" value="user" onChange={handleChange} name="role" defaultChecked className="btn-check" id="user" />
                  <label className="btn btn-outline-success label-button d-flex justify-content-center" onClick={handleClick} htmlFor="user">
                    User
                  </label>

                  <input type="radio" value="recruiter" onChange={handleChange} name="role" className="btn-check" id="recruiter" />
                  <label className="btn btn-outline-success  label-button d-flex justify-content-center" onClick={handleClick} htmlFor="recruiter">
                    Recruiter
                  </label>
                </div>
                <input className="form-control mt-3" type="text" placeholder="name" name="name" value={dataUser.name} onChange={handleChange} />
                <input className="form-control mt-3" type="text" placeholder="email" name="email" value={dataUser.email} onChange={handleChange} />
                <input className="form-control mt-3 hidden-textbox" type="text" placeholder="phone" name="phone" value={dataUser.phone} onChange={handleChange} />

                <div id="recruiter" className="hide" style={{ display: toggle ? "none" : "block" }}>
                  <input className="form-control mt-3 hidden-textbox" type="text" placeholder="company" name="company" value={dataUser.company} onChange={handleChange} />

                  <input className="form-control mt-3 hidden-textbox" type="text" placeholder="position" name="position" value={dataUser.position} onChange={handleChange} />
                </div>

                <input className="form-control mt-3" type="password" placeholder="password" name="password" value={dataUser.password} onChange={handleChange} />
              </div>
              <div className="d-flex justify-content-end">
                <Link className="text-danger text-redirect" href="/reset-password">
                  <a className="text-decoration-none text-success">Forgot password</a>
                </Link>
              </div>
              <div className="d-grid my-3">
                <button type="submit" className="btn btn-success btn-submit text-light">
                  Create Account
                </button>
              </div>
              <div className="d-flex justify-content-center">
                <p className="text-regis">Already have a JobSeek account?&nbsp;</p>
                <Link className="text-decoration-none" href="/sign-in">
                  <a className="text-decoration-none text-success">Sign In </a>
                </Link>
              </div>
            </form>
            <hr />
            <button type="button" className="col-12 btn btn-success btn-submit" onClick={redirectgoogle}>
              <div className="d-flex justify-content-center align-items-center text-center">
                <Image src={"/assets/icons/google_g_logo.svg"} width="30px" height="30px" className="align-items-center" alt="" />
                <p className="ms-2 my-auto">Continue with Google</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserCreate;

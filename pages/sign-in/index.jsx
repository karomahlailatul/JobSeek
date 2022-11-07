import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { postSignIn } from "../../app/redux/Slice/SignInSlice";

import PreLoader from "../../components/PreLoader";

import Cookies from "js-cookie";
const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [lockCredential, setLockCredential] = useState(false);

  const handleLogin = async (e) => {
    await e.preventDefault();
    await dispatch(postSignIn({ data, lockCredential }))
      .unwrap()
      .then((item) => {
        if (item?.statusCode === 201) {
          router.push("/");
        }
      });
  };

  const { isLoading } = useSelector((state) => state.SignIn);

  useEffect(() => {
    document.title = "Sign In | JobSeek";
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
      if (Cookies.get("token") && Cookies.get("refreshToken") && Cookies.get("id") && Cookies.get("role")&& Cookies.get("lockCredential")) {
        clearInterval(timer);
        router.push("/");
      }
    }, 250);
  }, []);

  return (
    <Fragment>
      <PreLoader isLoading={isLoading} />
      <div className="login-page">
        <div className="container">
          <div className="row">
            <a className="d-flex justify-content-center mb-3" onClick={() => router.push("/")}>
              <Image src={"/assets/logo_colour.svg"} width="180px" height="60px" className="App-logo" alt="" />
            </a>
            <h5 className="text-banner my-3 text-center">Please login with your account</h5>
            <div className=" justify-content-center">
              <form onSubmit={handleLogin}>
                <div className="my-3 mb-3">
                  <input className="form-control mt-3" type="text" placeholder="email" name="email" value={data.email} onChange={handleChange} />
                  <input className="form-control mt-3" type="password" placeholder="password" name="password" value={data.password} onChange={handleChange} />
                </div>

                <div className="d-flex justify-content-start my-2">
                  <input className="form-check-input" type="checkbox" value="" id="lock-credential" name="lock-credential" onChange={(e) => setLockCredential(e.target.checked)} />
                  <label className="form-check-label" htmlFor="lock-credential">
                    &nbsp;Remember Me
                  </label>
                </div>
                <div className="d-grid my-3">
                  <button
                    // onClick={}
                    type="submit"
                    className="btn btn-success btn-submit text-light"
                  >
                    Sign In
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                  <p className="text-regis">Not have a JobSeek account?&nbsp;</p>
                  <Link className="text-decoration-none" href="/sign-up">
                    <a className="text-decoration-none text-success">Sign Up </a>
                  </Link>
                </div>
                <div className="d-flex justify-content-center">
                  <Link className="text-danger text-redirect" href="/reset-password">
                    <a className="text-decoration-none text-success">Forgot password</a>
                  </Link>
                </div>
              </form>
              <hr/>
              <button type="button" className="col-12 btn btn-success btn-submit" onClick={redirectgoogle}>
                <div className="d-flex justify-content-center align-items-center text-center">
                  <Image src={"/assets/icons/google_g_logo.svg"} width="30px" height="30px" className="align-items-center" alt="" />
                  <p className="ms-2 my-auto">Continue with Google</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;

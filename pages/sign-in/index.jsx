import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";


const SignIn = () => {
  
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
    // console.log(data);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_API_BACKEND + "users/login", JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.statusCode === 201) {
          toast.success("Welcome, " + res.data.data.name, { autoClose: 2500 })
          localStorage.setItem("token", res.data.data.token)
          localStorage.setItem("refreshToken", res.data.data.refreshToken)
          localStorage.setItem("role", res.data.data.role)
          localStorage.setItem("id", res.data.data.id)
          setTimeout(() => {
            router.push("/");
          }, 2500);
        } else {
          toast.warning(res.data.message, { autoClose: 2500 });
        }
      })
      .catch((err) => {
        if (err.response) {
        toast.warning(err.response.data.message, { autoClose: 2500 }); }
      //  console.log(err)
      })
    
  };

  useEffect(() => {
    document.title = "Sign In | JobSeek";
  });

  return (
    <Fragment>
      <div className="login-page">
        <div className="container">
          <div className="row">
          <a
            className="d-flex justify-content-center mb-3"
            onClick={(e) => router.push("/")}
          >
            <Image
              src={"/assets/logo_colour.svg"}
              width="180px"
              height="60px"
              className="App-logo"
              alt=""
            />
          </a>
            <h5 className="text-banner my-3 text-center">Please login with your account</h5>
            <div className=" justify-content-center">
              <form onSubmit={handleLogin}>
                <div className="my-3 mb-3">
                  
                  <input className="form-control mt-3" type="text" placeholder="email" name="email" value={data.email} onChange={handleChange} />
                  <input className="form-control mt-3" type="password" placeholder="password" name="password" value={data.password} onChange={handleChange} />
                </div>
                <div className="d-flex justify-content-end">
                <Link
                  className="text-danger text-redirect"
                  href="/reset-password"
                >
                  <a className="text-decoration-none text-success">
                    Forgot password
                  </a>
                </Link>
              </div>
                <div className="d-grid my-3">
                  <button
                    // onClick={}
                    type="submit"
                    className="btn btn-success btn-submit text-light"
                  >
                    PRIMARY
                  </button>
                </div>
                <div className="d-flex justify-content-center">
                <p className="text-regis">
                  Not have a JobSeek account?&nbsp;
                </p>
                <Link className="text-decoration-none" href="/sign-up">
                  <a className="text-decoration-none text-success">Sign Up </a>
                </Link>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;

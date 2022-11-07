import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { postSignUpUser } from "../../app/redux/Slice/SignUpUserSlice";

import PreLoader from "../../components/PreLoader";

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

  useEffect(() => {
    document.title = "Sign Up | JobSeek";
  });

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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserCreate;

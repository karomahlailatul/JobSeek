
import {useEffect ,Fragment} from "react"

import "react-toastify/dist/ReactToastify.css";
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'

import "./sign-up/style.css"
import "./sign-in/style.css"
import "../components/NavBar/style.css"
import "../components/homeSwiper/style.css"
import "../components/RecuiterTabProfile/style.css"
import "./profile/recuiter/style.css"

import { ToastContainer } from "react-toastify";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer/index";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (

<Fragment>
{router.pathname === "/sign-in" || router.pathname === "/sign-up" ? null : <NavBar />}

<NextNProgress />
<Component {...pageProps} />
{/* <Foot/> */}

{router.pathname === "/sign-in" || router.pathname === "/sign-up" ? null : <Footer />}

<ToastContainer />
</Fragment>)
}

export default MyApp

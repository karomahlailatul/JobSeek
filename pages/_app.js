// style componet module
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../node_modules/@fortawesome/fontawesome-svg-core/styles.css";

// style component
import "../components/PreLoader/style.css";
import "../components/NavBar/style.css";
import "../components/homeSwiper/style.css";
import "../components/PaginationTable/style.css";
import "../components/Pagination/style.css";

import "../components/RecruiterTabProfileRecruiterProfile/style.css";
import "../components/RecruiterTabJobMyJob/style.css";

import "../components/UsersTabProfileMyProfile/style.css";

import "../components/UsersTabPortfolioCreatePortfolio/style.css";
import "../components/UsersTabPortfolioEditPortfolio/style.css";
import "../components/UsersTabPortfolioMyPortfolio/style.css";

import "../components/UsersTabSkillCreateSkill/style.css";
import "../components/UsersTabSkillEditSkill/style.css";
import "../components/UsersTabSkillMySkill/style.css";

import "../components/UsersTabWorkExperienceCreateWorkExperience/style.css";
import "../components/UsersTabWorkExperienceEditWorkExperience/style.css";
import "../components/UsersTabWorkExperienceMyWorkExperience/style.css";


// style pages
import "./r/profile/style.css";
import "./u/profile/style.css";
import "./sign-up/style.css";
import "./sign-in/style.css";
import "./j/style.css";

import { useEffect, Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

import NavigationBar from "../components/NavBar";
import Footer from "../components/Footer/index";

import { wrapper } from "../app/redux/store";
import { Provider } from "react-redux";

import SSRProvider from "react-bootstrap/SSRProvider";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// import { far } from "@fortawesome/free-regular-svg-icons";
// library.add(fas, fab, far);

// handle guardDevice
import GuardDeviceNotSupport from "../components/GuardDeviceNotSupport";

const MyApp = ({ Component, 
  id, role, token, refreshToken, lockCredential,
   ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    document.title = "Welcome | JobSeek";
  }, []);

  return (
    <Fragment>
      <GuardDeviceNotSupport>
        <SSRProvider>
          <Fragment>
            <Provider store={store}>
              {router.pathname === "/sign-in" || router.pathname === "/sign-up" || router.pathname === "/verification" ? null : <NavigationBar 
              id={id} role={role} token={token} refreshToken={refreshToken} lockCredential={lockCredential} 
              />}

              <Component {...props.pageProps} />

              {router.pathname === "/sign-in" || router.pathname === "/sign-up" || router.pathname === "/verification" ? null : <Footer />}
            </Provider>
          </Fragment>
          <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover />
        </SSRProvider>
      </GuardDeviceNotSupport>
    </Fragment>
  );
};

export default MyApp;

MyApp.getInitialProps = async ({ ctx }) => {
 
  const token = ctx.req?.cookies?.token ;
  const refreshToken = ctx.req?.cookies?.refreshToken 
  const role = ctx.req?.cookies?.role 
  const id = ctx.req?.cookies?.id 
  const lockCredential = ctx.req?.cookies?.lockCredential

  return {
    token: token,
    refreshToken: refreshToken,
    role: role,
    id: id,
    lockCredential: lockCredential,
  };
};

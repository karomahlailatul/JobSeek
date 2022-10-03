import { useState, useEffect, Fragment } from "react";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";

// style component
import "../components/PreLoader/style.css";
import "../components/NavBar/style.css";
import "../components/homeSwiper/style.css";
import "../components/RecuiterTabProfile/style.css";
import "../components/UsersTabProfile/style.css";
import "../components/UsersTabHireJob/style.css";
import "../components/UsersTabPortfolio/style.css";
import "../components/UsersTabSkill/style.css";
import "../components/UsersTabWorkExperience/style.css";
// style pages
import "./profile/recuiter/style.css";
import "./profile/users/style.css";
import "./sign-up/style.css";
import "./sign-in/style.css";

import { ToastContainer } from "react-toastify";
// import NextNProgress from "nextjs-progressbar";
import Router ,{ useRouter } from "next/router";

import NavigationBar from "../components/NavBar";
import Footer from "../components/Footer/index";

import { wrapper } from "../app/redux/store";
import { Provider } from "react-redux";
import PreLoader from "../components/PreLoader";

// Always show notification, next used legacy implementaion myst update use createWrapperStore
// function MyApp({ Component, pageProps }) {
//   const router = useRouter();
//   useEffect(() => {
//     require("bootstrap/dist/js/bootstrap.bundle.min.js");
//     document.title = "Welcome | JobSeek";
//   }, []);
//   return (
//     <Fragment>

//       {router.pathname === "/sign-in" ||
//       router.pathname === "/sign-up" ? null : (
//         <NavigationBar />
//       )}

//       <NextNProgress />
//       <Component {...pageProps} />

//       {router.pathname === "/sign-in" ||
//       router.pathname === "/sign-up" ? null : (
//         <Footer />
//       )}

//       <ToastContainer />

//     </Fragment>
//   );
// }

// export default wrapper.withRedux(MyApp);

// error ssr fetch manual
// const MyApp = ({ Component, ...rest }) => {
//   const {store, pageProps} = wrapper.useWrappedStore(rest);
//   const router = useRouter();
//   useEffect(() => {
//     require("bootstrap/dist/js/bootstrap.bundle.min.js");
//     document.title = "Welcome | JobSeek";
//   }, []);

//   // const { store, pageProps } = wrapper.useWrappedStore(pageProps);

//   return (
//     <Fragment>
//       <Provider store={store}>
//       {router.pathname === "/sign-in" ||
//       router.pathname === "/sign-up" ? null : (
//         <NavBar />
//       )}

//       <NextNProgress />
//       <Component {...pageProps} />

//       {router.pathname === "/sign-in" ||
//       router.pathname === "/sign-up" ? null : (
//         <Footer />
//       )}

//       <ToastContainer />
//       </Provider>
//     </Fragment>
//   );
// }

// default no redux
// const MyApp = ({ Component, pageProps }) => {
//   // const {store, pageProps} = wrapper.useWrappedStore(rest);
//   const router = useRouter();
//   useEffect(() => {
//     require("bootstrap/dist/js/bootstrap.bundle.min.js");
//     document.title = "Welcome | JobSeek";
//   }, []);

//   // const { store, pageProps } = wrapper.useWrappedStore(pageProps);

//   return (
//     <Fragment>
//       {/* <Provider store={store}> */}
//       {router.pathname === "/sign-in" ||
//       router.pathname === "/sign-up" ? null : (
//         <NavBar />
//       )}

//       <NextNProgress />
//       <Component {...pageProps} />

//       {router.pathname === "/sign-in" ||
//       router.pathname === "/sign-up" ? null : (
//         <Footer />
//       )}

//       <ToastContainer />
//       {/* </Provider> */}
//     </Fragment>
//   );
// }

// const MyApp = ({ Component, pageProps , ...rest }) => {
//   const { store } = wrapper.useWrappedStore(rest);
//   const router = useRouter();
//   useEffect(() => {
//     require("bootstrap/dist/js/bootstrap.bundle.min.js");
//     document.title = "Welcome | JobSeek";
//   }, []);

//   return (
//     <Fragment>
//       <Provider store={store}>
//       {router.pathname === "/sign-in" ||
//       router.pathname === "/sign-up" ? null : (
//         <NavigationBar />
//       )}

//       <NextNProgress />
//       <Component {...pageProps} />

//       {router.pathname === "/sign-in" ||
//       router.pathname === "/sign-up" ? null : (
//         <Footer />
//       )}

//       <ToastContainer />
//       </Provider>
//     </Fragment>
//   );
// }

// export default MyApp;

// const MyApp = ({ Component, pageProps }) => {
//   const { store }= wrapper.useWrappedStore(pageProps);
//   const router = useRouter();
//   useEffect(() => {
//     require("bootstrap/dist/js/bootstrap.bundle.min.js");
//     document.title = "Welcome | JobSeek";
//   }, []);

//   return (
//     <Fragment>
//       <Provider store={store}>
//         {router.pathname === "/sign-in" || router.pathname === "/sign-up" ? null : <NavigationBar />}

//         <NextNProgress />
//         <Component {...pageProps} />

//         {router.pathname === "/sign-in" || router.pathname === "/sign-up" ? null : <Footer />}

//         <ToastContainer />
//       </Provider>
//     </Fragment>
//   );
// };

// export default MyApp;

// const MyApp = (props) => {
//     const router = useRouter();
//     useEffect(() => {
//       require("bootstrap/dist/js/bootstrap.bundle.min.js");
//       document.title = "Welcome | JobSeek";
//     }, []);
//     const { Component, pageProps } = props;
//     return (
//       <Fragment>
//         {router.pathname === "/sign-in" || router.pathname === "/sign-up" ? null : <NavigationBar />}

//         <NextNProgress />
//         <Component {...pageProps} />

//         {router.pathname === "/sign-in" || router.pathname === "/sign-up" ? null : <Footer />}

//         <ToastContainer />
//       </Fragment>
//     );

// }

// export default wrapper.withRedux(MyApp);
const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    document.title = "Welcome | JobSeek";

    Router.events.on("routeChangeStart", () => setIsLoading(true));
    Router.events.on("routeChangeComplete", () => setIsLoading(false));
    Router.events.on("routeChangeError", () => setIsLoading(false));

    return () => {
      Router.events.off("routeChangeStart", () => setIsLoading(true));
      Router.events.off("routeChangeComplete", () => setIsLoading(false));
      Router.events.off("routeChangeError", () => setIsLoading(false));
    };
  }, [Router.events]);
// }, [router]);

  return (
    <Fragment>
      {isLoading ? (
        <Fragment>
          <PreLoader isLoading={isLoading} />
        
          {/* <Fragment>
          <div className="preloader">
            <div className="loading">
              <div className="spinner-border" role="status"></div>
            </div>
          </div>
        </Fragment> */}
        
        </Fragment>
      ) : (
        <Fragment>
          <Provider store={store}>
            {router.pathname === "/sign-in" || router.pathname === "/sign-up" || router.pathname === "/verification" ? null : <NavigationBar />}

            {/* <NextNProgress /> */}
            <Component {...props.pageProps} />

            {router.pathname === "/sign-in" || router.pathname === "/sign-up" || router.pathname === "/verification" ? null : <Footer />}

            
          </Provider>
        </Fragment>
      )}
      <ToastContainer />
    </Fragment>

  //   <Fragment>
  //   {isLoading ? (
  //     <Fragment>
  //       <PreLoader isLoading={isLoading} />
  //     </Fragment>
  //   ) : (
  //   null
       
  //   )}

  //   <Provider store={store}>
  //         {router.pathname === "/sign-in" || router.pathname === "/sign-up" ? null : <NavigationBar />}

  //         <NextNProgress />
  //         <Component {...props.pageProps} />

  //         {router.pathname === "/sign-in" || router.pathname === "/sign-up" ? null : <Footer />}

  //         <ToastContainer />
  //       </Provider>
     
  // </Fragment>
  );
};

export default MyApp;

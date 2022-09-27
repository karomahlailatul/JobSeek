// import { useRouter } from "next/router";
// import {useState ,useEffect} from "react"

// const ProtectAuth = (WrappedComponent) => {
//   return (props) => {
//     // checks whether we are on client / browser or server.
//     if (typeof window != "undefined") {
//       const Router = useRouter();
//       const Token = localStorage.getItem("token");

//       // If there is no access token we redirect to "/" page.
//       if (!Token) {
//         Router.replace("/sign-in");
//         return null;
//       }

//     //   // If this is an accessToken we just render the component that was passed with all its props

//       return <WrappedComponent {...props} />;
//     }

    
    
//   // const [token, setToken] = useState("");


//     // If we are on server, return null
//     return null;
//   };
// };

// export default ProtectAuth;
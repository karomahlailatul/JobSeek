// import { NextResponse } from 'next/server'
// import { NextRequest } from 'next/server'
// export async function middleware(request = NextRequest) {
//     const url = request.nextUrl.clone()
//     if (url.pathname === '/') {
//       url.pathname = '/home'
//       return NextResponse.redirect(url)
//     }
//   }

import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export default function middleware(request = NextRequest) {
  const cookiesToken = request.cookies.get("token");
  // console.log(cookiesToken)
  let url = request.url;
  let urlRedirect = request.nextUrl.clone();
  const response = NextResponse.next();

  // if (!cookiesToken && url.includes("/profile")) {
  //   urlRedirect.pathname = "/sign-in";
  //   return NextResponse.redirect(urlRedirect);
  // }

  // console.log(url.includes("/verification?") && url.includes("type") && url.includes("id") && url.includes("token"))

  // if (url.includes("/verification") && !url.includes("type") && !url.includes("id") && !url.includes("token")){
  //   console.log("protect");
  // }

  // else if (url.includes("/verification") ) {

  //   console.log("include verification");
  //   if (!request.nextUrl.searchParams.get('id') && !request.nextUrl.searchParams.get('token')) {
  //      console.log("url error");
  //      urlRedirect.pathname = '/'
  //      return NextResponse.rewrite(urlRedirect)
  //   } else if (request.nextUrl.searchParams.get('id') && request.nextUrl.searchParams.get('token')) {
  //     console.log("siap verif");
  //     return response
  //   }
  // }

  if (cookiesToken) {
    // console.log("cookise ada");
    if (url.includes("/verification")) {
      // console.log("include verification");
      // if (!request.nextUrl.searchParams.get('id') && !request.nextUrl.searchParams.get('token')) {
      //    console.log("url error");
      //    urlRedirect.pathname = '/'
      //    return NextResponse.rewrite(urlRedirect)
      // } else if (request.nextUrl.searchParams.get('id') && request.nextUrl.searchParams.get('token')) {
      //   console.log("siap verif");
      //   return response
      // }
    }
  } else {
    // console.log("cookise tidak ada");
    if (url.includes("/profile")) {
      urlRedirect.pathname = "/sign-in";
      return NextResponse.redirect(urlRedirect);
    }
    //  else if (url.includes("/verification")) {
    //   // console.log("bukan link");
    //   // urlRedirect.pathname = "/";
    //   // return NextResponse.redirect(urlRedirect);
    //   if (url.includes("type")) {
    //    return response
    //   } else {
    //     console.log("bukan link type");
    //     urlRedirect.pathname = "/";
    //     return NextResponse.redirect(urlRedirect);
    //   }
    // }
  }

  return response;
  //  else if (url.includes("/verification/email?id=")) {
  //   // urlRedirect.pathname = '/'
  //   // return NextResponse.redirect(urlRedirect)
  //   return response
  // } else if (url.includes("/verification")) {
  //   urlRedirect.pathname = '/'
  //   return NextResponse.redirect(urlRedirect)
  // }

  // if (url.includes("/verification?id=")) {
  //   urlRedirect.pathname = "/";
  //   return NextResponse.redirect(urlRedirect);
  // }

  // else if ( url.includes("/verification") && !request.nextUrl.searchParams.get('id') && (!request.nextUrl.searchParams.get('token'))) {
  //   urlRedirect.pathname = '/'
  //   return NextResponse.redirect(urlRedirect)
  // }

  //  if ( url.includes("/verification") && !request.nextUrl.searchParams.get('id') && !request.nextUrl.searchParams.get('token')) {
  //     // console.log("siap");
  //     urlRedirect.pathname = '/'
  //     return NextResponse.redirect(urlRedirect)
  // }

  // if (url.includes("/verification")) {
  //   try {
  //     if (!request.nextUrl.searchParams.get("id") && !request.nextUrl.searchParams.get("token")) throw "error Url"
  //     return response
  //   } catch (error) {
  //     console.log(error);
  //     urlRedirect.pathname = "/";
  //     return NextResponse.redirect(urlRedirect);
  //   }
  // }
}
// if(req.nextUrl.searchParams.get('flag')) {
//   return NextResponse.rewrite('/feature');
// }

//   else
//   if (cookiesToken && url === process.env.REACT_APP_API_BACKEND) {
//   return NextResponse.redirect(process.env.REACT_APP_API_BACKEND);
//   }

// let token = ""
// if (typeof window !== 'undefined') {
//     return token = window.localStorage.getItem("token");
// }

// console.log(token)

// console.log(request)

// console.log(getFromStorage())

// if (!request) {

// } else {
// if (typeof window !== 'undefined') {
// localStorage.getItem("token");
//  userInfo = localStorage.getItem("userInfo");
//  expiresAt = localStorage.getItem("expiresAt");
//  console.log(token)

//   }

// const cookie = request.
// console.log(localStorage.getItem("token"))
//   let url = req.url;
//   let token = "";

//   if (typeof window != "undefined") {
//     let token = localStorage.getItem("token");
//     console.log(token);
//   }

//   if (typeof window != "undefined") {
//     //   const Router = useRouter();
//     token = localStorage.getItem("token");
//     console.log(token)

//     if (!token && url.includes("/profile")) {
//       return NextResponse.redirect("http://localhost:3000/");
//     }

//     if (token && url === "http://localhost:3000/") {
//       return NextResponse.redirect("http://localhost:3000/");
//     }
//   }
// }
// }

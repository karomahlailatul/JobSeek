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

export default function middleware(request = NextRequest , response = NextRequest) {

  const cookiesToken = request.cookies.get("token")
  // console.log(cookiesToken)
  let url = request.url;
  let urlRedirect = request.nextUrl.clone()

  if (!cookiesToken && url.includes("/profile")) {
    urlRedirect.pathname = '/sign-in'
    return NextResponse.redirect(urlRedirect);
  }

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
}
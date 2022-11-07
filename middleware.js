import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import axios from "axios";
import Cookies from "js-cookie";

export default function middleware(request = NextRequest) {

  const cookiesToken = request.cookies.get("token");
  const cookiesRefreshToken = request.cookies.get("refreshToken");
  const cookiesRole = request.cookies.get("role");
  const cookiesId = request.cookies.get("id");
  const cookiesLockCredential = request.cookies.get("lockCredential");
  const response = NextResponse.next();

  let refreshRequest = false;
  if (cookiesToken && cookiesRefreshToken && cookiesRole && cookiesId && cookiesLockCredential && !refreshRequest) {
    const user = jwt_decode(cookiesToken);
    const isTokenExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (isTokenExpired) {
      refreshRequest = true;
      const res = axios.post(
        process.env.REACT_APP_API_BACKEND + "users/refresh-token",
        { refreshToken: cookiesRefreshToken },
        {
          headers: { "Content-Type": "application/json" },
        },
        { withCredentials: true }
      );

      Cookies.set("token", res.data.data.token);
      Cookies.set("refreshToken", res.data.data.refreshToken);
      response.cookies.set("token", res.data.data.token);
      response.cookies.set("refreshToken", res.data.data.refreshToken);
    }
  }

  return response;
}

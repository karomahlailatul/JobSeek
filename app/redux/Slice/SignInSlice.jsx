import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";

export const postSignIn = createAsyncThunk("SignIn/postSignIn", async ({ data, lockCredential }) => {
  const response = await axios
    .post(process.env.REACT_APP_API_BACKEND + "users/login", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })

    .then((res) => {
      if (res.data.statusCode === 201) {
        toast.success("Sign In Success. Welcome " + res.data.data.name, { toastId: "successSignIn" });
        Cookies.set("token", res.data.data.token);
        Cookies.set("refreshToken", res.data.data.refreshToken);
        Cookies.set("role", res.data.data.role);
        Cookies.set("id", res.data.data.id);
        Cookies.set("lockCredential", lockCredential);
        return res.data;
      } else {
        toast.warning(res.data.message, { toastId: "warningSignIn" });
        return res.data.message;
      }
    })
    .catch((err) => {
      toast.warning(err.response.data.message, { toastId: "errorSignin" });
      return err.response.data;
    });

  return response;
});

const SignInSlice = createSlice({
  name: "SignIn",
  initialState: {
    isLoading: false,
    isError: null,
    SignIn: [],
  },
  extraReducers: {
    [postSignIn.pending]: (state) => {
      state.isLoading = true;
    },
    [postSignIn.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.SignIn = action.payload;
      if (action.payload !== undefined) {
        state.statusCode = action.payload.statusCode;
      }
    },
    [postSignIn.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default SignInSlice.reducer;

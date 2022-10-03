import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
export const getVerificationEmail = createAsyncThunk("VerificationEmail/getVerificationEmail", async ({ verifyType, usersId, tokenVerification }) => {
//   console.log(verifyType);
//   console.log(usersId);
//   console.log(tokenVerification);
  try {
    if (verifyType == "email") {
      const response = await axios.get(process.env.REACT_APP_API_BACKEND + `users/verify?id=${usersId}&token=${tokenVerification}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        },
      });
    //   console.log(response.data)
      return response.data.data;
    }
  } catch (error) {
    
    // toast.warning(error.response.data.message, { autoClose: 2000, toastId: "errorVerificationEmail" });
    return error.response;
    // return JSON.parse(JSON.stringify(error.response.data))
    
    // error.response.data[0];
    // console.log(error.response.data);
  }
});

const VerificationEmailSlice = createSlice({
  name: "VerificationEmail",
  initialState: {
    isLoading: false,
    isError: null,
    VerificationEmail: [],
  },
  extraReducers: {
    [getVerificationEmail.pending]: (state) => {
      state.isLoading = true;
    },
    [getVerificationEmail.fulfilled]: (state, action) => {
      state.isLoading = false;
    //   state.VerificationEmail = action.payload;
      if (action.payload !== undefined) {
        state.VerificationEmail = action.payload.data;
      }
    },
    [getVerificationEmail.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default VerificationEmailSlice.reducer;

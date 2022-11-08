import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import PrivateAxiosSSR from "../../axios/PrivateAxiosSSR";

export const postJobApplyPost = createAsyncThunk("JobApplyPost/postJobApplyPost", async ({ token, refreshToken, data }) => {
  let api = PrivateAxiosSSR({ token, refreshToken });
  if (token) {
    const response = await api
      .post(process.env.REACT_APP_API_BACKEND + "job-apply", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        if (res.data.statusCode === 201) {
          toast.success("You're Success Applied Job", {
            toastId: "successCreateJobApply",
          });
          return res.data;
        }
      })

      .catch((err) => {
        toast.warning(err.response.data.message, {
          toastId: "errorCreateJobApply",
        });
        return err.response.data;
      });

    return response;
  }
});

const JobApplyPostSlice = createSlice({
  name: "JobApplyPost",
  initialState: {
    isLoading: false,
    isError: null,
    JobApplyPost: [],
  },
  extraReducers: {
    [postJobApplyPost.pending]: (state) => {
      state.isLoading = true;
    },
    [postJobApplyPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.JobApplyPost = action.payload;
    },
    [postJobApplyPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default JobApplyPostSlice.reducer;

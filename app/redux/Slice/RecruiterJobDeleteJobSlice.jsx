import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import PrivateAxiosSSR from "../../axios/PrivateAxiosSSR";


export const deleteRecruiterJobDeleteJob = createAsyncThunk("RecruiterJobDeleteJob/deleteRecruiterJobDeleteJob", async ({token, refreshToken ,dataCheckBoxValueList}) => {
  // console.log({token, refreshToken ,dataCheckBoxValueList})
  let api = PrivateAxiosSSR({ token, refreshToken });
  if (token) {
    const response = await api
      .delete(process.env.REACT_APP_API_BACKEND + "job/selected/" + dataCheckBoxValueList, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        return response.data;
      })
      .catch((err) => {
        toast.success(err);
        return err.response.data.message;
      });
    return response;
  }
});

const RecruiterJobDeleteJobSlice = createSlice({
  name: "RecruiterJobDeleteJob",
  initialState: {
    isLoading: false,
    isError: null,
    RecruiterJobDeleteJob: [],
  },
  extraReducers: {
    [deleteRecruiterJobDeleteJob.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteRecruiterJobDeleteJob.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.RecruiterJobDeleteJob = action.payload;
    },
    [deleteRecruiterJobDeleteJob.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default RecruiterJobDeleteJobSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getJobApplyByJob = createAsyncThunk("JobApplyByJob/getJobApplyByJob", async (id) => {
  const response = await axios
    .get(process.env.REACT_APP_API_BACKEND + "job-apply?search=" + id, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data.message;
    });
  return response;
});

const JobApplyByJobSlice = createSlice({
  name: "JobApplyByJob",
  initialState: {
    isLoading: false,
    isError: null,
    JobApplyByJob: [],
  },
  extraReducers: {
    [getJobApplyByJob.pending]: (state) => {
      state.isLoading = true;
    },
    [getJobApplyByJob.fulfilled]: (state, action) => {
      state.isLoading = false;

      // if (action.payload != undefined) {
      state.JobApplyByJob = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.pagination_currentPage = action.payload.pagination.currentPage;
      state.pagination_totalData = action.payload.pagination.totalData;
      state.pagination_limit = action.payload.pagination.limit;
      state.pagination_totalPage = action.payload.pagination.totalPage;
      // console.log(action.payload);
      // }
    },
    [getJobApplyByJob.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default JobApplyByJobSlice.reducer;

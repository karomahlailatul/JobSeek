import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getJobApplyByRecruiter = createAsyncThunk("JobApplyByRecruiter/getJobApplyByRecruiter", async (id) => {
  const response = await axios
    .get(process.env.REACT_APP_API_BACKEND + "job-apply/r?search=" + id, {
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

const JobApplyByRecruiterSlice = createSlice({
  name: "JobApplyByRecruiter",
  initialState: {
    isLoading: false,
    isError: null,
    JobApplyByRecruiter: [],
  },
  extraReducers: {
    [getJobApplyByRecruiter.pending]: (state) => {
      state.isLoading = true;
    },
    [getJobApplyByRecruiter.fulfilled]: (state, action) => {
      state.isLoading = false;

      // if (action.payload != undefined) {
      state.JobApplyByRecruiter = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.pagination_currentPage = action.payload.pagination.currentPage;
      state.pagination_totalData = action.payload.pagination.totalData;
      state.pagination_limit = action.payload.pagination.limit;
      state.pagination_totalPage = action.payload.pagination.totalPage;
      // console.log(action.payload);
      // }
    },
    [getJobApplyByRecruiter.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default JobApplyByRecruiterSlice.reducer;

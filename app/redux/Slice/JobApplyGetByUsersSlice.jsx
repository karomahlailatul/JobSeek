import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getJobApplyByUsers = createAsyncThunk("JobApplyByUsers/getJobApplyByUsers", async (id) => {
  const response = await axios
    .get(process.env.REACT_APP_API_BACKEND + "job-apply/u?search=" + id, {
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

const JobApplyByUsersSlice = createSlice({
  name: "JobApplyByUsers",
  initialState: {
    isLoading: false,
    isError: null,
    JobApplyByUsers: [],
  },
  extraReducers: {
    [getJobApplyByUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getJobApplyByUsers.fulfilled]: (state, action) => {
      state.isLoading = false;

      // if (action.payload != undefined) {
      state.JobApplyByUsers = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.pagination_currentPage = action.payload.pagination.currentPage;
      state.pagination_totalData = action.payload.pagination.totalData;
      state.pagination_limit = action.payload.pagination.limit;
      state.pagination_totalPage = action.payload.pagination.totalPage;
      // console.log(action.payload);
      // }
    },
    [getJobApplyByUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default JobApplyByUsersSlice.reducer;

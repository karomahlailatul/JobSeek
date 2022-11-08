import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getJobSearch = createAsyncThunk("JobSearch/getJobSearch", async (valueSenderSearch) => {
  // console.log(valueSenderSearch)
  const response = await axios
    .get(process.env.REACT_APP_API_BACKEND + "job?" + valueSenderSearch, {
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

const JobSearchSlice = createSlice({
  name: "JobSearch",
  initialState: {
    isLoading: false,
    isError: null,
    JobSearch: [],
  },
  extraReducers: {
    [getJobSearch.pending]: (state) => {
      state.isLoading = true;
    },
    [getJobSearch.fulfilled]: (state, action) => {
      state.isLoading = false;

      // if (action.payload != undefined) {
      state.JobSearch = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.pagination_currentPage = action.payload.pagination.currentPage;
      state.pagination_totalData = action.payload.pagination.totalData;
      state.pagination_limit = action.payload.pagination.limit;
      state.pagination_totalPage = action.payload.pagination.totalPage;
      // console.log(action.payload);
      // }
    },
    [getJobSearch.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default JobSearchSlice.reducer;

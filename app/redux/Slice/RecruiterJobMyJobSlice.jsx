import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PrivateAxios from "../../axios/PrivateAxios";

import Cookies from "js-cookie";

export const getRecruiterJobMyJob = createAsyncThunk("RecruiterJobMyJob/getRecruiterJobMyJob", async (valueSenderSearch) => {
  let api = PrivateAxios();

  const token = Cookies.get("token");
  const id = Cookies.get("id");

  const response = await api

    .get(process.env.REACT_APP_API_BACKEND + `job/fulldatafromrecuiter/${id}?` + valueSenderSearch, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data.message;
    });
  return response;
});

const RecruiterJobMyJobSlice = createSlice({
  name: "RecruiterJobMyJob",
  initialState: {
    isLoading: false,
    isError: null,
    RecruiterJobMyJob: [],
  },
  extraReducers: {
    [getRecruiterJobMyJob.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecruiterJobMyJob.fulfilled]: (state, action) => {
      state.isLoading = false;

      //   console.log(action.payload)
      if (action.payload.message != "Not Found") {
        state.RecruiterJobMyJob = action.payload.data;
        state.statusCode = action.payload.statusCode;
        state.pagination_currentPage = action.payload.pagination.currentPage;
        state.pagination_totalData = action.payload.pagination.totalData;
        state.pagination_limit = action.payload.pagination.limit;
        state.pagination_totalPage = action.payload.pagination.totalPage;
        // console.log();
      }
    },
    [getRecruiterJobMyJob.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default RecruiterJobMyJobSlice.reducer;

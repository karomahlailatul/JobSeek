import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getJobDetails = createAsyncThunk("JobDetails/getJobDetails", async (id) => {
  const response = await axios
    .get(process.env.REACT_APP_API_BACKEND + "job/" + id, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data.data[0];
    })
    .catch((err) => {
      return err.response.data;
    });
  return response;
});

const JobDetailsSlice = createSlice({
  name: "JobDetails",
  initialState: {
    isLoading: false,
    isError: null,
    JobDetails: [],
  },
  extraReducers: {
    [getJobDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [getJobDetails.fulfilled]: (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.JobDetails = action.payload;
      }
    },
    [getJobDetails.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default JobDetailsSlice.reducer;

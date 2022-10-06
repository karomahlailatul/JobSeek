import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getHomePopular = createAsyncThunk("HomePopular/getHomePopular", async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_BACKEND + "recipes?sortby=created_on&sort=asc&page=1&limit=3", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      },
    });
    return response.data.data;
  } catch (error) {
    // console.log(error.response.data.message);
  }
});

const HomePopularSlice = createSlice({
  name: "HomePopular",
  initialState: {
    isLoading: false,
    isError: null,
    HomePopular: [],
  },
  extraReducers: {
    [getHomePopular.pending]: (state) => {
      state.isLoading = true;
    },
    [getHomePopular.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.HomePopular = action.payload;
    },
    [getHomePopular.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default HomePopularSlice.reducer;

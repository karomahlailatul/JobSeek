import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getHomeNew = createAsyncThunk("HomeNew/getHomeNew", async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_BACKEND + "recipes?sortby=created_on&sort=desc&page=1&limit=3", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
      },
    });
    return response.data.data;
  } catch (error) {
    // console.log(error.response.data.message);
  }
});

const HomeNewSlice = createSlice({
  name: "HomeNew",
  initialState: {
    isLoading: false,
    isError: null,
    HomeNew: [],
  },
  extraReducers: {
    [getHomeNew.pending]: (state) => {
      state.isLoading = true;
    },
    [getHomeNew.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.HomeNew = action.payload;
    },
    [getHomeNew.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default HomeNewSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategory = createAsyncThunk("Category/getCategory", async (valueSender) => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_BACKEND + "recipes/category/" + valueSender, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
      },
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    //  console.log(error.response.data.message);
  }
});

const CategorySlice = createSlice({
  name: "Category",
  initialState: {
    isLoading: false,
    isError: null,
    Category: [],
  },
  extraReducers: {
    [getCategory.pending]: (state) => {
      state.isLoading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      // if (action.payload !== undefined) {
      state.Category = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.pagination_currentPage = action.payload.pagination.currentPage;
      state.pagination_totalData = action.payload.pagination.totalData;
      state.pagination_limit = action.payload.pagination.limit;
      state.pagination_totalPage = action.payload.pagination.totalPage;
      // }
      // console.log(action.payload);
    },
    [getCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default CategorySlice.reducer;

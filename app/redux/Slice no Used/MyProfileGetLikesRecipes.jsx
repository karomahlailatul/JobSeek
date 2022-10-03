import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMyProfileGetLikesRecipes = createAsyncThunk(
  "MyProfileGetLikesRecipes/getMyProfileGetLikesRecipes",
  async () => {
    
    const id = localStorage.getItem("id");
    const response = await axios
      .get(
        process.env.REACT_APP_API_BACKEND + "likesrecipes/byUser/" + id,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response.data.message;
      });
    return response;
  }
);

const MyProfileGetLikesRecipesSlice = createSlice({
  name: "MyProfileGetLikesRecipes",
  initialState: {
    isLoading: false,
    isError: null,
    MyProfileGetLikesRecipes: [],
  },
  extraReducers: {
    [getMyProfileGetLikesRecipes.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyProfileGetLikesRecipes.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.MyProfileGetLikesRecipes = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.pagination_currentPage = action.payload.pagination.currentPage;
      state.pagination_totalData = action.payload.pagination.totalData;
      state.pagination_limit = action.payload.pagination.limit;
      state.pagination_totalPage = action.payload.pagination.totalPage;
    },
    [getMyProfileGetLikesRecipes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default MyProfileGetLikesRecipesSlice.reducer;

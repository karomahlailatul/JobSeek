import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMyProfileGetSavedRecipes = createAsyncThunk(
  "MyProfileGetSavedRecipes/getMyProfileGetSavedRecipes",
  async () => {
    
    const id = localStorage.getItem("id");
    const response = await axios
      .get(
        process.env.REACT_APP_API_BACKEND + "savedrecipes/byUser/" + id,
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

const MyProfileGetSavedRecipesSlice = createSlice({
  name: "MyProfileGetSavedRecipes",
  initialState: {
    isLoading: false,
    isError: null,
    MyProfileGetSavedRecipes: [],
  },
  extraReducers: {
    [getMyProfileGetSavedRecipes.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyProfileGetSavedRecipes.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.MyProfileGetSavedRecipes = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.pagination_currentPage = action.payload.pagination.currentPage;
      state.pagination_totalData = action.payload.pagination.totalData;
      state.pagination_limit = action.payload.pagination.limit;
      state.pagination_totalPage = action.payload.pagination.totalPage;
    },
    [getMyProfileGetSavedRecipes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default MyProfileGetSavedRecipesSlice.reducer;

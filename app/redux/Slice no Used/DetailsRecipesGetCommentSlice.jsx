import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDetailsRecipesGetComment = createAsyncThunk(
  "DetailsRecipesGetComment/getDetailsRecipesGetComment",
  async (id) => {
    
    const response = await axios
      .get(
        process.env.REACT_APP_API_BACKEND + "commentrecipes/byRecipes/" + id,
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

const DetailsRecipesGetCommentSlice = createSlice({
  name: "DetailsRecipesGetComment",
  initialState: {
    isLoading: false,
    isError: null,
    DetailsRecipesGetComment: [],
  },
  extraReducers: {
    [getDetailsRecipesGetComment.pending]: (state) => {
      state.isLoading = true;
    },
    [getDetailsRecipesGetComment.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.DetailsRecipesGetComment = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.pagination_currentPage = action.payload.pagination.currentPage;
      state.pagination_totalData = action.payload.pagination.totalData;
      state.pagination_limit = action.payload.pagination.limit;
      state.pagination_totalPage = action.payload.pagination.totalPage;
    },
    [getDetailsRecipesGetComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default DetailsRecipesGetCommentSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDetailsRecipesGetLikes = createAsyncThunk(
  "DetailsRecipesGetLikes/getDetailsRecipesGetLikes",
  async (id) => {
    
    const users_id = localStorage.getItem("id");
    const response = await axios
      .get(
        process.env.REACT_APP_API_BACKEND + `likesrecipes/ByUserByIdRecipes?recipes_id=${id}&users_id=${users_id}`,
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

const DetailsRecipesGetLikesSlice = createSlice({
  name: "DetailsRecipesGetLikes",
  initialState: {
    isLoading: false,
    isError: null,
    DetailsRecipesGetLikes: [],
  },
  extraReducers: {
    [getDetailsRecipesGetLikes.pending]: (state) => {
      state.isLoading = true;
    },
    [getDetailsRecipesGetLikes.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.DetailsRecipesGetLikes = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.pagination_currentPage = action.payload.pagination.currentPage;
      state.pagination_totalData = action.payload.pagination.totalData;
      state.pagination_limit = action.payload.pagination.limit;
      state.pagination_totalPage = action.payload.pagination.totalPage;
    },
    [getDetailsRecipesGetLikes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default DetailsRecipesGetLikesSlice.reducer;

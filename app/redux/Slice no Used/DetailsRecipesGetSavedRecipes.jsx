import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDetailsRecipesGetSaved = createAsyncThunk(
  "DetailsRecipesGetSaved/getDetailsRecipesGetSaved",
  async (id) => {
    
    const users_id = localStorage.getItem("id");
    const response = await axios
      .get(
        process.env.REACT_APP_API_BACKEND + `savedrecipes/ByUserByIdRecipes?recipes_id=${id}&users_id=${users_id}`,
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

const DetailsRecipesGetSavedSlice = createSlice({
  name: "DetailsRecipesGetSaved",
  initialState: {
    isLoading: false,
    isError: null,
    DetailsRecipesGetSaved: [],
  },
  extraReducers: {
    [getDetailsRecipesGetSaved.pending]: (state) => {
      state.isLoading = true;
    },
    [getDetailsRecipesGetSaved.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.DetailsRecipesGetSaved = action.payload.data;
      state.statusCode = action.payload.statusCode;
      state.pagination_currentPage = action.payload.pagination.currentPage;
      state.pagination_totalData = action.payload.pagination.totalData;
      state.pagination_limit = action.payload.pagination.limit;
      state.pagination_totalPage = action.payload.pagination.totalPage;
      // console.log(action.payload.data)
    },
    [getDetailsRecipesGetSaved.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default DetailsRecipesGetSavedSlice.reducer;

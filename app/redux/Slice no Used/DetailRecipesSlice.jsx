import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDetailRecipes = createAsyncThunk(
  "DetailRecipes/getDetailRecipes",
  async (id) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BACKEND + "recipes/" + id,
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
          },
        }
      );

      // console.log(response.data.data[0]);
      return response.data.data[0];
    } catch (error) {
      //  console.log(error.response.data.message);
    }
  }
);

const DetailRecipesSlice = createSlice({
  name: "DetailRecipes",
  initialState: {
    isLoading: false,
    isError: null,
    DetailRecipes: [],
  },
  extraReducers: {
    [getDetailRecipes.pending]: (state) => {
      state.isLoading = true;
    },
    [getDetailRecipes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.DetailRecipes = action.payload;
    },
    [getDetailRecipes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default DetailRecipesSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateAxios from "../../axios/PrivateAxios";

export const getMyRecipesGetDetailsRecipes = createAsyncThunk(
  "MyRecipesGetDetailsRecipes/getMyRecipesGetDetailsRecipes",
  async ({ idRecipes }) => {
    let api = PrivateAxios();

    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await api
          .get(process.env.REACT_APP_API_BACKEND + "recipes/" + idRecipes, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
              // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
            },
          })

          .then((res) => {
            return res.data;
          });
        // console.log(response.data)
        return response;
        // return response.data.data[0];
      }
    } catch (error) {
      // console.log(error.response.data.message);
    }
  }
);

const MyRecipesGetDetailsRecipesSlice = createSlice({
  name: "MyRecipesGetDetailsRecipes",
  initialState: {
    isLoading: false,
    isError: null,
    MyRecipesGetDetailsRecipes: [],
  },
  extraReducers: {
    // Get recipes details
    [getMyRecipesGetDetailsRecipes.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyRecipesGetDetailsRecipes.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.MyRecipesGetDetailsRecipes = action.payload;
      state.MyRecipesGetDetailsRecipes = action.payload.data[0];
      // if (action.payload !== undefined) {
      state.valueRecipes = action.payload.data[0];
      state.recipes_details_id = action.payload.data[0].id;
      state.recipes_details_name = action.payload.data[0].name;
      state.recipes_details_photo_id = action.payload.data[0].photo_id;
      state.recipes_details_description = action.payload.data[0].description;
      state.recipes_details_category_id = action.payload.data[0].category_id;
      state.recipes_details_users_id = action.payload.data[0].users_id;
      state.recipes_details_videos_id = action.payload.data[0].videos_id;
      // }
      // console.log(action.payload)
    },
    [getMyRecipesGetDetailsRecipes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default MyRecipesGetDetailsRecipesSlice.reducer;

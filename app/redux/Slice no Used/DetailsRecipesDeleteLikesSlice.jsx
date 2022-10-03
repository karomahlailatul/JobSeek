import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateAxios from "../../axios/PrivateAxios";

export const deleteDetailsRecipesDeleteLikes = createAsyncThunk("DetailsRecipesDeleteLikes/deletedSelectedDetailsRecipesDeleteLikes", async (id) => {
  let api = PrivateAxios();
  // try {
    const token = localStorage.getItem("token");
    // const id_likes_recipes = localStorage.getItem("id");
    if (token) {
      const response = await api.delete(process.env.REACT_APP_API_BACKEND + "likesrecipes/" + id, {
          headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          toast.success(response.data.message, { autoClose: 2500 });
          return res.data;
        })
        .catch((err) => {
          toast.success(err, { autoClose: 2500 });
          return err.response.data.message;
        });
      return response;
    }
});


const DetailsRecipesDeleteLikesSlice = createSlice({
  name: "DetailsRecipesDeleteLikes",
  initialState: {
    isLoading: false,
    isError: null,
    DetailsRecipesDeleteLikes: [],
  },
  extraReducers: {
    [deleteDetailsRecipesDeleteLikes.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteDetailsRecipesDeleteLikes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.DetailsRecipesDeleteLikes = action.payload;
    //   console.log(action.payload)
    },
    [deleteDetailsRecipesDeleteLikes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default DetailsRecipesDeleteLikesSlice.reducer;

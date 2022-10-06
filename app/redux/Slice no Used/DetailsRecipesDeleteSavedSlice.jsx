import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateAxios from "../../axios/PrivateAxios";

export const deleteDetailsRecipesDeleteSaved = createAsyncThunk("DetailsRecipesDeleteSaved/deletedSelectedDetailsRecipesDeleteSaved", async (id) => {
  let api = PrivateAxios();
  // try {
    // console.log(id)
    const token = localStorage.getItem("token");
    // const id_saved_recipes = localStorage.getItem("id");
    if (token) {
      const response = await api.delete(process.env.REACT_APP_API_BACKEND + "savedrecipes/" + id, {
          headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          toast.success(response.data.message);
          return res.data;
        })
        .catch((err) => {
          toast.success(err);
          return err.response.data.message;
        });
      return response;
    }
});


const DetailsRecipesDeleteSavedSlice = createSlice({
  name: "DetailsRecipesDeleteSaved",
  initialState: {
    isLoading: false,
    isError: null,
    DetailsRecipesDeleteSaved: [],
  },
  extraReducers: {
    [deleteDetailsRecipesDeleteSaved.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteDetailsRecipesDeleteSaved.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.DetailsRecipesDeleteSaved = action.payload;
      // console.log(action.payload)
    },
    [deleteDetailsRecipesDeleteSaved.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default DetailsRecipesDeleteSavedSlice.reducer;

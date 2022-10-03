import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateAxios from "../../axios/PrivateAxios";

export const deletedSelectedMyRecipesDeleteSelected = createAsyncThunk("MyRecipesDeleteSelected/deletedSelectedMyRecipesDeleteSelected", async (dataDeleteCheckList) => {
  let api = PrivateAxios();
  // try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await api.delete(process.env.REACT_APP_API_BACKEND + "recipes/selected/" + dataDeleteCheckList, {
          headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          toast.success(response.data.message, { autoClose: 2500 });
          return response.data;
        })
        .catch((err) => {
          toast.success(err, { autoClose: 2500 });
          return err.response.data.message;
        });
      return response;
    }
});


const MyRecipesDeleteSelectedSlice = createSlice({
  name: "MyRecipesDeleteSelected",
  initialState: {
    isLoading: false,
    isError: null,
    MyRecipesDeleteSelected: [],
  },
  extraReducers: {
    [deletedSelectedMyRecipesDeleteSelected.pending]: (state) => {
      state.isLoading = true;
    },
    [deletedSelectedMyRecipesDeleteSelected.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.MyRecipesDeleteSelected = action.payload;
    },
    [deletedSelectedMyRecipesDeleteSelected.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default MyRecipesDeleteSelectedSlice.reducer;

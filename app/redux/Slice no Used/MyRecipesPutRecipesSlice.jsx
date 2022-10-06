import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateAxios from "../../axios/PrivateAxios";

export const putMyRecipesPutRecipes = createAsyncThunk("MyRecipesPutRecipes/putMyRecipesPutRecipes", async ({idRecipes,formDataEdit}) => {
  let api = PrivateAxios();

  try {
    const token = localStorage.getItem("token");
    // console.log(idRecipes)
    
    // console.log(formDataEdit)
    if (token) {
      const response = await api
        .put(process.env.REACT_APP_API_BACKEND + "recipes/"+ idRecipes , formDataEdit, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        // console.log(response)
        .then((res) => {
          // console.log(res);
          toast.success(res.data.message);
          return res.data;
        })
        .catch((err) => {
          // getMyRecipesPutRecipes()
          // console.log(err);
          toast.warning(err.response.data.message);
          return err.response.data
          // alert(err);
        });
      // console.log(response.data)
      return response;
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
});


const MyRecipesPutRecipesSlice = createSlice({
  name: "MyRecipesPutRecipes",
  initialState: {
    isLoading: false,
    isError: null,
    MyRecipesPutRecipes: [],
  },
  extraReducers: {


    [putMyRecipesPutRecipes.pending]: (state) => {
      state.isLoading = true;
    },
    [putMyRecipesPutRecipes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.MyRecipesPutRecipes = action.payload;
    },
    [putMyRecipesPutRecipes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default MyRecipesPutRecipesSlice.reducer;

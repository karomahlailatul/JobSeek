import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateAxios from "../../axios/PrivateAxios";

export const postMyRecipesPostRecipes = createAsyncThunk("MyRecipesPostRecipes/postMyRecipesPostRecipes", async (formDataCreate) => {
  let api = PrivateAxios();

  try {
    const token = localStorage.getItem("token");
    
    if (token) {
      const response = await api
        .post(process.env.REACT_APP_API_BACKEND + "recipes/", formDataCreate, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        
        .then((res) => {
          // console.log(res);
          // toast.success(res.data.message);
          return res.data;
        })
        .catch((err) => {
    
          // console.log(err);
          // toast.warning(err.response.data.message);
          return err.response.data
          // alert(err);
        });
        
      return response;
    }
  } catch (error) {
    // console.log(error.response.data.message);
  }
});


const MyRecipesPostRecipesSlice = createSlice({
  name: "MyRecipesPostRecipes",
  initialState: {
    isLoading: false,
    isError: null,
    MyRecipesPostRecipes: [],
  },
  extraReducers: {

    
    [postMyRecipesPostRecipes.pending]: (state) => {
      state.isLoading = true;
    },
    [postMyRecipesPostRecipes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.MyRecipesPostRecipes = action.payload;
    },
    [postMyRecipesPostRecipes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },

    
  },
});

export default MyRecipesPostRecipesSlice.reducer;

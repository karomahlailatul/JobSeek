import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PrivateAxios from "../../axios/PrivateAxios";

export const getMyRecipesGetAllRecipes = createAsyncThunk("MyRecipesGetAllRecipes/getMyRecipesGetAllRecipes", async () => {
  let api = PrivateAxios();

  try {
    const token = localStorage.getItem("token");
    
  const id = localStorage.getItem("id");
    if (token) {
      const response = await api.get(process.env.REACT_APP_API_BACKEND + "recipes/usersrecipes/" +id, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        return res.data;
    })
      return response;
    }
  } catch (error) {
    // console.log(error.response.data.message);
  }
});


const MyRecipesGetAllRecipesSlice = createSlice({
  name: "MyRecipesGetAllRecipes",
  initialState: {
    isLoading: false,
    isError: null,
    MyRecipesGetAllRecipes: [],
  },
  extraReducers: {
    [getMyRecipesGetAllRecipes.pending]: (state) => {
      state.isLoading = true;
    },
    [getMyRecipesGetAllRecipes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.MyRecipesGetAllRecipes = action.payload.data;
    },
    [getMyRecipesGetAllRecipes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default MyRecipesGetAllRecipesSlice.reducer;

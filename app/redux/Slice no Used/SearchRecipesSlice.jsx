import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSearchRecipes = createAsyncThunk("SearchRecipes/getSearchRecipes", async (valueSenderSearch) => {
  // const response = await
  //     // (keyword
  //     // !== null ? \
  //     axios
  //         .get(process.env.REACT_APP_API_BACKEND + "recipes?" + valueSender)

  //         //  .get(process.env.REACT_APP_API_BACKEND + "product?search=" + search + "&sortby=name&sort=" + sort + "&page=1&limit=24")
  //         .catch((error) => {
  //             console.log(error);
  //         })
  // :
  // axios
  //     .get(process.env.REACT_APP_API_BACKEND + "product")
  //     //  .get(process.env.REACT_APP_API_BACKEND + "product?search=" + search + "&sortby=name&sort=" + sort + "&page=1&limit=24")
  //     .catch((error) => {
  //         console.log(error);
  //     })
  // );

  // const result = await response.data;
  // return result;

  const response = await axios
    .get(process.env.REACT_APP_API_BACKEND + "recipes?" + valueSenderSearch, {
      headers: {
        // "Content-Type": "multipart/form-data",
        //   Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      // alert("delete success");
      // toast.success(response.data.message);
      // setShowModalDeleteSelected(false);
      // getAllProduct();
      // console.log(response.data)
      return response.data;
    })
    .catch((err) => {
      // alert("delete failed");
      // toast.success(err);
      // setShowModalDeleteSelected(false);
      return err.response.data.message;
    });
  // console.log(response)
  return response;
});

const SearchRecipesSlice = createSlice({
  name: "SearchRecipes",
  initialState: {
    isLoading: false,
    isError: null,
    SearchRecipes: [],
  },
  extraReducers: {
    [getSearchRecipes.pending]: (state) => {
      state.isLoading = true;
    },
    [getSearchRecipes.fulfilled]: (state, action) => {
      state.isLoading = false;

      // if (action.payload !== undefined) {
        state.SearchRecipes = action.payload.data;
        state.statusCode = action.payload.statusCode;
        state.pagination_currentPage = action.payload.pagination.currentPage;
        state.pagination_totalData = action.payload.pagination.totalData;
        state.pagination_limit = action.payload.pagination.limit;
        state.pagination_totalPage = action.payload.pagination.totalPage;
        // console.log(action.payload);
      // }
    },
    [getSearchRecipes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default SearchRecipesSlice.reducer;

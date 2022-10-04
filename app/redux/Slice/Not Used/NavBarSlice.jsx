import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import "react-toastify/dist/ReactToastify.css";

import PrivateAxios from "../../axios/PrivateAxios";

import Cookies from "js-cookie";

export const getNavBar = createAsyncThunk("NavBar/getNavBar", async () => {
  let api = PrivateAxios();
  try {
    const token = Cookies.get('token')
    // console.log(token)
    if (token) {
      const response = await api.get(process.env.REACT_APP_API_BACKEND + "users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data;
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
});

const NavBarSlice = createSlice({
  name: "NavBar",
  initialState: {
    isLoading: false,
    isError: null,
    NavBar: [],
  },
  extraReducers: {
    [getNavBar.pending]: (state) => {
      state.isLoading = true;
    },
    [getNavBar.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log(action)
      if (action.payload !== undefined) {
        state.NavBar = action.payload.data;
      }
    },
    [getNavBar.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default NavBarSlice.reducer;

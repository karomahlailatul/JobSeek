import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import PrivateAxios from "../../axios/PrivateAxios";

import Cookies from "js-cookie";

export const getNavBarUsers = createAsyncThunk("NavBarUsers/getNavBarUsers", async () => {
  let api = PrivateAxios();
  const token = Cookies.get("token");
  if (token) {
    const response = await api
      .get(process.env.REACT_APP_API_BACKEND + "users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
    return response;
  }
});

const NavBarUsersSlice = createSlice({
  name: "NavBarUsers",
  initialState: {
    isLoading: false,
    isError: null,
    NavBarUsers: [],
  },
  extraReducers: {
    [getNavBarUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getNavBarUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload !== undefined) {
        state.NavBarUsers = action.payload.data;
      }
    },
    [getNavBarUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default NavBarUsersSlice.reducer;

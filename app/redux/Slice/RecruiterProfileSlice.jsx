import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PrivateAxios from "../../axios/PrivateAxios";
import Cookies from "js-cookie";

export const getRecruiterProfile = createAsyncThunk("RecruiterProfile/getRecruiterProfile", async () => {
  let api = PrivateAxios();
  try {
    const token = Cookies.get("token");
    const id = Cookies.get("id");

    if (token) {
      const response = await api.get(process.env.REACT_APP_API_BACKEND + "recruiter/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      // console.log( response.data)
      return response.data;
    }
  } catch (error) {
    
    return error.response.data;
    // console.log(error.response.data.message);
  }
});

const RecruiterProfileSlice = createSlice({
  name: "RecruiterProfile",
  initialState: {
    isLoading: false,
    isError: null,
    RecruiterProfile: [],
  },
  extraReducers: {
    [getRecruiterProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecruiterProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (action.payload !== undefined) {
        state.RecruiterProfile = action.payload.data[0];
      }
    },
    [getRecruiterProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default RecruiterProfileSlice.reducer;

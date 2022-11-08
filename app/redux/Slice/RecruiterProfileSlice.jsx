import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PrivateAxiosSSR from "../../axios/PrivateAxiosSSR";

export const getRecruiterProfile = createAsyncThunk("RecruiterProfile/getRecruiterProfile", async ({ token, refreshToken, id }) => {

  let api = PrivateAxiosSSR({ token, refreshToken });
  try {
    if (token) {
      const response = await api.get(process.env.REACT_APP_API_BACKEND + "recruiter/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data.data[0];
    }
  } catch (error) {
    return error.response.data;
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
        state.RecruiterProfile = action.payload;
      }
    },
    [getRecruiterProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default RecruiterProfileSlice.reducer;

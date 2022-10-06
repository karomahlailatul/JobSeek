import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

import PrivateAxios from "../../axios/PrivateAxios";
import Cookies from "js-cookie";

export const putRecruiterProfilePutProfileSlice = createAsyncThunk("RecruiterProfilePutProfileSlice/putRecruiterProfilePutProfileSlice", async (formData) => {
  let api = PrivateAxios();

  const token = Cookies.get("token");
  const id = Cookies.get("id");
  if (token) {
    const response = await api
      .put(process.env.REACT_APP_API_BACKEND + "recruiter/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message, { toastId: "successUpdateRecruiter" });
        return res.data
      })
      .catch((err) => {
        toast.warning(err.response.data.message, { toastId: "warningUpdateRecruiter" });
        return err.response.data
      });
    return response;
  }
});

const RecruiterProfilePutProfileSliceSlice = createSlice({
  name: "RecruiterProfilePutProfileSlice",
  initialState: {
    isLoading: false,
    isError: null,
    RecruiterProfilePutProfileSlice: [],
  },
  extraReducers: {
    [putRecruiterProfilePutProfileSlice.pending]: (state) => {
      state.isLoading = true;
    },
    [putRecruiterProfilePutProfileSlice.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.RecruiterProfilePutProfileSlice = action.payload;
    },
    [putRecruiterProfilePutProfileSlice.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default RecruiterProfilePutProfileSliceSlice.reducer;

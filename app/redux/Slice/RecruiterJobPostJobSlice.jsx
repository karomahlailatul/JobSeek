import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import Cookies from "js-cookie";
import PrivateAxios from "../../axios/PrivateAxios";

export const postRecruiterJobPostJob = createAsyncThunk("RecruiterJobPostJob/postRecruiterJobPostJob", async (formData) => {
  let api = PrivateAxios();

  const token = Cookies.get("token");

  if (token) {
    const response = await api
      .post(process.env.REACT_APP_API_BACKEND + "job/withskilljob", JSON.stringify(formData), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        if (res.data.statusCode === 201) {
          toast.success(res.data.message, {
            toastId: "successCreateJob",
          });
          return res.data;
        }
      })

      .catch((err) => {
        toast.warning(err.response.data.message, {
          toastId: "errorCreateJob",
        });
        return err.response.data;
      });

    return response;
  }
});

const RecruiterJobPostJobSlice = createSlice({
  name: "RecruiterJobPostJob",
  initialState: {
    isLoading: false,
    isError: null,
    RecruiterJobPostJob: [],
  },
  extraReducers: {
    [postRecruiterJobPostJob.pending]: (state) => {
      state.isLoading = true;
    },
    [postRecruiterJobPostJob.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.RecruiterJobPostJob = action.payload;
    },
    [postRecruiterJobPostJob.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default RecruiterJobPostJobSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


import PrivateAxiosSSR from "../../axios/PrivateAxiosSSR";

export const putRecruiterJobPutJob = createAsyncThunk("RecruiterJobPutJob/putRecruiterJobPutJob", async ({ token, refreshToken, idJob, data }) => {
 
  let api = PrivateAxiosSSR({ token, refreshToken });
  if (token) {
    const response = await api
      .put(process.env.REACT_APP_API_BACKEND + "job/withskilljob/" + idJob, JSON.stringify(data), {
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

const RecruiterJobPutJobSlice = createSlice({
  name: "RecruiterJobPutJob",
  initialState: {
    isLoading: false,
    isError: null,
    RecruiterJobPutJob: [],
  },
  extraReducers: {
    [putRecruiterJobPutJob.pending]: (state) => {
      state.isLoading = true;
    },
    [putRecruiterJobPutJob.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.RecruiterJobPutJob = action.payload;
    },
    [putRecruiterJobPutJob.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default RecruiterJobPutJobSlice.reducer;

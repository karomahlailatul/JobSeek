import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getJobSearch = createAsyncThunk("JobSearch/getJobSearch", async (valueSenderSearch) => {
  // const response = await
  //     // (keyword
  //     // !== null ? \
  //     axios
  //         .get(process.env.REACT_APP_API_BACKEND + "Job?" + valueSender)

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
    .get(process.env.REACT_APP_API_BACKEND + "job/fulldata?" + valueSenderSearch, {
      headers: {
        // "Content-Type": "multipart/form-data",
        //   Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      // alert("delete success");
      // toast.success(response.data.message, { autoClose: 2500 });
      // setShowModalDeleteSelected(false);
      // getAllProduct();
      // console.log(response.data)
      return response.data;
    })
    .catch((err) => {
      // alert("delete failed");
      // toast.success(err, { autoClose: 2500 });
      // setShowModalDeleteSelected(false);
      return err.response.data.message;
    });
  // console.log(response)
  return response;
});

const JobSearchSlice = createSlice({
  name: "JobSearch",
  initialState: {
    isLoading: false,
    isError: null,
    JobSearch: [],
  },
  extraReducers: {
    [getJobSearch.pending]: (state) => {
      state.isLoading = true;
    },
    [getJobSearch.fulfilled]: (state, action) => {
      state.isLoading = false;

      // if (action.payload !== undefined) {
        state.JobSearch = action.payload.data;
        state.statusCode = action.payload.statusCode;
        state.pagination_currentPage = action.payload.pagination.currentPage;
        state.pagination_totalData = action.payload.pagination.totalData;
        state.pagination_limit = action.payload.pagination.limit;
        state.pagination_totalPage = action.payload.pagination.totalPage;
        // console.log(action.payload);
      // }
    },
    [getJobSearch.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default JobSearchSlice.reducer;

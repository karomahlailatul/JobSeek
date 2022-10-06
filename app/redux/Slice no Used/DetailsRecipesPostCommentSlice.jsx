import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateAxios from "../../axios/PrivateAxios";
export const postDetailsRecipesPostComment = createAsyncThunk(
  "DetailsRecipesPostComment/postDetailsRecipesPostComment",
  async (dataComment) => {
    let api = PrivateAxios();

    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await api
          .post(
            process.env.REACT_APP_API_BACKEND + "commentrecipes",
            JSON.stringify(dataComment),
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
              },
            }
          )

          .then((res) => {
            if (res.data.statusCode === 201) {
              toast.success("Your Comment Has Sended", {
                
                toastId: "successComment",
              });
            } else {
              toast.warning(res.data.message, {
                
                toastId: "warningComment",
              });
            }
            return res.data;
          })
          .catch((err) => {
            // console.log(err);
            toast.warning(err.response.data.message, {
              
              toastId: "errorComment",
            });
            return err.response.data;
            // alert(err);
          });

        return response;
      }
    } catch (error) {
      // console.log(error.response.data.message);
    }
  }
);

const DetailsRecipesPostCommentSlice = createSlice({
  name: "DetailsRecipesPostComment",
  initialState: {
    isLoading: false,
    isError: null,
    status: "idle",
    DetailsRecipesPostComment: [],
  },
  extraReducers: {
    [postDetailsRecipesPostComment.pending]: (state) => {
      state.isLoading = true;
      state.status = "loading";
    },
    [postDetailsRecipesPostComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.DetailsRecipesPostComment = action.payload;
      state.status = "success";
    },
    [postDetailsRecipesPostComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
      state.status = "failed";
    },
  },
});

export default DetailsRecipesPostCommentSlice.reducer;

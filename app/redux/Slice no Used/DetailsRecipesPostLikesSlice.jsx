import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateAxios from "../../axios/PrivateAxios";
export const postDetailsRecipesPostLikes = createAsyncThunk(
  "DetailsRecipesPostLikes/postDetailsRecipesPostLikes",
  async (dataLikes) => {
    let api = PrivateAxios();

    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await api
          .post(
            process.env.REACT_APP_API_BACKEND + "likesrecipes",
            JSON.stringify(dataLikes),
            {
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${token}`,
              },
            }
          )

          .then((res) => {
            // if (res.data.statusCode === 201) {
              toast.success("Recipes has Likes", {
                
                toastId: "successLikes",
              });
            // } else {
            //   toast.warning(res.data.message, {
            //     
            //     toastId: "warningLikes",
            //   });
            // }
            return res.data;
          })
          .catch((err) => {
            // console.log(err);
            toast.warning(err.response.data.message, {
              
              toastId: "errorLikes",
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

const DetailsRecipesPostLikesSlice = createSlice({
  name: "DetailsRecipesPostLikes",
  initialState: {
    isLoading: false,
    isError: null,
    status: "idle",
    DetailsRecipesPostLikes: [],
  },
  extraReducers: {
    [postDetailsRecipesPostLikes.pending]: (state) => {
      state.isLoading = true;
      state.status = "loading";
    },
    [postDetailsRecipesPostLikes.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.DetailsRecipesPostLikes = action.payload;
      state.status = "success";
      // console.log(action.payload)
    },
    [postDetailsRecipesPostLikes.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
      state.status = "failed";
    },
  },
});

export default DetailsRecipesPostLikesSlice.reducer;

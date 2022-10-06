import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateAxios from "../../axios/PrivateAxios";
export const postDetailsRecipesPostSaved = createAsyncThunk(
  "DetailsRecipesPostSaved/postDetailsRecipesPostSaved",
  async (dataSaved) => {
    let api = PrivateAxios();

    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await api
          .post(
            process.env.REACT_APP_API_BACKEND + "savedrecipes",
            JSON.stringify(dataSaved),
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
              toast.success("Recipes has Saved", {
                
                toastId: "successSaved",
              });
            // } else {
            //   toast.warning(res.data.message, {
            //     
            //     toastId: "warningSaved",
            //   });
            }
            return res.data;
          })
          .catch((err) => {
            // console.log(err);
            toast.warning(err.response.data.message, {
              
              toastId: "errorSaved",
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

const DetailsRecipesPostSavedSlice = createSlice({
  name: "DetailsRecipesPostSaved",
  initialState: {
    isLoading: false,
    isError: null,
    status: "idle",
    DetailsRecipesPostSaved: [],
  },
  extraReducers: {
    [postDetailsRecipesPostSaved.pending]: (state) => {
      state.isLoading = true;
      state.status = "loading";
    },
    [postDetailsRecipesPostSaved.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.DetailsRecipesPostSaved = action.payload;
      state.status = "success";
      // console.log(action.payload)
    },
    [postDetailsRecipesPostSaved.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
      state.status = "failed";
    },
  },
});

export default DetailsRecipesPostSavedSlice.reducer;

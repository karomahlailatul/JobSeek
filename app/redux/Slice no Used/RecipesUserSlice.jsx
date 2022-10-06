import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateAxios from "../../axios/PrivateAxios";

export const getRecipesUser = createAsyncThunk("RecipesUser/getRecipesUser", async (valueSender) => {
  let api = PrivateAxios();

  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await api.get(process.env.REACT_APP_API_BACKEND + "recipes?" + valueSender , {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        },
      });
      // console.log(response.data)
      return response.data;
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
});

export const putRecipesUser = createAsyncThunk("RecipesUser/putRecipesUser", async (formData) => {
  let api = PrivateAxios();

  try {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (token) {
      const response = await api
        .put(process.env.REACT_APP_API_BACKEND + "recipes/" + id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          toast.success("Update Profile Success");
        })
        .catch((err) => {
          // getRecipesUser()
          console.log(err);
          toast.warning(err.response.data.message);
          // alert(err);
        });
      // console.log(response.data)
      return response;
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
});

const RecipesUserSlice = createSlice({
  name: "RecipesUser",
  initialState: {
    isLoading: false,
    isError: null,
    RecipesUser: [],
  },
  extraReducers: {
    [getRecipesUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecipesUser.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.RecipesUser = action.payload;
      // if (action.payload !== undefined) {
        // state.user_id = action.payload.data.id;
        // state.user_email = action.payload.data.email;
        // state.user_name = action.payload.data.name;
        // state.user_gender = action.payload.data.gender;
        // state.user_phone = action.payload.data.phone;

        // // state.user_date_of_birth = action.payload.data.date_of_birth
        // const dob = action.payload.data.date_of_birth.split("T");
        // state.user_date_of_birth = dob[0];

        // state.user_picture = action.payload.data.picture;
        // state.user_role = action.payload.data.role;
        // state.user_created_on = action.payload.data.created_on;
        // state.user_updated_on = action.payload.data.updated_on;
      // }

      // console.log( action.payload)
    },
    [getRecipesUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },

    [putRecipesUser.pending]: (state) => {
      state.isLoading = true;
    },
    [putRecipesUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.RecipesUser = action.payload;
    },
    [putRecipesUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default RecipesUserSlice.reducer;

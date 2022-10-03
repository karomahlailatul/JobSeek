import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateAxios from "../../axios/PrivateAxios";
import Cookies from "js-cookie";

export const putProfileUserPutProfile = createAsyncThunk("ProfileUserPutProfile/putProfileUserPutProfile", async (formData) => {
  let api = PrivateAxios();

  try {
    const token = Cookies.get('token')
    if (token) {
      const response = await api
        .put(process.env.REACT_APP_API_BACKEND + "users/profile?update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          // console.log(res);
          toast.success("Update Profile Success", { autoClose: 2500 });
        })
        .catch((err) => {
          // getProfileUserPutProfile()
          // console.log(err);
          toast.warning(err.response.data.message, { autoClose: 2500 });
          // alert(err);
        });
      // console.log(response.data)
      return response;
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
});

const ProfileUserPutProfileSlice = createSlice({
  name: "ProfileUserPutProfile",
  initialState: {
    isLoading: false,
    isError: null,
    ProfileUserPutProfile: [],
  },
  extraReducers: {
    
    [putProfileUserPutProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [putProfileUserPutProfile.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.ProfileUserPutProfile = action.payload;
    },
    [putProfileUserPutProfile.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default ProfileUserPutProfileSlice.reducer;

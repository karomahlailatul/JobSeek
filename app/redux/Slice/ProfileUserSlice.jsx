import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateAxios from "../../axios/PrivateAxios";
// import Cookies from "js-cookie";
export const getProfileUser = createAsyncThunk("ProfileUser/getProfileUser", async ({token}) => {
  let api = PrivateAxios();

  try {
    // const token = Cookies.get('token')
    if (token) {
      const response = await api.get(process.env.REACT_APP_API_BACKEND + "users/profile", {
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

// export const putProfileUser = createAsyncThunk("ProfileUser/putProfileUser", async (formData) => {
//   let api = PrivateAxios();

//   try {
//     const token = Cookies.get('token')
//     if (token) {
//       const response = await api
//         .put(process.env.REACT_APP_API_BACKEND + "users/profile?update", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//           // console.log(res);
//           toast.success("Update Profile Success", { autoClose: 2500 });
//         })
//         .catch((err) => {
//           // getProfileUser()
//           // console.log(err);
//           toast.warning(err.response.data.message, { autoClose: 2500 });
//           // alert(err);
//         });
//       // console.log(response.data)
//       return response;
//     }
//   } catch (error) {
//     console.log(error.response.data.message);
//   }
// });

const ProfileUserSlice = createSlice({
  name: "ProfileUser",
  initialState: {
    isLoading: false,
    isError: null,
    ProfileUser: [],
  },
  extraReducers: {
    [getProfileUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getProfileUser.fulfilled]: (state, action) => {
      state.isLoading = false;

      if (action.payload !== undefined) {
        
        state.ProfileUser = action.payload.data;

        // state.user_id = action.payload.data.id;
        // state.user_email = action.payload.data.email;
        // state.user_name = action.payload.data.name;
        // state.user_gender = action.payload.data.gender;
        // state.user_phone = action.payload.data.phone;

        if (action.payload.data.date_of_birth) {
          const dob = action.payload.data.date_of_birth.split("T");
        // state.user_date_of_birth = dob[0]
        state.ProfileUser.date_of_birth = dob[0]
      } else {
        // state.user_date_of_birth = action.payload.data.date_of_birth
        state.ProfileUser.date_of_birth = action.payload.data.date_of_birth
      }

        // state.user_picture = action.payload.data.picture;
        // state.user_job_desk = action.payload.data.job_desk;
        // state.user_domicile = action.payload.data.domicile;
        // state.user_location = action.payload.data.picture;
        // state.user_description = action.payload.data.description;
        // state.user_role = action.payload.data.role;
        // state.user_created_on = action.payload.data.created_on;
        // state.user_updated_on = action.payload.data.updated_on;
      }

      // console.log( action.payload)
    },
    [getProfileUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },

    // [putProfileUser.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [putProfileUser.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.ProfileUser = action.payload;
    // },
    // [putProfileUser.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.isError = action.error;
    // },
  },
});

export default ProfileUserSlice.reducer;

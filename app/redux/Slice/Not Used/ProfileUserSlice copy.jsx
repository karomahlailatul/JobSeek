import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateAxiosSSR from "../../axios/PrivateAxiosSSR";

export const getProfileUser = createAsyncThunk("ProfileUser/getProfileUser", async ({token,refreshToken}) => {
  let apiSSR = PrivateAxiosSSR({token,refreshToken});
  try {
    if (token) {
      const response = await apiSSR.get(process.env.REACT_APP_API_BACKEND + "users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
      
        },
      });
      return response.data;
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
});

// export const putProfileUser = createAsyncThunk("ProfileUser/putProfileUser", async (formData) => {
//   let api = PrivateAxios();

//   try {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const response = await api
//         .put(process.env.REACT_APP_API_BACKEND + "users/profile?update", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//           console.log(res);
//           toast.success("Update Profile Success");
//         })
//         .catch((err) => {
//           // getProfileUser()
//           console.log(err);
//           toast.warning(err.response.data.message);
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
      // console.log("pending gaes")
    },
    [getProfileUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      // console.log("ready gaes")
      state.ProfileUser = action.payload.data;
      // if (action.payload !== undefined) {
      //   state.user_id = action.payload.data.id;
      //   state.user_email = action.payload.data.email;
      //   state.user_name = action.payload.data.name;
      //   state.user_gender = action.payload.data.gender;
      //   state.user_phone = action.payload.data.phone;

      //   // state.user_date_of_birth = action.payload.data.date_of_birth
      //   if (action.payload.data.date_of_birth) {
      //     const dob = action.payload.data.date_of_birth.split("T");
      //   state.user_date_of_birth = dob[0]
      // } else {
      //   state.user_date_of_birth = action.payload.data.date_of_birth
      // }

      //   state.user_picture = action.payload.data.picture;
      //   state.user_role = action.payload.data.role;
      //   state.user_created_on = action.payload.data.created_on;
      //   state.user_updated_on = action.payload.data.updated_on;
      // }
      // console.log(action.payload)
    },
    [getProfileUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});


export default ProfileUserSlice.reducer;

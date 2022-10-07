import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSkill = createAsyncThunk("Skill/getSkill", async () => {
const response = await axios
    .get(process.env.REACT_APP_API_BACKEND + "skill", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data.message;
    });
  return response;
});

const SkillSlice = createSlice({
  name: "Skill",
  initialState: {
    isLoading: false,
    isError: null,
    Skill: [],
  },
  extraReducers: {
    [getSkill.pending]: (state) => {
      state.isLoading = true;
    },
    [getSkill.fulfilled]: (state, action) => {
      state.isLoading = false;

      if (action.payload !== undefined) {
        state.Skill = action.payload.data;
        state.SkillId = action.payload.data.id;
        state.SkillName = action.payload.data.name;
        state.statusCode = action.payload.statusCode;
        state.pagination_currentPage = action.payload.pagination.currentPage;
        state.pagination_totalData = action.payload.pagination.totalData;
        state.pagination_limit = action.payload.pagination.limit;
        state.pagination_totalPage = action.payload.pagination.totalPage;
        // console.log(action.payload);
      }
    },
    [getSkill.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.error;
    },
  },
});

export default SkillSlice.reducer;

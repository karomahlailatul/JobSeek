import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import SignInReducer from "./Slice/SignInSlice";
import SignUpUserReducer from "./Slice/SignUpUserSlice";

import UsersProfileReducer from "./Slice/UsersProfileSlice";
import UsersProfilePutProfileReducer from "./Slice/UsersProfilePutProfileSlice";

import VerificationEmailReducer from "./Slice/VerificationEmailSlice";

import RecruiterProfileReducer from "./Slice/RecruiterProfileSlice";
import RecruiterProfilePutProfileReducer from "./Slice/RecruiterProfilePutProfileSlice";

import RecruiterJobDeleteJobReducer from "./Slice/RecruiterJobDeleteJobSlice";
import RecruiterJobPostJobReducer from "./Slice/RecruiterJobPostJobSlice";

import SkillReducer from "./Slice/SkillSlice";
import JobSearchReducer from "./Slice/JobSearchSlice";
import JobDetailsReducer from "./Slice/JobDetailsSlice";
import JobApplyPostReducer from "./Slice/JobApplyPostSlice";
import JobApplyGetByJobReducer from "./Slice/JobApplyGetByJobSlice";
import JobApplyGetByRecruiterReducer from "./Slice/JobApplyGetByRecruiterSlice";
import JobApplyGetByusersReducer from "./Slice/JobApplyGetByUsersSlice";

const rootReducer = combineReducers({
  SignIn: SignInReducer,
  SignUpUser: SignUpUserReducer,

  UsersProfile: UsersProfileReducer,
  UsersProfilePutProfile: UsersProfilePutProfileReducer,

  VerificationEmail: VerificationEmailReducer,

  JobSearch: JobSearchReducer,
  JobDetails: JobDetailsReducer,

  RecruiterProfile: RecruiterProfileReducer,
  RecruiterProfilePutProfile: RecruiterProfilePutProfileReducer,

  RecruiterJobDeleteJob: RecruiterJobDeleteJobReducer,
  RecruiterJobPostJob: RecruiterJobPostJobReducer,

  Skill: SkillReducer,
  
  JobApplyPost: JobApplyPostReducer,
  JobApplyGetByJob: JobApplyGetByJobReducer,
  JobApplyGetByUsers: JobApplyGetByusersReducer,
  JobApplyGetByRecruiter: JobApplyGetByRecruiterReducer,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return rootReducer(state, action);
};

const makeStore = () => {
  return configureStore({
    reducer: reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export const wrapper = createWrapper(makeStore, { debug: false });

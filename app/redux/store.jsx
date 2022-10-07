import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import SignInReducer from "./Slice/SignInSlice";
import SignUpUserReducer from "./Slice/SignUpUserSlice";

import UsersProfileReducer from "./Slice/UsersProfileSlice";
import UsersProfilePutProfileReducer from "./Slice/UsersProfilePutProfileSlice";

import VerificationEmailReducer from "./Slice/VerificationEmailSlice";
import JobSearchReducer from "./Slice/JobSearchSlice";

import NavBarUsersReducer from "./Slice/NavBarUsersSlice";

import RecruiterProfileReducer from "./Slice/RecruiterProfileSlice";
import RecruiterProfilePutProfileReducer from "./Slice/RecruiterProfilePutProfileSlice";

import RecruiterJobMyJobReducer from "./Slice/RecruiterJobMyJobSlice"
import RecruiterJobDeleteJobReducer from "./Slice/RecruiterJobDeleteJobSlice";
import RecruiterJobPostJobReducer from "./Slice/RecruiterJobPostJobSlice"

import SkillReducer from "./Slice/Skill";

const rootReducer = combineReducers({

  SignIn: SignInReducer,
  SignUpUser: SignUpUserReducer,

  UsersProfile: UsersProfileReducer,
  UsersProfilePutProfile : UsersProfilePutProfileReducer,

  NavBarUsers: NavBarUsersReducer,
  VerificationEmail: VerificationEmailReducer,

  JobSearch: JobSearchReducer,

  RecruiterProfile: RecruiterProfileReducer,
  RecruiterProfilePutProfile : RecruiterProfilePutProfileReducer,

  RecruiterJobMyJob :RecruiterJobMyJobReducer,
  RecruiterJobDeleteJob :RecruiterJobDeleteJobReducer,
  RecruiterJobPostJob : RecruiterJobPostJobReducer,

  Skill : SkillReducer,

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

import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const initialState = {
  user: {
    _id: "618576d8cd2e78c9473589bc",
    username: "test1",
    email: "test1@test.com",
    profilePicture: "person/1.jpeg",
    coverPicture: "",
    followers: [],
    followings: [],
    isAdmin: false,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

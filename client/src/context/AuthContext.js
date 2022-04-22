import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const initialState = {
  user: {
    _id: "61854e81094fa8d3f34d7984",
    username: "test",
    email: "test@test.com",
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

import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const initialState = {
  // user: {
  //   _id: "618560af1ef680bf41452c17",
  //   username: "test3",
  //   email: "test3@test.com",
  //   profilePicture: "person/1.jpeg",
  //   coverPicture: "",
  //   followers: [],
  //   followings: [],
  //   isAdmin: false,
  // },
  user: null,
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

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  //{
  // user: {
  //   _id: "",
  //   username: "",
  //   email: "",
  //   profilePicture: "",
  //   coverPicture: "",
  //   followers: [],
  //   followings: [],
  //   isAdmin: false,
  // },
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//유저 회원가입 Thunk
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//유저 로그인 Thunk
export const logIn = createAsyncThunk("auth/logIn", async (user, thunkAPI) => {
  try {
    return await authService.logIn(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//유저 로그아웃 Thunk
export const logOut = createAsyncThunk("auth/logOut", async () => {
  await authService.logOut();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,

  // 내부 action 및 동기 action
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  // 외부 action 및 비동기 action
  // pending - 요청, fulfilled - 성공, rejected - 실패
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

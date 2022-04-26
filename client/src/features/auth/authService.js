import Axios from "axios";

const API_URL = "/api/auth/";

//유저 회원가입
const register = async (userData) => {
  const res = await Axios.post(API_URL + "register", userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

//유저 로그인
const logIn = async (userData) => {
  const res = await Axios.post(API_URL + "login ", userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

//유저 로그아웃 
const logOut = async () => {
  localStorage.removeItem("user")
}

const authService = {
  register,
  logIn,
  logOut,
};

export default authService;

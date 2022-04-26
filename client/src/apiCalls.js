// import Axios from "axios";

// export const loginCall = async (user, dispatch) => {
//   console.log("로그인 시작");
//     dispatch({ type: "LOGIN_START" });
//   try {
//     const res = await Axios.post("/api/auth/login", user);
//   console.log("로그인 성공" , res.data);
//     dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
//   } catch (error) {
//     dispatch({ type: "LOGIN_FAILURE", payload: error });
//   }
// };

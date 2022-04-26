import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

import "./login.css";
import { logIn, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/spinner/Spinner";

function Login() {
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const history = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      history("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, history, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    dispatch(logIn(user));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">social</h3>
          <span className="loginDesc">전 세계 친구들을 만나보세요~!</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              className="loginInput"
              placeholder="email"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <input
              className="loginInput"
              placeholder="Password"
              type="password"
              minLength="6"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
            <button className="loginButton" disabled={isLoading}>
              {isLoading ? (
                <>
                  <CircularProgress style={{ color: "#fff" }} size="20px" />
                </>
              ) : (
                "로그인"
              )}
            </button>
            <span className="loginForgot">비밀번호 찾기</span>
            <button
              className="loginRegisterButton"
              onClick={() => history("/register")}
            >
              {isLoading ? (
                <>
                  <CircularProgress
                    style={{ color: "#fff" }}
                    color="secondary"
                    size="20px"
                  />
                </>
              ) : (
                "회원가입"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
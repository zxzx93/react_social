import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./register.css";
import { register, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/spinner/Spinner";

function Login() {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordAgain: "",
  });
  const { username, email, password, passwordAgain } = formData;

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordAgain) {
      toast.error("패스워드가 일치하지 않습니다.");
    } else {
      const user = {
        username,
        email,
        password,
      };

      dispatch(register(user));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">social</h3>
          <span className="loginDesc">전 세계 친구들을 만나보세요.~!</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              className="loginInput"
              placeholder="이름"
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
            <input
              className="loginInput"
              placeholder="이메일"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <input
              className="loginInput"
              placeholder="패스워드"
              type="password"
              min="6"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
            <input
              className="loginInput"
              placeholder="패스워드를 다시 입력해 주세요."
              type="password"
              min="6"
              name="passwordAgain"
              value={passwordAgain}
              onChange={onChange}
              required
            />
            <button className="loginButton" type="submit">
              가입하기
            </button>
            {/* {/* <span className="loginForgot">비밀번호 찾기</span> */}
            <button
              className="loginRegisterButton"
              onClick={() => history("/login")}
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useRef, useContext } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

function Login(props) {
  const email = useRef();
  const password = useRef();

  const { isFetching, user, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value }, dispatch);
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">social</h3>
          <span className="loginDesc">전 세계 친구들을 만나보세요~!</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input className="loginInput" placeholder="email" type="email" ref={email} required />
            <input className="loginInput" placeholder="Password" type="password" ref={password} minLength="6" required />
            <button className="loginButton" disabled={isFetching}>
              {
                isFetching ?
                  <><CircularProgress style={{ color: "#fff" }} size="20px" /> </> : "로그인"
              }
            </button>
            <span className="loginForgot">비밀번호 찾기</span>
            <button className="loginRegisterButton">
              {
                isFetching ?
                  <><CircularProgress style={{ color: "#fff" }} color="secondary" size="20px" /> </> : "회원가입"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
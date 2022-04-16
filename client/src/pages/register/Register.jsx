import React,{useRef} from 'react';
import Axios  from 'axios';
import { useNavigate } from "react-router-dom";
import './register.css';

function Login(props) {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history =  useNavigate();

  const handleSubmit = async (e)=>{
  e.preventDefault(); 

  if (passwordAgain.current.value !== password.current.value) {
    password.current.setCustomValidity("패스워드가 일치하지 않습니다.");
  }else{
    const user = { username:username.current.value ,email:email.current.value ,password:password.current.value }

    try {
       await Axios.post("/api/auth/register",user);
       history("/login");
    } catch (error) {
      console.log(error);
    }
  }
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
            <input className="loginInput" placeholder="Name" ref={username} type="text"/>
            <input className="loginInput" placeholder="Email"ref={email} type="email" />
            <input className="loginInput" placeholder="Password" ref={password} type="password" min="6"/>
            <input className="loginInput" placeholder="Password Again"ref={passwordAgain} type="password" min="6"/>
            <button className="loginButton" type="submit">Sign up</button>
            <span className="loginForgot">비밀번호 찾기</span>
            <button className="loginRegisterButton">회원가입</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
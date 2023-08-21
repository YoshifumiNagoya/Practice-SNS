import React, { useRef, useContext } from "react";
import "./Login.css";
import { loginCall } from "../../actionCalls";
import { AuthContext } from "../../state/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const moveRegister = () => {
    navigate("/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(email.current.value);
    // console.log(password.current.value);

    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Photo Album</h3>
          <span className="loginDesc">思い出をいつまでも</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
            <p className="loginMessage">ログインはこちらから</p>

            <input
              type="email"
              className="loginInput"
              placeholder="メールアドレス"
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="パスワード"
              required
              minLength="6"
              ref={password}
            />
            <button className="loginButton">ログイン</button>
            <span className="loginForgot">パスワードを忘れた方へ</span>
            <button className="loginRegisterButton" onClick={moveRegister}>
              アカウント作成
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

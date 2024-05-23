import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = () => {
    setUsernameError("");
    setPasswordError("");

    if (username === "") {
      setUsernameError("Please enter your username");
      return;
    }

    if (password === "") {
      setPasswordError("Please enter a password");
      return;
    }

    checkAccountExists(accountExists => {
      if (accountExists)
        logIn();
      else
        if (window.confirm("An account does not exist with this username: " + username + ". Do you want to create a new account?")) {
          logIn();
        }
    });
  };

  const checkAccountExists = (callback) => {
    fetch("http://localhost:3080/check-account", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
    .then(r => r.json())
    .then(r => {
      callback(r?.userExists);
    });
  };

  const logIn = () => {
    fetch("http://localhost:3080/auth", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(r => r.json())
    .then(r => {
      if (r.message === 'success') {
        localStorage.setItem("user", JSON.stringify({ username, token: r.token }));
        props.setLoggedIn(true);
        props.setUsername(username);
        navigate("/mainpage");
      } else {
        window.alert("잘못된 정보입니다.");
      }
    });
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={username}
          placeholder="아이디를 입력해주세요."
          onChange={ev => setUsername(ev.target.value)}
          className={"inputBox"} />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요."
          onChange={ev => setPassword(ev.target.value)}
          className={"inputBox"} />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"} />
      </div>
    </div>
  );
};

export default Login;

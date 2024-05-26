import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoggedIn, setUsername }) => {
  const [username, setUsernameState] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async () => {
    setUsernameError("");
    setPasswordError("");

    if (username === "") {
      setUsernameError("아이디를 입력해주세요.");
      return;
    }

    if (password === "") {
      setPasswordError("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch("/api/login", {
        method: "POST",
        body: formData
      });

      const text = await response.text();
      console.log("서버 응답:", text);

      if (text === "로그인에 성공했습니다.") {
        localStorage.setItem("user", JSON.stringify({ username }));
        setLoggedIn(true);
        setUsername(username);
        navigate("/mainpage");
      } else {
        window.alert("잘못된 정보입니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      window.alert("로그인 요청에 문제가 있습니다.");
    }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>Login</div>
      </div>
      <br />
      <div className="inputContainer">
        <input
          value={username}
          placeholder="아이디를 입력해주세요."
          onChange={ev => setUsernameState(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{usernameError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요."
          onChange={ev => setPassword(ev.target.value)}
          className="inputBox"
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className="inputContainer">
        <input
          className="inputButton"
          type="button"
          onClick={onButtonClick}
          value="Log in"
        />
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setLoggedIn, setUsername }) => {
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

      const response = await fetch("http://192.168.2.1:8082/admin/join", {
        method: "POST",
        body: formData
      });

      const text = await response.text(); // 텍스트로 처리
      console.log("서버 응답:", text);

      if (text === "ok") {
        localStorage.setItem("user", JSON.stringify({ username }));
        navigate("/login");
      } else {
        window.alert("회원가입 실패: " + text);
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      window.alert("회원가입 요청에 문제가 있습니다.");
    }
  };

  return (
    <div className="mainContainer">
      <div className="titleContainer">
        <div>SignUp</div>
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
          value="SignUp"
        />
      </div>
    </div>
  );
};

export default SignUp;
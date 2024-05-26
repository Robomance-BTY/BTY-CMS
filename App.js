import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './home';
import Login from './login';
import SignUp from './signup';
import MainPage from './mainpage';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }

    const formData = new FormData();
    formData.append("token", user.token);

    fetch("http://192.168.2.1:8082/admin/join", {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
      }
      return response.text(); // 텍스트로 처리
    })
    .then(text => {
      setLoggedIn(text === 'ok');
      setUsername(user.username || "");
    })
    .catch(err => {
      console.error("토큰 검증 실패:", err);
      setLoggedIn(false);
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          <Route path="/mainpage" element={loggedIn ? <MainPage /> : <Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
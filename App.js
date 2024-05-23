import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './home';
import Login from './login';
import MainPage from './mainpage';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }

    fetch("http://localhost:3080/verify", {
      method: "POST",
      headers: {
        'jwt-token': user.token
      }
    })
    .then(r => r.json())
    .then(r => {
      setLoggedIn('success' === r.message);
      setUsername(user.username || "");
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home username={username} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          <Route path="/mainpage" element={loggedIn ? <MainPage /> : <Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

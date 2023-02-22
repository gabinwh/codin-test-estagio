import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import Landing from "./pages/Landing";


export default function App() {
  const tokenString = JSON.parse(localStorage.getItem('token'));
  const [token, setToken] = useState(tokenString?.token);

  const setSession = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
  }

  return (
    <BrowserRouter>
      <Routes>
        {!token &&
          <>
            <Route path="/login" element={<Login setSession={setSession} setToken={setToken} />} />
            <Route path='*' element={<Navigate to='/' replace={true} />} />
          </>
        }

        {token &&
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='*' element={<Navigate to='/dashboard' replace={true} />} />
          </>
        }
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Password Manager</h1>
      <div className="card">
        <div className="card-header">
          <button className="header-btn" style={{textDecoration:"underline"}} onClick={() => navigate("/login")}>Login</button>
          <div className="separator"></div>
          <button className="header-btn" onClick={() => navigate("/register")}>Register</button>
        </div>
        <input name="username" className="input-field-login" placeholder="Username"/>
        <input name="password" className="input-field-password" placeholder="Password"/>
        <div className="forgot-pw-separator-1"></div>
        <button className="forgot-btn">Forgot your password?</button>
        <div className="forgot-pw-separator-2"></div>
        <button className="auth-btn">Login</button>
      </div>
    </>
  )
}

export default Login

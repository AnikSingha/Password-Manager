import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './otp.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

function OTP() {
  const navigate = useNavigate();
  const enteredOTP = useRef('');
  const [otp, setOTP] = useState(Array(5).fill(''));
  const inputRefs = Array(5).fill(null).map(() => useRef(null));

  const handleChange = (e, index) => {
    const { value } = e.target;
    // Regex for only allowing one number
    if (/^\d{1}$/.test(value)) {
      setOTP(prevOTP => {
        const newOTP = [...prevOTP];
        newOTP[index] = value;
        return newOTP;
      });

      // Move focus to the next input field if available
      if (index < inputRefs.length - 1 && value !== '') {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleVerifyOTP = () => {
    enteredOTP.current = otp.join('');
    console.log(enteredOTP.current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerifyOTP();
  }
  
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Password Manager</h1>
      <div className="card">
        <h2>Enter OTP</h2>
        <form className="otp-container" onSubmit={handleSubmit}>
          {otp.map((num, index) => (
            <input 
              key={index}
              value={num}
              ref={inputRefs[index]}
              onChange={(e) => handleChange(e, index)}
              className="input-field-otp"
            />
          ))}
          <button type="submit" className="auth-btn">Verify OTP</button>
        </form>
      </div>
    </>
  )
}

export default OTP;


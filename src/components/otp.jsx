import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react18-input-otp';
import { Container, Grid, Typography, Button } from '@mui/material';
import { makeRequest } from './UserContext';
import { UserContext } from './UserContext';

function OTP() {
  const [otp, setOtp] = useState('');
  const [showError, setShowError] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate()
  const otpInputRef = useRef(null);

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
    setShowError(false);
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setShowError(true);
      return;
    }

    try {
      const data = await makeRequest('http://localhost:5000/oauth/verify_otp', 'POST', { email: user, code: otp });

      if (data.success) {
        navigate('/dashboard')
      } else {

        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {showError && (
            <Typography variant="h5" color="error" align="center" sx={{color: '#FF6666'}}>
              The code entered was incorrect
            </Typography>
          )}
          <Typography variant="h6" align="center">Enter OTP</Typography>
          <OtpInput
            ref={otpInputRef}
            value={otp}
            onChange={handleChange}
            numInputs={6}
            separator={<span>-</span>}
            inputStyle={{ fontSize: '24px', width: '55px', height: '50px' }}
            isInputNum={true}
            hasErrored={showError}
            errorStyle={{ color: '#FF6666' }}
            onSubmit={handleSubmit}
          />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OTP;

import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Alert } from '@mui/material';
import { UserContext } from './UserContext';

function Login() {
  
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [showAlert, setShowAlert] = useState()
  const navigate = useNavigate()
  const { login } = useContext(UserContext)

  const submit = async (e) => {
    e.preventDefault();
  
    try {
      await login(email, password)
      navigate('/register')
    } catch (error) {
      setShowAlert(true);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#535663',
        borderRadius: '15px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        minWidth: '300px',
        maxWidth: '400px',
        textAlign: 'center',
        color: '#fff',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Log In
      </Typography>
      {showAlert && (
          <Alert severity="error">
            Incorrect email or password
          </Alert>
        )}
      <form>
        <TextField
          id="email"
          label="Email"
          variant="filled"
          margin="normal"
          fullWidth
          onChange={(e) => {setEmail(e.target.value)}}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submit(e);
            }
          }}
          InputLabelProps={{
            style: { color: '#fff' },
          }}
          InputProps={{
            style: { color: '#fff', backgroundColor: '#444654' },
          }}
        />
        <TextField
          id="password"
          label="Password"
          variant="filled"
          margin="normal"
          fullWidth
          type="password"
          onChange={(e) => {setPassword(e.target.value); setShowAlert(false)}}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submit(e);
            }
          }}
          InputLabelProps={{
            style: { color: '#fff' },
          }}
          InputProps={{
            style: { color: '#fff', backgroundColor: '#444654' },
          }}
        />
        <Button variant="contained" fullWidth sx={{backgroundColor:"#343644", marginTop: "20px"}} onClick={submit}>
          Submit
        </Button>
        <Typography variant="body1" gutterBottom sx={{ marginTop: '20px' }}>
          Don't have an account? <a onClick={() => {navigate('/register')}} style={{ color: '#ADD8E6', cursor: 'pointer' }}>Sign Up</a>
        </Typography>
      </form>
    </Box>
  );
}

export default Login;
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Alert } from '@mui/material';
import { UserContext } from './UserContext';



function RegisterBox() {
  
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showPassAlert, setShowPassAlert] = useState(false)
    const [showEmailAlert, setShowEmailAlert] = useState(false)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const navigate = useNavigate()
    const { register } = useContext(UserContext)
  
    const submit = async (e) => {
      e.preventDefault()

      if (password && password.length < 6 || !password) {
        setShowPassAlert(true)
      }

      if (email && !emailRegex.test(email) || !password){
        setShowEmailAlert(true)
      }
  
      try {
        if (email && password && emailRegex.test(email)) {
          register(email, password)
          navigate('/login');
        }
      } catch (error) {
        
      }
    }
  
    return (
      <Box
        sx={{
          backgroundColor: '#545664',
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
          Sign Up
        </Typography>
        {showEmailAlert && (
            <>
            <Alert severity="error">
                Invalid email entered
            </Alert>
            <br/>
            </>
        )}
        {showPassAlert && (
          <Alert severity="error">
            Password must be at least 6 characters long.
          </Alert>
        )}
        <form>
          <TextField
            id="email"
            label="Email"
            variant="filled"
            margin="normal"
            fullWidth
            onChange={(e) => {setEmail(e.target.value); setShowEmailAlert(false)}}
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
            onChange={(e) => {setPassword(e.target.value); setShowPassAlert(false)}}
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
            Already have an Account? <a onClick={() => {navigate('/')}} style={{ color: '#ADD8E6', cursor: 'pointer'}}>Log in</a>
          </Typography>
        </form>
      </Box>
    );
  }
  
  export default RegisterBox;
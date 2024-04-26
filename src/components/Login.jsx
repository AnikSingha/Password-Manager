import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { Alert, Grid } from '@mui/material';
import { UserContext } from './UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const { login, validateSession, getCookies, sessionId } = useContext(UserContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCookies();
        const isValid = await validateSession();

        if (isValid) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData()
  }, [sessionId]);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress color="primary" size={60} />
      </Grid>
    );
  }

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
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
        {showAlert && <Alert severity="error">Incorrect email or password</Alert>}
        <form>
          <TextField
            id="email"
            label="Email"
            variant="filled"
            margin="normal"
            fullWidth
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
              setShowAlert(false);
            }}
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
          <Button variant="contained" fullWidth sx={{ backgroundColor: '#343644', marginTop: '20px' }} onClick={submit}>
            Submit
          </Button>
          <Typography variant="body1" gutterBottom sx={{ marginTop: '20px' }}>
            Don't have an account?{' '}
            <a onClick={() => navigate('/register')} style={{ color: '#ADD8E6', cursor: 'pointer' }}>
              Sign Up
            </a>
          </Typography>
        </form>
      </Box>
    </Grid>
  );
}

export default Login;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Grid } from '@mui/material'; // Import Grid from Material-UI
import Login from './components/Login';
import Register from './components/Register';
import DisplayQR from './components/displayQR';

function App() {
    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path='/qr' element={<DisplayQR />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </Grid>
    );
}

export default App;

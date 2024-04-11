import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import OTP from './components/otp';

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/otp" element={<OTP />} />
                    
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;

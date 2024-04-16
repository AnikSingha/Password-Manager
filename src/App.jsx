import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import OTP from './components/otp';
import Test from './components/Test';
import DisplayQR from './components/displayQR';

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/otp" element={<OTP />} />
                    <Route path='/qr' element={<DisplayQR />} />

                    <Route path="*" element={<Navigate to="/login" />} />
                    <Route path='/test' element={<Test/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;

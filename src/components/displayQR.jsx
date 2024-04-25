import { useState, useEffect, useContext } from "react";
import { UserContext, makeRequest } from "./UserContext";
import OTP from "./otp";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function DisplayQR() {
  const [imageSrc, setImageSrc] = useState('');
  const {user} = useContext(UserContext)

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const data = await makeRequest('http://localhost:5000/oauth/create_qr', "POST", {email: user})

        if (data.success) {
          setImageSrc(data.image_data);
        } else {
          console.error('Failed to fetch QR code:', data.message);
        }
      } catch (error) {
        console.error('Error fetching QR code:', error);
      }
    };
    
    if (user !== '') {
      fetchData()
    }
  }, [user]);


  return (
    <div>
      <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Please scan the QR code below in your Google Authenticator app and verify the code to add 2FA to your account
      </Typography>
      <Box display="flex" justifyContent="center">
        {imageSrc ? (
          <img src={`data:image/png;base64,${imageSrc}`} alt="QR Code" 
            style={{ height: '400px', width: '400px' }} />
        ) : (
          <Typography>Loading QR code...</Typography>
        )}
      </Box>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <OTP/>
      </Box>
    </div>
  );
}

export default DisplayQR;

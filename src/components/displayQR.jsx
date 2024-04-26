import { useState, useEffect, useContext } from "react";
import { UserContext, makeRequest } from "./UserContext";
import OTP from "./otp";
import { Grid, Typography, Box, Stack } from '@mui/material';

function DisplayQR() {
  const [imageSrc, setImageSrc] = useState('');
  const {user} = useContext(UserContext)

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const data = await makeRequest('https://pass.aniksingha.com/oauth/create_qr', "POST", {email: user})

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
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Stack>
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
      </Stack>
    </Grid>
  );
}

export default DisplayQR;

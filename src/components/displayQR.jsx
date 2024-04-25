import { useState, useEffect, useContext } from "react";
import { UserContext, makeRequest } from "./UserContext";
import OTP from "./otp";

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
      
      if (user != '') {
        fetchData()
      }
    }, [user]);
  
  
    return (
      <div>
        {imageSrc ? (
          <img src={`data:image/png;base64,${imageSrc}`} alt="QR Code" 
            style={{ height: '400px', width: '400px' }} />
        ) : (
          <p>Loading QR code...</p>
        )}
        <br/><br/>
        <OTP/>
      </div>
    );
  }
  
  export default DisplayQR;
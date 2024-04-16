import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

function DisplayQR() {
    const [imageSrc, setImageSrc] = useState('');
    const {user} = useContext(UserContext)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/oauth/create_qr', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user })
          });
          const data = await response.json();
  
          console.log(data.message)
  
          if (data.success) {
            setImageSrc(data.image_data);
          } else {
            console.error('Failed to fetch QR code:', data.message);
          }
        } catch (error) {
          console.error('Error fetching QR code:', error);
        }
      };
  
      fetchData();
    }, []);
  
  
    return (
      <div>
        {imageSrc ? (
          <img src={`data:image/png;base64,${imageSrc}`} alt="QR Code" />
        ) : (
          <p>Loading QR code...</p>
        )}
      </div>
    );
  }
  
  export default DisplayQR;
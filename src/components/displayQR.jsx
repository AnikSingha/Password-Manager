import { useState, useEffect } from "react";

function DisplayQR() {
    const [imageSrc, setImageSrc] = useState('');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://174.138.49.160/oauth/create_qr', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: 'anik@gmail.com' })
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
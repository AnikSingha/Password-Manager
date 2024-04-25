import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
import { useState, useEffect, useContext } from 'react';
import { UserContext, makeRequest } from './UserContext';
import './PasswordData.css';

export default function PasswordData() {
  const [rows, SetRows] = useState([])
  const { user } = useContext(UserContext)

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, headerClassName: 'super-app-theme--header', },
    {
      field: 'WebsiteName',
      headerName: 'Website Name',
      headerClassName: 'super-app-theme--header',
      width: 150,
      editable: false,
    },
    {
      field: 'Password',
      headerName: 'Password',
      headerClassName: 'super-app-theme--header',
      width: 150,
      editable: true,
    },
  ];
  
  useEffect(() => {

    const fetchdata = async () => {
      try {
        const data = await makeRequest('http://localhost:5000/oauth/create_qr', "POST", {email: user})

        const response = await makeRequest('http://localhost:5000/password_management/get_accounts', 'POST', { email: user })
        
        if (response.success && Object.keys(response.message).length > 0) {
          const messageArray = [];
          let id = 0;

          for (const websiteName in response.message) {
            const password = response.message[websiteName];
            messageArray.push({
              id: id++,
              WebsiteName: websiteName,
              Password: password
            });
          }
          SetRows(messageArray)
          console.log(messageArray);
        }
        
      } catch(error) {
        console.log(error)
      }
    }
    
    if (user != ""){
      fetchdata();
    }
  
  }, [user]);
  
  

  return (
    <Box sx={{
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      width: '40%',
      margin: '100px auto',
      '& .super-app-theme--header': {
        backgroundColor: '#4B4B4B'
      },
    }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{ color: 'white', backgroundColor: '#4B4B4B' }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick={true}
      />
    </Box>
  );
}

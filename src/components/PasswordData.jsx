import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, useContext } from 'react';
import { UserContext, makeRequest } from './UserContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './PasswordData.css';

export default function PasswordData() {
  const [rows, setRows] = useState([]);
  const { user } = useContext(UserContext);

  const columns = [
    { field: 'id', headerName: 'ID', width: 120, headerClassName: 'super-app-theme--header' },
    {
      field: 'WebsiteName',
      headerName: 'Website Name',
      headerClassName: 'super-app-theme--header',
      width: 180,
      editable: false,
    },
    {
      field: 'Password',
      headerName: 'Password',
      headerClassName: 'super-app-theme--header',
      width: 180,
      disableColumnMenu: true,
      disableColumnSelector: true,
      renderCell: (params) => (
        <PasswordCell
          password={params.value}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user !== "") {
          const response = await makeRequest('http://localhost:5000/password_management/get_accounts', 'POST', { email: user });

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
            setRows(messageArray);
          }
        }
      } catch(error) {
        console.log(error);
      }
    };

    fetchData();
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
        autoHeight
        initialState={{pagination: { paginationModel: { pageSize: 10 } }}}
        rows={rows}
        columns={columns}
        sx={{ color: 'white', backgroundColor: '#4B4B4B' }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick={true}
      />
    </Box>
  );
}

function PasswordCell({ password }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {showPassword ? (
        <VisibilityOffIcon onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
      ) : (
        <VisibilityIcon onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
      )}
      <span style={{ marginLeft: 5 }}>{showPassword ? password : '*'.repeat(password.length)}</span>
    </div>
  );
}

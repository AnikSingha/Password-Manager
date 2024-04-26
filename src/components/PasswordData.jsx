import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect, useContext } from 'react';
import { UserContext, makeRequest } from './UserContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './PasswordData.css';

export default function PasswordData() {
  const [rows, setRows] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [menuOption, setMenuOption] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [password, setPassword] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger useEffect
  const { user, addAccount, updatePassword, deleteAccount } = useContext(UserContext);

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
        <PasswordCell password={params.value} />
      ),
    },
  ];

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuOptionChange = (option) => {
    setMenuOption(option);
    setWebsiteName('');
    setPassword('');
    setMenuAnchorEl(null);
  };

  const handleAddAccount = async() => {
    await addAccount(user, websiteName, password);
    setUpdateTrigger(!updateTrigger); // Update trigger
  };

  const handleUpdatePassword = async() => {
    await updatePassword(user, websiteName, password );
    setUpdateTrigger(!updateTrigger); // Update trigger
  };

  const handleDeleteAccount = async() => {
    await deleteAccount(user, websiteName );
    setUpdateTrigger(!updateTrigger); // Update trigger
  };

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
  }, [user, updateTrigger]);

  return (
    <Box sx={{
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      width: '45%',
      margin: 'auto',
      marginTop: '5%',
      '& .super-app-theme--header': {
        backgroundColor: '#4B4B4B'
      },
    }}>
      <DataGrid
        autoHeight
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        rows={rows}
        columns={columns}
        sx={{ color: 'white', backgroundColor: '#4B4B4B' }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick={true}
      />
      <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
        <Button variant="contained" onClick={handleMenuOpen} sx={{backgroundColor: '#5C5C5C', width: '20%'}}>
          Choose Action
        </Button>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleMenuOptionChange('add')}>Add account</MenuItem>
          <MenuItem onClick={() => handleMenuOptionChange('update')}>Update password</MenuItem>
          <MenuItem onClick={() => handleMenuOptionChange('delete')}>Delete account</MenuItem>
        </Menu>
      </Box>
      {menuOption === 'add' || menuOption === 'update' ? (
        <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <TextField
            label="Website Name"
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
            style={{ marginRight: '10px' }}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#444654' },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#444654' },
            }}
          />
          <Button variant="contained" onClick={menuOption === 'add' ? handleAddAccount : handleUpdatePassword} sx={{marginLeft: '10px', backgroundColor: '#5C5C5C'}}>
            {menuOption === 'add' ? 'Add Account' : 'Update Password'}
          </Button>
        </Box>
      ) : menuOption === 'delete' ? (
        <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <TextField
            label="Website Name"
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            InputProps={{
              style: { color: '#fff', backgroundColor: '#444654' },
            }}
          />
          <Button variant="contained" onClick={handleDeleteAccount} sx={{marginLeft: '10px', backgroundColor: '#5C5C5C'}}>
            Delete Account
          </Button>
        </Box>
      ) : null}
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

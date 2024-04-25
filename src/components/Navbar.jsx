import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Navbar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#4C4C4C' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            PassManager
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {/* Hardcoded nav items */}
            <Button sx={{ color: '#fff', fontSize: '0.95rem', marginLeft: "8px"}}>
              About
            </Button>
            <Button sx={{ color: '#fff', fontSize: '0.95rem', marginLeft: "5px"}}>
              Profile
            </Button>
            <Button sx={{ color: '#fff', fontSize: '0.95rem', marginLeft: "5px"}}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;

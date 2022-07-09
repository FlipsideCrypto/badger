import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ConnectBtn from "../ConnectBtn/ConnectBtn";

import "./NavBar.css";

const NavBar = () => {
    return (
        <Box 
            sx={{ 
                width: '100vw',
                height: '100px',
                display: 'inline-flex',
                // justifyContent: 'center',
                borderBottom: '2px solid white',
                display: 'flex',
                flexDirection: "row",
            }} 
        >
          <AppBar 
            position="static" 
            sx={{
                bgcolor: '#FFFFFF00',
                justifyContent: 'center',
                margin: '0',
            }}
        >
            <Toolbar sx={{ }}>
              <Typography variant="h4" component="div" align='justify' sx={{ flexGrow: 1 }}>
                <h3>🎩 MAD HATTER</h3>
              </Typography>
              <ConnectBtn />
            </Toolbar>
          </AppBar>
        </Box>
      );
}

export default NavBar;
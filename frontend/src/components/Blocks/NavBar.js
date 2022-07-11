import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import ConnectBtn from "./ConnectBtn";

const NavBar = () => {
    let navigate = useNavigate();

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
                mb: '20px'
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
            <Toolbar>
                <Typography variant="h4" component="div" align='justify' sx={{ flexGrow: 1 }}>
                  <Link to="/" style={{ textDecoration: 'none'}}>
                    <h3>BADGER</h3>
                  </Link>
                </Typography>
              <ConnectBtn />
            </Toolbar>
          </AppBar>
        </Box>
      );
}

export default NavBar;
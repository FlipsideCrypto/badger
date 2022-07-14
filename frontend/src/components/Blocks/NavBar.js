import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import ConnectBtn from "./ConnectBtn";

const Navbar = () => {
    let navigate = useNavigate();

    return (
        <Box 
            sx={{ 
                width: '100%',
                height: '100px',
                display: 'inline-flex',
                // justifyContent: 'center',
                border: '1px solid #000000',
                display: 'flex',
                flexDirection: "row",
                mb: '20px'
            }} 
        >
          <AppBar 
            position="static" 
            sx={{
                // bgcolor: '#FFFFFF00',
                justifyContent: 'center',
                margin: '0',
            }}
        >
            <Toolbar>
              <Box component="div" sx={{display: 'flex', justifyContent: 'flex-start', flexGrow: 1}}>
                <div style={{height: '100%', marginTop: 'auto', marginBottom: 'auto', marginRight: '15px', marginLeft: '20px'}}>
                  <Box
                    component="img"
                    sx={{
                        height: "40px",
                        width: "40px",
                        verticalAlign: 'bottom',
                    }}
                    alt="Badger Badge"
                    src={'/badger-badge-black.png'}
                  />
                </div>

                <Link to="/" style={{ textDecoration: 'none'}}>
                  <Typography variant="h3">
                      BADGER
                  </Typography>
                </Link>
              </Box>
              
              <ConnectBtn enterApp={false} />
            </Toolbar>
          </AppBar>
        </Box>
      );
}

export default Navbar;
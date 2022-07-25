import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <>
        <Box sx={{pt: '200px'}} />
        <Box 
            sx={{ 
                width: '100%',
                height: '100px',
                display: 'inline-flex',
                border: '1px solid black',
                flexDirection: "row",
                position: 'absolute',
                bottom: '0'
            }} 
        >
          <AppBar 
            position="static" 
            sx={{
                justifyContent: 'center',
                margin: '0',
            }}
        >
            <Toolbar>
              <Box component="div" sx={{display: 'flex', justifyContent: 'flex-start', flexGrow: 1}}>
                <div style={{height: '100%', marginRight: '15px', marginLeft: '40px', display: 'block'}}>
                  <Box
                    component="img"
                    sx={{
                        height: "19px",
                        width: "19px",
                        verticalAlign: 'bottom',
                    }}
                    alt="Badger Badge"
                    src={'/badger-badge-black.png'}
                  />
                </div>

                <Link to="/" style={{ textDecoration: 'none'}}>
                  <Typography variant="h7">
                      BADGER
                  </Typography>
                </Link>
              </Box>              
            </Toolbar>
          </AppBar>
        </Box>
      </>
    );
}

export default Footer;
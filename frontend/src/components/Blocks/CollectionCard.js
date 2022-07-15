import { Box, Typography, Divider } from '@mui/material'

const CollectionCard = (props) => {
    const { imageFile, name, description } = props;

    return (
        <div style={{alignContent: 'center', textAlign: 'center', whiteSpace:'pre-line'}}>
            <Box sx={{
                    border: '1px solid black',
                    borderRadius: '10px',
                    alignSelf: 'center',
                    alignContent: 'center',
                    margin: 'auto',
                    width: '70%',
                    height: '70%',
                    mt: '20px'
                }}
            >
                <Box sx={{display: 'flex', justifyContent: 'center',}}>
                {imageFile ?
                    <img
                        style={{width: '100%', height: '100%', objectFit: 'contain', margin:'auto', display:'block', borderRadius: '10px',}}
                        alt="Collection Image"
                        src={URL.createObjectURL(imageFile)}
                    />
                    :
                    <img
                        style={{width: '100%', height: '100%', objectFit: 'contain', margin:'auto', display:'block', borderRadius: '10px',}}
                        alt="Collection Image"
                        src={'/badger-logo-whiteblackbg.png'}
                    />
                }
                </Box>
            </Box>
            <Typography 
                variant="h4"
                sx={{mx: '25px', my:'10px'}}
            >
                {name}
            </Typography>

            <Divider 
                sx={{
                    mx: 'auto', 
                    my:'10px', 
                    width: '70%',
                    height: '3px'
                }}
            />

            <Typography sx={{mx:'50px', mb:'15px'}}>
                {description}
            </Typography>
        </div>
    )
}

export default CollectionCard;
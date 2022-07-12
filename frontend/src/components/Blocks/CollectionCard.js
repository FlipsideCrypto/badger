import { Box, Typography, Divider } from '@mui/material'

const CollectionCard = (props) => {
    const { imageFile, name, description } = props;

    return (
        <div style={{alignContent: 'center', textAlign: 'center'}}>
            <Box sx={{
                    border: '1px solid black',
                    borderRadius: '10px',
                    alignSelf: 'center',
                    alignContent: 'center',
                    margin: 'auto',
                    width: '90%',
                    height: '90%',
                    mt: '20px'
                }}
            >
                <Box sx={{display: 'flex', justifyContent: 'center', margin: '10px'}}>
                {imageFile ?
                    <img
                        style={{width: '95%', height: '95%', objectFit: 'contain', margin:'auto', display:'block'}}
                        alt="Collection Image"
                        src={URL.createObjectURL(imageFile)}
                    />
                    :
                    <img
                        style={{width: '90%', height: '90%', objectFit: 'contain', margin:'auto', display:'block'}}
                        alt="Collection Image"
                        src={'/badger-black-white.svg'}
                    />
                }
                </Box>
            </Box>
            <Typography 
                variant="h4"
                sx={{mt: '10px'}}
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

            <Typography sx={{mb:'15px', mx:'10px'}}>
                {description}
            </Typography>
        </div>
    )
}

export default CollectionCard;
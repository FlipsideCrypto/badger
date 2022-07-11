import { Box, Typography, Divider } from '@mui/material'

const CollectionCard = (props) => {
    const { imageFile, name, description } = props;

    return (
        <>
            <Box
                component="img"
                sx={{
                    height: "400px",
                    width: "400px",
                }}
                alt="Collection Image"
                src={URL.createObjectURL(imageFile)}
            />

            <Typography 
                variant="h4"
            >
                {name}
            </Typography>

            <Divider 
                sx={{
                    mx: 'auto', 
                    my:'20px', 
                    width: '70%',
                    height: '3px'
                }}
            />

            <Typography
            
            >
                {description}
            </Typography>
        </>
    )
}

export default CollectionCard;
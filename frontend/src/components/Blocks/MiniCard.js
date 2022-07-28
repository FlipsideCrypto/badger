import { Typography } from '@mui/material'

const MiniCard = (props) => {
    const { imageFile, name } = props;

    return (
        <div style={{
            display: "grid",
            gridTemplateRows: "4fr 1fr",
            textAlign: "center",
            minHeight: 200,
            marginBlock: 20,
            alignItems: "center", 
            whiteSpace: "pre-line"
        }}>

            <div style={{
                backgroundImage: `url(${URL.createObjectURL(imageFile)})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: "100%",
                minHeight: 75,
                minWidth: 75,
            }} ></div>

            <Typography
                variant="h8"
                sx={{}}
            >
                {name}
            </Typography>
        </div>
    ) 
}

export default MiniCard;
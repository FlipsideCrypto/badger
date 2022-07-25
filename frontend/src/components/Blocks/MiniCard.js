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

    // return (
    //     <div style={{alignContent: 'center', textAlign: 'center'}}>
    //         <Box sx={{
    //                 border: '1px solid black',
    //                 borderRadius: '10px',
    //                 alignSelf: 'center',
    //                 alignContent: 'center',
    //                 margin: 'auto',
    //                 width: '70%',
    //                 height: '70%',
    //                 mt: '20px'
    //             }}
    //         >
    //             <Box sx={{display: 'flex', justifyContent: 'center',}}>
    //                 <img
    //                     style={{width: '100%', height: '100%', objectFit: 'contain', margin:'auto', display:'block', borderRadius: '10px',}}
    //                     alt={`badge-${name}-image`}
    //                     src={URL.createObjectURL(imageFile)}
    //                 />
    //             </Box>
    //         </Box>
    //         <Typography variant="body1">
    //             {name}
    //         </Typography>
    //     </div>
    // )
}

export default MiniCard;
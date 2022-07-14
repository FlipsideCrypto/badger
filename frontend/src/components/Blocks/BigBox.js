import { Box } from "@mui/material";

const BigBox = (props) => {
    return (
        <Box sx={{
                border: '1px solid black',
                borderRadius: '10px',
                width: '100%',
                height: '100%',
                background: 'repeating-linear-gradient(-70deg, #FFFFFF 0 6px, #00000065 6px 7px);',
                display: 'flex'
            }}
        >
            <Box
                sx={{
                    margin: '7px',
                    border: '1px solid black',
                    borderRadius: '6px',
                    width: `calc(100% - 14px)`,
                    height: 'calc(100% - 14px)',
                    background: '#FFFFFF',
                }}
            >
                {props.children}
            </Box>
        </Box>
    )
}

export default BigBox;
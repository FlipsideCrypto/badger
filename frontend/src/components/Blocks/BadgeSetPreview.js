import {Grid, ImageListItem, ImageListItemBar, Box, Typography} from '@mui/material'
import BigBox from './BigBox'

const BadgeSetPreview = (props) => {
    const { badgeData } = props;

    return (
        <Box sx={{width: '60%', margin:'auto'}}>
            <Grid container columnSpacing={4}>
                {badgeData.map((badge) => (
                    <Grid item xs={6} lg={3} key={`queued-badge-${badge[0]}`}>
                        <BigBox>
                            <ImageListItem>
                                <img
                                    src={`https://badger.mypinata.cloud/ipfs/${badge[2]}`}
                                    alt={badge[0]}
                                    loading="lazy"
                                />
                                <Typography variant="h6" sx={{pl: '20px'}}>
                                    {badge[0]}
                                </Typography>
                            </ImageListItem>
                        </BigBox>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default BadgeSetPreview;
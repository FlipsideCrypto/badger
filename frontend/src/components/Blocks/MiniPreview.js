import { memo } from 'react'

import BigBox from './BigBox'
import MiniCard from './MiniCard'

const MiniPreview = (props) => {
    const { badgeData } = props;

    return (
        // <Box
        //     sx={{
        //         margin: 'auto',
        //         height: '100%',
        //         maxHeight: '15vh',
        //         display: 'flex',
        //         flexDirection: 'row',
        //         justifyContent: 'center',
        //     }}
        // >
        <BigBox>
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: 10
            }}>
                {badgeData.map((badge, idx) => (
                    <MiniCard
                        key={`${badge.name}-${idx}`}
                        name={badge.name}
                        imageFile={badge.imgFile}
                    />
                ))}
            </div>
        </BigBox>
        // </Box>
    )

    // return (
    //     <Box sx={{width: '100%', margin:'auto'}}>
    //         <Grid container columnSpacing={1}>
    //             {badgeData.map((badge, idx) => (
    //                     <Grid item xs={getGridSize(badgeData.length)}>
    //                         <BigBox>
    //                             <MiniCard
    //                                 key={`${badge.name}-${idx}`}
    //                                 name={badge.name}
    //                                 imageFile={badge.imgFile}
    //                             /> 
    //                         </BigBox>
    //                     </Grid>
    //                 ))
    //             }
    //         </Grid>
    //     </Box>
    // )
}

export default memo(MiniPreview);
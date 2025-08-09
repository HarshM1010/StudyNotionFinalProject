import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

const HalfRating = ({rating,readTrue}) => {
     
    return (
        <Stack spacing={1}>
        <Rating name="half-rating" 
            value={readTrue === true ? rating : 0}
            precision={0.5}  
            readOnly={readTrue === true}
            sx={{
                color: "#FFD700", // filled stars
                "& .MuiRating-iconEmpty": {
                color: "#FFD700", // empty stars
                }
            }} />
        </Stack>
    );
}

export default HalfRating

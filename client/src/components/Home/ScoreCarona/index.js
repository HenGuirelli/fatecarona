import React from 'react'
import { Typography } from '@material-ui/core'

const ScoreCarona = ({ score, text }) => {
    return (
        <div className='score'>
            <Typography component='span' variant='h3' align='center'>
                { score }
            </Typography>
            <br />
            <Typography component='span' variant='subtitle1' align='center'>
                { text }
            </Typography>
        </div>
    )
}


export default ScoreCarona
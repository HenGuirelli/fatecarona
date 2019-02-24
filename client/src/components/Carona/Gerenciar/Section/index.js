import React from 'react'
import { Typography } from '@material-ui/core'
import './style.css'

const Section = ({ title, children, ...restProps }) => (
    <section {...restProps} className='gerenciar-carona-section-title' >
        <Typography component='h3' variant='h6' align='center' >
            { title }
        </Typography>
        { children }
    </section>
)

export default Section
import React from 'react'
import { Typography } from "@material-ui/core";
import './style.css'

const Section = ({ title, children }) => (
    <section className='section-carona'>
        <Typography component='h3' variant='h6'>
            { title }
        </Typography>
        {children}
    </section>
)

export default Section
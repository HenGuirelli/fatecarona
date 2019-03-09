import React, { Fragment } from 'react'
import './style.css'

const Row = ({ left, right, ...restProps }) => (
    <div className='row'>
        <span className='left-text'>
            { left }
        </span>
        <span className='right-text'>
            { right }
        </span>
    </div>
)

const Status = ({ status, dia, hora, tipo }) => (
    <section className='gerenciar-carona-status'>
        <Row left='status' right={status}/>
        <Row left='dia'    right={dia}/>
        <Row left='hora'   right={hora}/>
        <Row left='tipo'   right={tipo}/>
    </section>
)

export default Status
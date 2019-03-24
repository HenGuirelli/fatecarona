import React, { Fragment } from 'react'
import './style.css'
import { formatDateToView, formatDestinationText } from '../../../../utils'

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

const Status = ({ status, date, hour, destination }) => (
    <section className='gerenciar-carona-status'>
        <Row left='status' right={status}/>
        <Row left='dia'    right={formatDateToView(date)}/>
        <Row left='hora'   right={hour || '...' }/>
        <Row left='tipo'   right={formatDestinationText(destination)}/>
    </section>
)

export default Status
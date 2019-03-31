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

const Column = ({values, className}) => {
    return (
        <div className='column'>
            {
                values.map(val => <span className={className}> {val} </span>)
            }
        </div>
    )
}

const Status = ({ status, date, hour, destination, repeat, weekdays }) => {
    let dateText = ''
    if (repeat){
        const keys = Object.keys(weekdays)
        const weekdaysText = keys.filter(key => weekdays[key] === true)
        console.log(weekdaysText)
        weekdaysText.forEach((item, index) => {
            dateText += `${item}` + (index === weekdaysText.length -1 ? '' : ', ')
        })
    }else{
        dateText = formatDateToView(date)
    }
    return(
        <section className='gerenciar-carona-status'>
            <Column values={['status', 'dia', 'hora', 'tipo']} className={'left-text'} />
            <Column values={[status,dateText, hour || '...', formatDestinationText(destination)]} className={'right-text'} />
            {/* <Row left='status' right={status}/>
            <Row left='dia'    right={dateText}/>
            <Row left='hora'   right={hour || '...' }/>
            <Row left='tipo'   right={formatDestinationText(destination)}/> */}
        </section>
    )
}

export default Status
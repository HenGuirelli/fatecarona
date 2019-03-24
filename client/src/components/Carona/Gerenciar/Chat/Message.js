import React from 'react'
import './style.css'

const Message = props => {
    return (
        <div className={ props.isYou ? 'your-message' : 'message' }>
            <span className='author'> { props.name } </span>
            <span className='text-message'> { props.text } </span>
        </div>
    )
}

export default Message
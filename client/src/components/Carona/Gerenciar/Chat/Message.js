import React from 'react'
import './style.css'

const Message = props => {
    return (
        <div className={ props.isYou ? 'message' : 'your-message' }>
            <span className='author'> { props.author } </span>
            <span className='text-message'> { props.message } </span>
        </div>
    )
}

export default Message
import React from 'react'
import './style.css'

const Sessao  = props => (
    <section { ...props } className='sessao-card'> { props.children } </section>
)

export default Sessao
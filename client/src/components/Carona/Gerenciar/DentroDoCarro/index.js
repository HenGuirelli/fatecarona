import React from 'react'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import Rating from '../Rating'
import './style.css'

const DentroDoCarro = ({ text, image, stars }) => (
    <section className='gerenciar-carona-dentro-carro'>
        <div className='image-wrapper'>
            <img src={image || InboxIcon} alt='avatar' />
        </div>

        <div>
            { text }
        </div>
        
        <div className='wrap-rating'>
            <Rating max={5} stars={stars} onClick={ (star) => console.log('estrela clicada: ' + (star + 1)) } />
        </div>
    </section>
)

export default DentroDoCarro
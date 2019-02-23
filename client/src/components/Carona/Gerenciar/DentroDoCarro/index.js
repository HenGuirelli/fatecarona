import React from 'react'
import InboxIcon from '@material-ui/icons/MoveToInbox'

const Avaliator = stars => (
    'estrela'
)

const DentroDoCarro = ({ text, image, stars }) => (
    <section className='gerenciar-carona-dentro-carro'>
        <div className='image-wrapper'>
            <img src={image || InboxIcon} alt='avatar' />
        </div>

        <div>
            { text }
        </div>

        <Avaliator stars={stars} />
    </section>
)

export default DentroDoCarro
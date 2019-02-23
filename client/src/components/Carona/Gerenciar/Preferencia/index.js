import React from 'react'
import CadeiranteIcon from '../../../../images/cadeirante.png'
import FumanteIcon from '../../../../images/fumante.png'
import MusicaIcon from '../../../../images/musica.png'
import './style.css'

const Row = ({ src, text }) => (
    <div className='row-wrapper'>
        <div className='img-wrapper'>
            <img src={src} />
        </div>
        <span className='text'> { text } </span>
    </div>
)

const Preferencia = ({ fumante, deficiente, musica }) => (
    <section className='gerenciar-carona-preferencia'>
        <Row src={FumanteIcon} text={fumante ? 'Permitido fumar' : 'Não é permitido fumar'} />
        <Row src={CadeiranteIcon} text={deficiente ? 'Acomoda deficiente' : 'Não acomoda deficientes'} />
        <Row src={MusicaIcon} text={musica ? 'Permitido ouvir música' : 'Não é permitido ouvir música'} />
    </section>
)

export default Preferencia
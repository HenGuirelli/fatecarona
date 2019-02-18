import React, { Fragment } from 'react'
import Section from '../Section';
import CadeiranteIcon from './cadeirante.png'
import FumanteIcon from './fumante.png'
import MusicaIcon from './musica.png'
import './style.css'
import { Typography } from '@material-ui/core';

const ImgWrapper = ({ children, descricao, onClick, selected = false }) => (
    <div className='component-image-wrapper'>
        <section className={`image-wrapper-carona image-wrapper-carona-${ selected ? 'selected' : 'unselected' }`} onClick={onClick}>
                <div className='preferencia-img'>
                    { children }
                </div>
        </section>    
        <Typography component='p' variant='subtitle1' align='center'>
            { descricao }
        </Typography>
    </div>
)

class Preferencia extends React.Component {
    state = {
        cadeirante: false,
        fumante: false,
        musica: false
    }

    handleClick = name => event => {
        this.setState({ [name]: !this.state[name] })
    }

    render(){
        return (
            <Section title="Preferências">
                <div className='preferencias-component'>
                    <ImgWrapper descricao='Acomodação de cadeirantes' onClick={this.handleClick('cadeirante')} selected={this.state.cadeirante}>
                        <img src={CadeiranteIcon} />
                    </ImgWrapper>
                    
                    <ImgWrapper descricao='Ouvinte de muita música' onClick={this.handleClick('musica')} selected={this.state.musica}>
                        <img src={MusicaIcon} />
                    </ImgWrapper>

                    <ImgWrapper descricao='Aceitação de Fumantes' onClick={this.handleClick('fumante')} selected={this.state.fumante}>
                        <img src={FumanteIcon} />
                    </ImgWrapper>
                </div>
            </Section>
        )
    }
}

export default Preferencia
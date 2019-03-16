import React from 'react'
import Section from '../Section'
import CadeiranteIcon from '../../../images/cadeirante.png'
import FumanteIcon from '../../../images/fumante.png'
import MusicaIcon from '../../../images/musica.png'
import './style.css'
import { Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { setPreferences } from '../../../actions/carpoolActions'

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
        isWheelchairAccommodation: false,
        isSmokerAllowed: false,
        isMusicAllowed: false
    }

    componentDidMount(){
        this.updateRedux()
    }

    handleClick = name => async event => {
        await this.setState({ [name]: !this.state[name] })
        this.updateRedux()
    }

    updateRedux = () => {
        this.props.dispatch(setPreferences({ ...this.state }))
    }

    render(){
        const {
            isWheelchairAccommodation,
            isSmokerAllowed,
            isMusicAllowed
        } = this.state

        return (
            <Section title="Preferências">
                <div className='preferencias-component'>
                    <ImgWrapper descricao='Acomodação de cadeirantes' onClick={this.handleClick('isWheelchairAccommodation')} selected={isWheelchairAccommodation}>
                        <img src={CadeiranteIcon} />
                    </ImgWrapper>
                    
                    <ImgWrapper descricao='Ouvinte de muita música' onClick={this.handleClick('isMusicAllowed')} selected={isMusicAllowed}>
                        <img src={MusicaIcon} />
                    </ImgWrapper>

                    <ImgWrapper descricao='Aceitação de Fumantes' onClick={this.handleClick('isSmokerAllowed')} selected={isSmokerAllowed}>
                        <img src={FumanteIcon} />
                    </ImgWrapper>
                </div>
            </Section>
        )
    }
}

export default connect()(Preferencia)
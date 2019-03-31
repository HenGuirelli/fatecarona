import React, { Fragment } from 'react'
import Avaliador from '../../../components/Avaliador'
import { Typography } from '@material-ui/core'
import './style.css'
import Divider from '@material-ui/core/Divider'

import CadeiranteIcon from '../../../images/cadeirante.png'
import SmokingIcon from '../../../images/fumante.png'
import MusicIcon from '../../../images/musica.png'
import Avatar from '@material-ui/core/Avatar'
import ScoreCarona from '../ScoreCarona'

const ScoreBusca = ({ percent, text, img, alt }) => {
    return (
        <div className='score'>
            <div className='img-score-wrapper-background'>
                <div className='img-score-wrapper'>
                    <img src={img} alt={alt} />
                </div>
            </div>
            <Typography component='span' variant='subtitle1' align='center'>
                { text }
            </Typography>
            <Typography component='span' variant='h3' align='center'>
                { percent }%
            </Typography>
        </div>
    )
}

class Caronista extends React.Component {
    render() {
        const { caronasRealizadas, caronasAvaliadas, caronas5Estrelas,
                percentAcomodacaoDeficinete, percentAceitacaoFumante, percentOuvinteMusica } = this.props

        return (
            <Fragment>
                <Avaliador
                    text="Avaliação"
                    score={0}
                />
                <div className='score-carona'>            
                    <ScoreCarona score={caronasRealizadas || 0 } text='Caronas Realizadas' />
                    <ScoreCarona score={caronasAvaliadas || 0 } text='Caronas Avaliadas' />
                    <ScoreCarona score={caronas5Estrelas || 0 } text='Caronas 5 Estrelas' />
                </div>
                <Divider light />

                <div className='score-buscas'>            
                    <ScoreBusca percent={percentAcomodacaoDeficinete || 0 } text='Acomodação de deficiente' img={CadeiranteIcon}/>
                    <ScoreBusca percent={percentAceitacaoFumante || 0 } text='Aceitação de Fumante' img={SmokingIcon} />
                    <ScoreBusca percent={percentOuvinteMusica || 0 } text='Ouvinte de muita musica' img={MusicIcon} />
                </div>
            </Fragment>
        )
    }
}

export default Caronista
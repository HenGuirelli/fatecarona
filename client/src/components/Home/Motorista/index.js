import React, { Fragment } from 'react'
import Avaliador from '../../../components/Avaliador'
import ScoreCarona from '../ScoreCarona'
import Divider from '@material-ui/core/Divider'
import InfoVeiculo from '../../InfoVeiculo'
import './style.css'

// vetor de exemplo
const carros = [
    {
        marca: 'fiat',
        modelo: 'palio',
        placa: 'ads-1011'
    },
    {
        marca: 'fiat',
        modelo: 'palio',
        placa: 'ads-1012'
    },
    {
        marca: 'fiat',
        modelo: 'palio',
        placa: 'ads-1013'
    },
]

const InfoVeiculoWrapper = InfoVeiculo => <div className='info-veiculo'> {InfoVeiculo} </div>

class Motorista extends React.Component {

    getAllCars(){
        return carros
    }

    render(){
        const { caronasRealizadas, caronasAvaliadas, caronas5Estrelas } = this.props

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
                
            <div className='carros'>
                { this.getAllCars().map(carro => InfoVeiculoWrapper(<InfoVeiculo marca={carro.marca} modelo={carro.modelo} placa={carro.placa} />))}
            </div>
            </Fragment>
        )
    }
}

export default Motorista
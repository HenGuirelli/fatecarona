import React from 'react'
import CarIcon from '../../../components/Veiculo/ListVeiculo/veiculo_preto.png'
import './style.css'
import { Typography } from '@material-ui/core'
import Button from '../../../components/Form/Button'

class DetalhesVeiculos extends React.Component {
    render(){
        const { marca, modelo, placa } = this.props
        return (
            <div className='veiculos-detalhe'>
                <div className='icon'>
                    <img src={CarIcon} className='icon' />
                    <Typography component='span' variant='subtitle1'> 
                        { placa }
                    </Typography>
                </div>
                <div>
                    <Typography component='span' variant='subtitle1'>
                        MARCA: {marca} <br/>
                        MODELO: {modelo}
                    </Typography>
                </div>

                <Button> Excluir </Button>
            </div>
        )
    }
}

export default DetalhesVeiculos
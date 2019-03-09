import React from 'react'
import CarIcon from '../../../components/Veiculo/ListVeiculo/veiculo_preto.png'
import './style.css'
import { Typography } from '@material-ui/core'
import Button from '../../../components/Form/Button'

class DetalhesVeiculos extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const { marca, modelo, placa } = this.props

        return (
            <div className='veiculos-detalhe'>
                <div>
                    <Typography component='span' variant='subtitle1'>
                        { placa } <br />
                        MARCA: {marca} <br/>
                        MODELO: {modelo}
                    </Typography>
                </div>

                <Button variant='outlined'> Excluir </Button>
            </div>
        )
    }
}

export default DetalhesVeiculos
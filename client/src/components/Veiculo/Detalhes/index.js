import React from 'react'
import './style.css'
import { Typography } from '@material-ui/core'
import Button from '../../../components/Form/Button'
import CarsHttp from '../../../http/Car'
import popUp, { TIPO } from '../../../components/PopUp'

class DetalhesVeiculos extends React.Component {
    constructor(props){
        super(props)
    }

    deleteCar(plate, afterDelete) {
        CarsHttp.deleteCar({ plate })
        .then(resolve => {
            const result = resolve.data
            if (result.sucesso){
                popUp({ tipo: TIPO.SUCESSO, text: 'Veiculo excluido' })
                .then(value => afterDelete())
            }else{                
                popUp({ tipo: TIPO.ERRO, text: result.message })
                .then(value => afterDelete())
            }
        })
    }

    render(){
        const { brand, model, plate, color, updateView } = this.props

        return (
            <div className='veiculos-detalhe'>
                <div>
                    <Typography component='span' variant='subtitle1'>
                        { plate } <br />
                        MARCA: {brand} <br/>
                        MODELO: {model} <br />
                        COR: {color}
                    </Typography>
                </div>

                <Button variant='outlined' onClick={ () => this.deleteCar(plate, updateView) }> Excluir </Button>
            </div>
        )
    }
}

export default DetalhesVeiculos
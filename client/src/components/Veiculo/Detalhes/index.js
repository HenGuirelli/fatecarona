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
            console.log('entrou')
            if (result.success){
                afterDelete()
            }else{
                afterDelete()
                popUp({ tipo: TIPO.ERRO, text: result.message })
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
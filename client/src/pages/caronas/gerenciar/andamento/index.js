import React from 'react'
import Gerenciavel from '../index'
import Status from '../../../../components/Carona/Gerenciar/Status'
import Divider from '@material-ui/core/Divider'
import Preferencia from '../../../../components/Carona/Gerenciar/Preferencia'
import Veiculo from '../../../../components/Carona/Gerenciar/Veiculo'
import Rota from '../../../../components/Carona/Gerenciar/Rota'
import DentroDoCarro from '../../../../components/Carona/Gerenciar/DentroDoCarro'
import { typeCarpool } from '../../../../enuns'
import { Typography } from '@material-ui/core'
import Button from '../../../../components/Form/Button'
import Chat from '../../../../components/Carona/Gerenciar/Chat'
import './style.css'

// apenas para teste, remover
import img from '../../../../images/veiculo_preto.png'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CarpoolHttp from '../../../../http/Carpool';
import PopUpFactory, { TIPO } from '../../../../components/PopUp'
import FinalizeCarpool from '../../../../components/Carona/Gerenciar/FinalizeCarpool';


class Andamento extends Gerenciavel {
    constructor(props){
        super(props)

        this.state = {
            ...this.state,
            popupFinalizeCarpoolOpen: false
        }
    }

    async componentDidMount(){
        this._componentDidMount()
        this.loadInformation()
    }

    componentWillUnmount(){
        this._componentWillUnmount()
    }

    finalizeCarpool = () => {
        const id = this.getCarPoolId()
        CarpoolHttp.finalizeCarpool(id)
        .then(resolve => {
            const result = resolve.data
            if (result.success){
                PopUpFactory({ tipo: TIPO.SUCESSO, text: 'Carona finalizada, deixe sua avaliação ^^' })
                .then(value => {
                    this.setState({ popupFinalizeCarpoolOpen: true })
                })
            }
        })
    }

    onCancelRatePopUp = () => {
        this.setState({ popupFinalizeCarpoolOpen: false })
        this.props.history.push('/')
    }


    render(){
        const { details, carpoolPreferences, car, peopleInCar } = this.state
        return (
             <main className='detalhes-carona-andamento'>
                <Status { ...details } />
                <Divider />
                <Preferencia { ...carpoolPreferences } />
                <Divider />
                <Veiculo { ...car } />
                <Divider />
                {
                    peopleInCar && peopleInCar.length > 0 ?
                    peopleInCar.map((item, index) => 
                        <DentroDoCarro 
                            key={`dentro-do-carro-${index}`} 
                            text={item.type === typeCarpool.DRIVER ? `${ item.nick || item.name }, motorista` : `${ item.nick || item.name }, passageiro`}
                            image={item.img || img}
                            stars={item.stars || 0}
                        />)
                    :
                    null
                }
                <Divider />
                <Rota />
                <Divider />
                <Chat />
                <Divider />
                <Typography component='div' align='center' className='btn-finalizar-carona'>
                    <Button onClick={ this.finalizeCarpool }> Finalizar Carona </Button>
                </Typography>
                <FinalizeCarpool 
                    carpoolId={this.getCarPoolId()}
                    open={this.state.popupFinalizeCarpoolOpen} 
                    onCancel={ this.onCancelRatePopUp } />
             </main>
        )
    }
}

export default withRouter(connect(store => {
    return {
        email: store.user.email
    }
})(Andamento))
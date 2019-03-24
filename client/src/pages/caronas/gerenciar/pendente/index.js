import React from 'react'
import Gerenciavel from '../index'
import Status from '../../../../components/Carona/Gerenciar/Status'
import Divider from '@material-ui/core/Divider'
import Preferencia from '../../../../components/Carona/Gerenciar/Preferencia'
import Veiculo from '../../../../components/Carona/Gerenciar/Veiculo'
import Rota from '../../../../components/Carona/Gerenciar/Rota'
import DentroDoCarro from '../../../../components/Carona/Gerenciar/DentroDoCarro'
import { typeCarpool } from '../../../../enuns'
// apenas para teste, remover
import img from '../../../../images/veiculo_preto.png'
import Chat from '../../../../components/Carona/Gerenciar/Chat'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Pendente extends Gerenciavel {

    async componentDidMount(){
        this._componentDidMount()
        this.loadInformation()
    }

    componentWillUnmount(){
        this._componentWillUnmount()
    }

    render(){
        const { details, carpoolPreferences, car, peopleInCar } = this.state
        return (
             <main className='detalhes-carona-pendente'>
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
                            image={item.img || img }
                            stars={item.stars || 0 }
                        />)
                    :
                    null
                }
                <Divider />
                <Chat />
                <Divider />
                <Rota />
             </main>
        )
    }
}

export default withRouter(connect(store => {
    return {
        email: store.user.email
    }
})(Pendente))
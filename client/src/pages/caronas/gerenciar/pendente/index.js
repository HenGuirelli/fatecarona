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
import CarpoolHttp from '../../../../http/Carpool'
import { withRouter } from 'react-router-dom'
import ProfileHttp from '../../../../http/Profile'
import { connect } from 'react-redux'

class Pendente extends Gerenciavel {

    constructor(props){
        super(props)

        const details = {
            status: '',
            day: '',
            hour: '',
            destination: ''
        }

        const carpoolPreferences = {
            isSmokerAllowed: false,
            isWheelchairAccommodation: false,
            isMusicAllowed: false
        }

        const car = {
            brand: '',
            model: '',
            plate: ''
        }

        const peopleInCar = []

        this.state = {
            details,
            carpoolPreferences,
            car,
            peopleInCar
        }
    }

    componentDidMount(){
        this.loadInformation()
    }

    loadInformation = async () => {
        const resolve = await CarpoolHttp.getCarpoolById(this.getCarPoolId())
        console.log('load asyunc', resolve)
        const result = resolve.data.carpool
        if (resolve.data.success){
            console.log(result)
            const { car, riders } = result

            const details = {
                status: result.status,
                date: result.date,
                hour: result.hour,
                destination: result.destination
            }
            const carpoolPreferences = {
                isSmokerAllowed: result.isSmokerAllowed,
                isWheelchairAccommodation: result.isWheelchairAccommodation,
                isMusicAllowed: result.isMusicAllowed
            }
            this.setState({ details, car, peopleInCar: riders, carpoolPreferences })

            const profileResolve = await ProfileHttp.getProfileData({ email: this.props.email })
            const { success, ...profile } = profileResolve.data
            if (success){
                riders.push({ ...profile, type: typeCarpool.DRIVER })
                riders.reverse()
                this.setState({ peopleInCar: riders })
            }
        }
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
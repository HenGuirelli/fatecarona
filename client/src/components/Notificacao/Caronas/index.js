import React from 'react'
import Table from '../../Table'
import { Typography } from '@material-ui/core'
import Button from '../../../components/Form/Button'
import './style.css'
import NOTIFICATION_TYPE from '../notificationType'
import CarpoolHttp from '../../../http/Carpool'
import popUp, { TIPO } from '../../PopUp'

const acceptCarpool = ({ to, from, carpoolId }) => {
    CarpoolHttp.acceptCarpoolOffer({ riderEmail: to, driverEmail: from, carpoolId })
    .then(resolve => {
        const result = resolve.data
        if (result.success){
            popUp({tipo: TIPO.SUCESSO, text: "Sucesso"})
        }else{
            popUp({tipo: TIPO.ERRO, text: result.message})
        }
    })
    .catch(err => { popUp({tipo: TIPO.ERRO, text: err }) })
}

const Notification = ({title, text, to, from, carpoolId, withButton = true}) => (
    <div>
        <Typography component='p' variant='h6' align='left'>
            { title }
        </Typography>

        <Typography component='p' variant='subtitle1' align='left'>
            { text }
        </Typography>

        { 
            withButton ? 
                <div className='notification-lift-button'>
                    <Button onClick={() => acceptCarpool({ to, from, carpoolId })}> Aceitar </Button>
                    <Button onClick={() => console.log('recusa id da carona: ' + carpoolId)}> Recusar </Button>
                </div>
            :
                null
        }
    </div>
)

class Caronas extends React.Component {
    fetchDataToJSX = data => {
        return data.map(item => [<Notification {...item} withButton={ item.type === NOTIFICATION_TYPE.CARPOOL_REQUEST }/>])
    }

    render(){
        const { data } = this.props
        return (
            <Table data={this.fetchDataToJSX(data)}/>
        )
    }
}

export default Caronas
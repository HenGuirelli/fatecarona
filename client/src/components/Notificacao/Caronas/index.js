import React from 'react'
import Table from '../../Table'
import { Typography } from '@material-ui/core'
import Button from '../../../components/Form/Button'
import './style.css'
import NOTIFICATION_TYPE from '../notificationType'

const Notification = ({title, text, carpoolId, withButton = true}) => (
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
                    <Button onClick={() => console.log('aceita id da carona: ' + carpoolId)}> Aceitar </Button>
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
import React, { Fragment } from 'react'
import Icon from './comute.svg'
import { Avatar, CircularProgress } from '@material-ui/core'
import Button from '../../Form/Button'
import './style.css'
import { formatDateToView } from '../../../utils'
import ProfileHttp from '../../../http/Profile'
import { withRouter } from 'react-router-dom'

const status = {
	ANDAMENTO: 'ACTIVE',
	PENDENTE: 'PENDING',
	REALIZADO: 'FINISHED'
}

const side = {
	TO_FATEC: 'TO_FATEC',
	OUT_FATEC: 'OUT_FATEC'
}

class TextContent extends React.Component {
    state = {
        loading: true,
        name: ''
    }

    componentDidMount(){
        // TODO: tirar a função do timeout
       setTimeout(this.searchName, 3000)
    }

    searchName = () => {
        const { email } = this.props
        ProfileHttp.getProfileData({ email })
        .then( ({ data }) => {
            this.setState({ name: data.name })
        })
        this.setState({ loading: false })
    }

    render(){
        if (this.state.loading) return <div style={{ width: 100, height: 30 }}> <CircularProgress /> </div>
        return <p> { this.state.name } { this.props.children } </p>
    }
}

const _Gerenciar = ({ text, carpoolId, to, email }) => (
    <article className='gerneciar-carona-article'>
        <section className='gerenciar-carona-items'>
            <div className='item'>
                <Avatar src={Icon} />
            </div>
            <div className='item' id='item-text'>
               <TextContent email={email}> { text } </TextContent>
            </div>
        </section>
        <section>
            <Button onClick={() => window.location=`/caronas/${carpoolId}/gerenciar/${to}`} variant='outlined'> Gerenciar </Button>
        </section>
    </article>
)

const Gerenciar = props => {
    const { email, riders, date } = props
    const carpoolId = props.id
    const sideText = props.side === side.TO_FATEC ? 'indo para fatec' : 'saindo da fatec'

    if (props.type == status.ANDAMENTO){
        return <_Gerenciar email={email} text={`está dando carona para ${riders.map(rider => rider.name)} em ${formatDateToView(date)}, ${sideText}`}  to='andamento' carpoolId={carpoolId}/>
    }
    if (props.type == status.PENDENTE){
        return <_Gerenciar email={email} text={`está oferencedo carona para ${riders.map(rider => rider.name)} em ${formatDateToView(date)}, ${sideText}`} to='pendente'  carpoolId={carpoolId}/>
    }
    if (props.type == status.REALIZADO){
        return <_Gerenciar email={email} text={`deu carona para ${riders.map(rider => rider.name)} em ${formatDateToView(date)}, ${sideText}`} to='historico' carpoolId={carpoolId}/>
    }
}

export {
    status,
    side
}
export default withRouter(Gerenciar)

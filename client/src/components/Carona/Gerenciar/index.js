import React, { Fragment } from 'react'
import Icon from './comute.svg'
import { Avatar } from '@material-ui/core'
import Button from '../../Form/Button'
import './style.css'

const status = {
	ANDAMENTO: 'ANDAMENTO',
	PENDENTE: 'PENDENTE',
	REALIZADO: 'REALIZADO'
}

const side = {
	TO_FATEC: 'TO_FATEC',
	OUT_FATEC: 'OUT_FATEC'
}

const _Gerenciar = ({ text, carPoolId, to }) => (
    <article className='gerneciar-carona-article'>
        <section className='gerenciar-carona-items'>
            <div className='item'>
                <Avatar src={Icon} />
            </div>
            <div className='item' id='item-text'>
                <p> { text } </p>
            </div>
        </section>
        <section>
            <Button onClick={() => window.location=`/caronas/${carPoolId}/gerenciar/${to}`} variant='outlined'> Gerenciar </Button>
        </section>
    </article>
)

const Gerenciar = props => {
    const { driver, rider, date, carPoolId } = props
    const sideText = props.side === side.TO_FATEC ? 'indo para fatec' : 'saindo da fatec'

    if (props.type == status.ANDAMENTO){
        return <_Gerenciar text={`${driver} está dando carona para ${rider} em ${date}, ${sideText}`}  to='andamento' carPoolId={carPoolId}/>
    }
    if (props.type == status.PENDENTE){
        return <_Gerenciar text={`${driver} está oferencedo carona para ${rider} em ${date}, ${sideText}`} to='pendente'  carPoolId={carPoolId}/>
    }
    if (props.type == status.REALIZADO){
        return <_Gerenciar text={`${driver} deu carona para ${rider} em ${date}, ${sideText}`} to='historico' carPoolId={carPoolId}/>
    }
}

export {
    status,
    side
}
export default Gerenciar

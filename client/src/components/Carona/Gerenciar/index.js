import React from 'react'
import Icon from './comute.svg'
import { Avatar } from '@material-ui/core';
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

const _Gerenciar = ({ text, }) => (
    <section className='gerenciar-carona-items'>
        <div className='item'>
            <Avatar src={Icon} />
        </div>
        <div className='item' id='item-text'>
            <p> { text } </p>
        </div>
    </section>
)

const Gerenciar = props => {
    const { driver, rider, date } = props
    const sideText = props.side === side.TO_FATEC ? 'indo para fatec' : 'saindo da fatec'

    if (props.type == status.ANDAMENTO){
        return <_Gerenciar text={`${driver} está dando carona para ${rider} em ${date}, ${sideText}`}/>
    }
    if (props.type == status.PENDENTE){
        return <_Gerenciar text={`${driver} está oferencedo carona para ${rider} em ${date}, ${sideText}`}/>
    }
    if (props.type == status.REALIZADO){
        return <_Gerenciar text={`${driver} deu carona para ${rider} em ${date}, ${sideText}`}/>
    }
}

export {
    status,
    side
}
export default Gerenciar

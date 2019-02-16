import React, { Fragment } from 'react'
import { OutlinedTextField, TimePicker, TelephoneInput } from '../../Form/TextField'

class DadosPessoais extends React.Component {
    render(){
        return (
            <Fragment>
                <OutlinedTextField label='apelido' />
                <OutlinedTextField label='Minha Rotina' />
                <TimePicker label='Chego na Fatec'  defaultValue='07:00'/>
                <TimePicker label='Saio da Fatec'  defaultValue='12:00'/>
                <TelephoneInput label='Telefone' />
            </Fragment>
        )
    }
}

export default DadosPessoais
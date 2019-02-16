import React, { Fragment } from 'react'
import { OutlinedTextField, TimePicker, TelephoneInput } from '../../Form/TextField'
import './style.css'
import { Typography } from '@material-ui/core';

class DadosPessoais extends React.Component {
    render(){
        return (
            <div className='profile-dados-pessoais'>
                <Typography component='div' align='center'>
                    <OutlinedTextField label='apelido' className='component' block />
                    <TimePicker label='Chego na Fatec'  defaultValue='07:00'className='component' block />
                    <TimePicker label='Saio da Fatec'  defaultValue='12:00'className='component' block />
                    <TelephoneInput label='Telefone' className='component' block />
                </Typography>
            </div>
        )
    }
}

export default DadosPessoais
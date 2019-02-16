import React, { Fragment } from 'react'
import { OutlinedTextField, TimePicker, TelephoneInput } from '../../Form/TextField'
import './style.css'
import { Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Button from '../../Form/Button'

const ChoiceAvatar = props => (
    <div className='profile-avatar-wrapper'>
        <Avatar alt="avatar" src={props.avatar || null } className='profile-avatar centralize' > { props.firsLetterNick } </Avatar>
        <Button variant='outlined' className='btn-choice-file'>
            Adicionar arquivo
            <input 
                type="file"
                className='input-choice-file'
            />
         </Button>
    </div>
)

class DadosPessoais extends React.Component {
    render(){
        return (
            <div className='profile-dados-pessoais'>
                <ChoiceAvatar firsLetterNick='R' />
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
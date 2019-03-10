import React, { Fragment } from 'react'
import { OutlinedTextField, TimePicker, TelephoneInput } from '../../Form/TextField'
import './style.css'
import { Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Button from '../../Form/Button'
import { connect } from 'react-redux'

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
    constructor(props){
        super(props)
        this.trackState = {
            nick: '',
            inFatec: '',
            outFatec: '',
            phone: ''
        }

        this.state = {
            nick: this.props.nick,
            inFatec: this.props.inFatec,
            outFatec: this.props.outFatec,
            phone: this.props.phone
        }
    }

    handleChange = (name, value) => {
        this.trackState[name] = value
        if(this.props.trackState){
            this.props.trackState(this.trackState)
        }

        this.setState({ [name]: value })
    }

    render(){
        return (
            <div className='profile-dados-pessoais'>
                <ChoiceAvatar firsLetterNick='R' />
                <Typography component='div' align='center'>
                    <OutlinedTextField label='apelido' className='component' block 
                        onChange={ (e) => this.handleChange('nick', e.target.value) }  value={this.state.nick}/>
                    <TimePicker label='Chego na Fatec'  className='component' block 
                        onChange={ (e) => this.handleChange('inFatec', e.target.value) } value={this.state.inFatec}/>
                    <TimePicker label='Saio da Fatec' className='component' block 
                        onChange={ (e) => this.handleChange('outFatec', e.target.value) } value={this.state.outFatec}/>
                    <TelephoneInput label='Telefone' className='component' block 
                        onChange={ (e) => this.handleChange('phone', e.target.value) } value={this.state.phone}/>
                </Typography>
            </div>
        )
    }
}

export default connect(store => {
    return {
        nick: store.user.nick,
        inFatec: store.user.inFatec,
        outFatec: store.user.outFatec,
        phone: store.user.phone
    }
})(DadosPessoais)
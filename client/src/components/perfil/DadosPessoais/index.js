import React, { Fragment } from 'react'
import { OutlinedTextField, TimePicker, TelephoneInput } from '../../Form/TextField'
import './style.css'
import { Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Button from '../../Form/Button'
import { connect } from 'react-redux'
import { setUserData } from '../../../actions/userActions';

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
            nick: this.props.nick,
            inFatec: this.props.inFatec,
            outFatec: this.props.outFatec,
            phone: this.props.phone
        }

        this.state = {
            nick: this.props.nick,
            inFatec: this.props.inFatec,
            outFatec: this.props.outFatec,
            phone: this.props.phone
        }
    }

    handleChange = async (name, value) => {
        this.trackState[name] = value
        if(this.props.trackState){
            this.props.trackState(this.trackState)
        }

        await this.setState({ [name]: value })
        this.props.dispatch(setUserData(this.state))
    }

    componentDidMount(){
        if(this.props.trackState){
            this.props.trackState(this.trackState)
        }
    }

    render(){
        const nick = this.state.nick || this.props.nick
        const inFatec = this.state.inFatec || this.props.inFatec
        const outFatec = this.state.outFatec || this.props.outFatec
        const phone = this.state.phone || this.props.phone

        return (
            <div className='profile-dados-pessoais'>
                <ChoiceAvatar firsLetterNick='R' />
                <Typography component='div' align='center'>
                    <OutlinedTextField label='apelido' className='component' block  optional={true}
                        onChange={ (e) => this.handleChange('nick', e.target.value) }  value={nick}/>
                    <TimePicker label='Chego na Fatec'  className='component' block   optional={true}
                        onChange={ (e) => this.handleChange('inFatec', e.target.value) } value={inFatec}/>
                    <TimePicker label='Saio da Fatec' className='component' block   optional={true}
                        onChange={ (e) => this.handleChange('outFatec', e.target.value) } value={outFatec}/>
                    <TelephoneInput  label='Telefone' className='component' block  optional={true}                       
                        onChange={ (e) => this.handleChange('phone', e.target.value) } value={phone}/>
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
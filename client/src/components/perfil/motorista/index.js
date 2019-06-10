import React, { Fragment } from 'react'
import { DefaultTextField, ComboBox, DatePicker } from '../../Form/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import './style.css'
import { setDriverProfile } from '../../../actions/userActions';


const CNHOptions = ['A', 'B', 'AB', 'C', 'D']


class PerfilMotorista extends React.Component {
    constructor(props){
        super(props)

        const isDriver = props.isDriver || false
        console.log('constructor -- motorista')
        this.state = {
            isDriver,
            value: this.getValueDriver(isDriver),
            CNH: props.CNH,
            typeCNH: props.typeCNH,
            expirationDate: props.expirationDate,
        }

        this.trackState = {
            CNH: props.CNH,
            typeCNH: props.typeCNH,
            expirationDate: props.expirationDate,
            isDriver,
        }
    }

    getValueDriver = isDriver => {
        return isDriver ? 'motorista' : 'nao-motorista'
    }

    souMotorista = () => {
        return(
            <Fragment>
                <div className='wrapper-component'>
                    <DefaultTextField type='number' label='Número CNH' variant='outlined' className='component' block 
                        onChange={ (event) => this.onChange('CNH', event.target.value) } value={this.state.CNH} />
                </div>
                <div className='wrapper-component'>
                    <ComboBox options={CNHOptions} label='Selecione...'  className='component' block 
                        onChange={ (event) => this.onChange('typeCNH', event.target.value) } value={this.state.typeCNH} />
                </div>
                <div className='wrapper-component'>
                    <DatePicker variant='outlined' label='Validade CNH' className='component' block 
                        onChange={ (event) => this.onChange('expirationDate', event.target.value) } value={this.state.expirationDate} />
                </div>
            </Fragment>
        )
    }

    onChange = async (name, value) => {
        this.trackState[name] = value
        if(this.props.trackState){
            this.props.trackState(this.trackState)
        }
        await this.setState({ [name]: value })
        this.props.dispatch(setDriverProfile(this.state))
    }

    componentDidMount(){
        if(this.props.trackState){
            this.props.trackState(this.trackState)
        }
    }

    handleChange = (event, onChange) => {
        if (onChange){
            onChange({ isDriver: event.target.value === 'motorista' })
        }
        this.onChange('isDriver', event.target.value === 'motorista' )

        this.setState({ value: event.target.value, isDriver: event.target.value === 'motorista' });
    }
    
    render(){
        const valor = this.getValueDriver(this.props.isDriver || this.state.isDriver)
        return (
            <div className='profile-motorista centralize'>
                <FormControl component="fieldset" className='content-radios'>
                    <FormLabel component="legend">Motorista</FormLabel>
                    <RadioGroup
                        aria-label="Motorista"
                        name="motorista"
                        value={valor}
                        onChange={e => this.handleChange(e, this.props.onChange)}
                    >
                        <FormControlLabel 
                            value="nao-motorista" 
                            control={<Radio color='primary' />}
                            label="Não, não sou motorista" 
                        />
                        <FormControlLabel 
                            value="motorista" 
                            control={<Radio color='primary' />}
                            label="Sim, sou motorista" 
                        />
                    </RadioGroup>
                </FormControl>
                <div className='sou-motorista'>
                    { this.state.isDriver ? this.souMotorista() : null }
                </div>
            </div>

        )
    }
}

export default connect(store => {
    return {
        CNH: store.user.CNH,
        typeCNH: store.user.typeCNH,
        expirationDate: store.user.expirationDate,
        isDriver: store.user.isDriver
    }
})(PerfilMotorista)
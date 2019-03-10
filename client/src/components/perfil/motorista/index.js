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


const CNHOptions = ['A', 'B', 'AB', 'C', 'D']


class PerfilMotorista extends React.Component {
    constructor(props){
        super(props)
        this.trackState = {}

        const isDriver = props.isDriver || false
        this.state = {
            isDriver,
            value: isDriver ? 'motorista' : 'nao-motorista',
            CNH: props.CNH,
            typeCNH: props.typeCNH,
            expirationDate: props.expirationDate,
        }
    }

    souMotorista = () => {
        return(
            <Fragment>
                <DefaultTextField type='number' label='Número CNH' variant='outlined' className='component' block 
                    onChange={ (event) => this.onChange('CNH', event.target.value) } value={this.state.CNH} />
                <ComboBox options={CNHOptions} label='Selecione...' variant='outlined' className='component' block 
                    onChange={ (event) => this.onChange('typeCNH', event.target.value) } value={this.state.typeCNH} />
                <DatePicker variant='outlined' label='Validade CNH' className='component' block 
                    onChange={ (event) => this.onChange('expirationDate', event.target.value) } value={this.state.expirationDate} />
            </Fragment>
        )
    }

    onChange = (name, value) => {
        this.trackState[name] = value
        if(this.props.trackState){
            this.props.trackState(this.trackState)
        }
        this.setState({ [name]: value })
    }

    handleChange = (event, onChange) => {
        if (onChange){
            onChange({ isDriver: event.target.value === 'motorista' })
        }
        this.onChange('isDriver', event.target.value === 'motorista' )

        this.setState({ value: event.target.value, isDriver: event.target.value === 'motorista' });
    }
    
    render(){
        return (
            <div className='profile-motorista centralize'>
                <FormControl component="fieldset" className='content-radios'>
                    <FormLabel component="legend">Motorista</FormLabel>
                    <RadioGroup
                        aria-label="Motorista"
                        name="motorista"
                        value={this.state.value}
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
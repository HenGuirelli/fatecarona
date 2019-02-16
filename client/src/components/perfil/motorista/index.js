import React, { Fragment } from 'react'
import { DefaultTextField, ComboBox, DatePicker } from '../../Form/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Typography from '@material-ui/core/Typography'
import './style.css'

const CNHOptions = ['A', 'B', 'AB', 'C', 'D']

const SouMotorista = props => (
    <Fragment>
        <DefaultTextField type='number' label='Número CNH' variant='outlined' className='component' block />
        <ComboBox options={CNHOptions} label='Selecione...' variant='outlined' className='component' block />
        <DatePicker variant='outlined' label='Validade CNH' className='component' block />
    </Fragment>
)

class PerfilMotorista extends React.Component {
    state = {
        value: 'nao-motorista',
        motorista: false
    };

    handleChange = event => {
        this.setState({ value: event.target.value, motorista: event.target.value === 'motorista' });
    };
    
    render(){
        return (
            <div className='profile-motorista centralize'>
                <FormControl component="fieldset" className='content-radios'>
                    <FormLabel component="legend">Motorista</FormLabel>
                    <RadioGroup
                        aria-label="Motorista"
                        name="motorista"
                        value={this.state.value}
                        onChange={this.handleChange}
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
                    { this.state.motorista ? <SouMotorista /> : null }
                </div>
            </div>

        )
    }
}

export default PerfilMotorista
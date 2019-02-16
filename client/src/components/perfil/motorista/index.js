import React, { Fragment } from 'react'
import { DefaultTextField, ComboBox, DatePicker } from '../../Form/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

const CNHOptions = ['A', 'B', 'AB', 'C', 'D']

const SouMotorista = props => (
    <Fragment>
        <DefaultTextField type='number' label='Número CNH' variant='outlined' />
        <ComboBox options={CNHOptions} label='Selecione...' variant='outlined' />
        <DatePicker variant='outlined' label='Validade CNH'/>
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
            <Fragment>
                <FormControl component="fieldset" >
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

                { this.state.motorista ? <SouMotorista /> : null }
                
            </Fragment>

        )
    }
}

export default PerfilMotorista
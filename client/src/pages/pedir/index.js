import React, { Component } from 'react'
import { TimePicker, DatePicker } from '../../components/Form/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

const Trajeto = trajetos => {
	//if (trajetos === []) // Empty trajetos 
}

class Pedir extends Component {
	state = {
		value: 'ir-fatec'
	}

	handleChange = event => {
		this.setState({ value: event.target.value })
	}
  	render() {
		return (
			<main>
				<DatePicker label='Dia' block/>
				<TimePicker label='Hora' block/>

				<FormControl component="fieldset" >
					<FormLabel component="legend">Você precisa...</FormLabel>
					<RadioGroup
						aria-label="Motorista"
						name="destino-fatec"
						value={this.state.value}
						onChange={this.handleChange}
					>
						<FormControlLabel 
							value="ir-fatec" 
							control={<Radio color='primary' />}
							label="Ir até a Fatec" 
						/>
						<FormControlLabel 
							value="sair-fatec" 
							control={<Radio color='primary' />}
							label="Sair da Fatec" 
						/>
					</RadioGroup>
				</FormControl>

				
			</main>
		)
  }
}

export default Pedir

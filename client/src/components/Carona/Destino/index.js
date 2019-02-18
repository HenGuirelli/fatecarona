import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Section from '../Section'

class Destino extends React.Component {	
    state = {
        value: 'ir-fatec'
    }

    handleChange = event => {
        this.setState({ value: event.target.value })
    }
    
    render(){
        return(
            <Section title='Você precisa...'>
                <FormControl component="fieldset" >
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
            </Section>
        )
    }
}

export default Destino
import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Section from '../Section'
import { connect } from 'react-redux'
import { setDestination } from '../../../actions/carpoolActions'

class Destino extends React.Component {	
    state = {
        value: 'TO_FATEC'
    }

    componentDidMount(){
        this.updateRedux()
    }

    updateRedux = () => {
        this.props.dispatch(setDestination(this.state.value))
    }

    handleChange = event => {
        this.setState({ value: event.target.value })
        this.updateRedux()
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
                            value="TO_FATEC" 
                            control={<Radio color='primary' />}
                            label="Ir até a Fatec" 
                        />
                        <FormControlLabel 
                            value="OUT_FATEC" 
                            control={<Radio color='primary' />}
                            label="Sair da Fatec" 
                        />
                    </RadioGroup>
                </FormControl>
            </Section>
        )
    }
}

export default connect()(Destino)
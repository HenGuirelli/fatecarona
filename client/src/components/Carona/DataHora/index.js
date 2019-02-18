import React from 'react'
import { TimePicker, DatePicker } from '../../Form/TextField'
import Section from '../Section'

class DataHora extends React.Component {
    render(){
        return (
            <Section title='Hora da Carona'>
                <DatePicker label='Dia' block/>
				<TimePicker label='Hora' block/>
            </Section>
        )
    }
}

export default DataHora
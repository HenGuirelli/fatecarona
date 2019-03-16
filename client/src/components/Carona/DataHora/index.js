import React from 'react'
import { TimePicker, DatePicker } from '../../Form/TextField'
import Section from '../Section'
import { setDateAndHour } from '../../../actions/carpoolActions'
import { connect } from 'react-redux'

class DataHora extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            date: this.props.date,
            hour: this.props.hour
        }
    }

    updateRedux = (name, event) => {
        this.setState({ [name]: event.target.value })
        this.props.dispatch(setDateAndHour({ ...this.state }))
    }

    render(){
        const { date, hour } = this.state

        return (
            <Section title='Hora da Carona'>
                <DatePicker label='Dia' block  onChange={ e => this.updateRedux('date', e) } value={date} /> <br />
				<TimePicker label='Hora' block  onChange={ e => this.updateRedux('hour', e) } value={hour} />
            </Section>
        )
    }
}

export default connect(store => {
    return {
        date: store.carpool.date,
        hour: store.carpool.hour
    }  
})(DataHora)
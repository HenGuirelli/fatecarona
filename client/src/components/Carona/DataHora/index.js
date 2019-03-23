import React from 'react'
import { TimePicker, DatePicker, OutlinedTextField } from '../../Form/TextField'
import Section from '../Section'
import { setDateAndHour } from '../../../actions/carpoolActions'
import { connect } from 'react-redux'

class DataHora extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            date: this.props.date,
            hour: this.props.hour,
            refHour: '',
            refDate: ''
        }
    }

    getValueByPropsNameName = propsName => {
        switch(propsName){
            case 'date': 
                return this.state.refDate.value
            case 'hour':
                return this.state.refHour.value
        }
    }

    onChange = (name, event) => {
        this.updateRedux(name)
    }

    updateRedux = async name => {
        const value = this.getValueByPropsNameName(name)
        await this.setState({ [name]: value })
        this.props.dispatch(setDateAndHour({ ...this.state }))
    }

    render(){
        const { date, hour } = this.state

        return (
            <Section title='Hora da Carona'>
                <DatePicker label='Dia' block  onChange={ e => this.onChange('date', e) } value={date} 
                    inputProps={{
                        ref: node => { this.state.refDate = node }
                    }}
                /> <br />
                <TimePicker type='time' 
                    inputProps={{
                        ref: node => { this.state.refHour = node },
                      }} 
                      label='Hora' block  onChange={ (e) => this.onChange('hour', e) } value={hour} />
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
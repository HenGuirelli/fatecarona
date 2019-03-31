import React from 'react'
import { TimePicker, DatePicker, OutlinedTextField } from '../../Form/TextField'
import Section from '../Section'
import { setDateAndHour } from '../../../actions/carpoolActions'
import { connect } from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import WeekDays from './WeekDays'

class DataHora extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            date: this.props.date,
            hour: this.props.hour,
            refHour: '',
            refDate: '',
            repeat: false
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
        const { date, hour, repeat } = this.state
        const { withWeekdays } = this.props

        return (
            <Section title='Hora da Carona'>
                <div className='date-hour-carpool-wrapper'>
                    { repeat ? null :
                        <div className='component'>
                            <DatePicker label='Dia' block  onChange={ e => this.onChange('date', e) } value={date} 
                                inputProps={{
                                    ref: node => { this.state.refDate = node }
                                }}
                            /> 
                        </div>
                    }
                    <div className='component'>
                        <TimePicker type='time' 
                            inputProps={{
                                ref: node => { this.state.refHour = node },
                            }} 
                            label='Hora' block  onChange={ (e) => this.onChange('hour', e) } value={hour}
                        />
                    </div>
                    {
                        withWeekdays ? 
                        <FormControlLabel 
                            control={<Checkbox checked={repeat} onChange={ e => this.setState({ repeat: e.target.checked })} color='primary' />}
                            label='Repetir'
                        />
                        : null 
                    }
                    { repeat ? <WeekDays /> : null }
            
                </div>
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
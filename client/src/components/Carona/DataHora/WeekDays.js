import React from 'react'
import { Avatar } from '@material-ui/core'
import { connect } from 'react-redux'
import { setWeekdays } from '../../../actions/carpoolActions'
import './style.css'

const AvatarWeekDay = ({ children, selected, ...restProps }) => (
    <Avatar className={selected ? 'selected': null } { ...restProps } >{ children }</Avatar>
)

class WeekDays extends React.Component {
    state = {
        domingo: false,
        segunda: false,
        terca: false,
        quarta: false,
        quinta: false,
        sexta: false,
        sabado: false
    }

    handleClick = async name => {
        const value = this.state[name]
        await this.setState({ [name]: !value })
        this.props.dispatch(setWeekdays(this.state))
    }

    render(){
        const { domingo, segunda, terca, quarta, quinta, sexta, sabado } = this.state
        return (
            <div className='weekdays-component'>
                <AvatarWeekDay selected={domingo} onClick={ () => this.handleClick('domingo') } >D</AvatarWeekDay>
                <AvatarWeekDay selected={segunda} onClick={ () => this.handleClick('segunda') } >S</AvatarWeekDay>
                <AvatarWeekDay selected={terca} onClick={ () => this.handleClick('terca') } >T</AvatarWeekDay>
                <AvatarWeekDay selected={quarta} onClick={ () => this.handleClick('quarta') } >Q</AvatarWeekDay>
                <AvatarWeekDay selected={quinta} onClick={ () => this.handleClick('quinta') } >Q</AvatarWeekDay>
                <AvatarWeekDay selected={sexta} onClick={ () => this.handleClick('sexta') } >S</AvatarWeekDay>
                <AvatarWeekDay selected={sabado} onClick={ () => this.handleClick('sabado') } >S</AvatarWeekDay>
            </div>
        )
    }
}

export default connect()(WeekDays)
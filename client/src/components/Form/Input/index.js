import React from 'react'
import './style.css'

class Entry extends React.Component {
    constructor(props){
        super(props)

        this.onChangeCallback = props.onChangeCallback

        this.state = {
            value: props.value || '',
            error: false,
            displayError: 'none'
        }
    }

    handleChange = (event) => {
        const { value } = event.target
        this.setState({ value })
        this.onChangeCallback && this.onChangeCallback(value)
    }

    render(){
        const { placeholder, error, password, label, ...restProps } = this.props
        const { value } = this.state

        return (
            <div className='input'>
                <label className='label'>
                    { label }
                    <br />
                    <input 
                        className='entry'
                        type={ password || 'text'} 
                        placeholder={placeholder} 
                        value={value} 
                        onChange={this.handleChange}
                        { ...restProps }
                    />
                </label>
                <span style={{ display: this.state.displayError }}> { error || 'campo inválido' } </span>
            </div>
        )
    }
}

export default Entry
import React, { Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import './style.css'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'

const optionalText = '- opcional -'

class DefaultTextFieldCore extends React.Component {
	state = {
		value: '',
		error: false
	}

	constructor(props, variant){
		super(props)
		this.variant = variant
	}

	handleChange = event => {
		this.setState({
			value: event.target.value,
		})

		const { onChange } = this.props
		if (onChange)
			onChange(event)
	}

	isValid = () => {
		const { validate } = this.props
		if (validate) {
			if (!validate(this.state.value)) {
				this.setState({ error: true })
			}else {                
				this.setState({ error: false })
			}
		}
	}

	render() {
		const { onChange, errorText, optional = false, block, ...props } = this.props
		const { error } = this.state
		return (
			<Fragment>
				<TextField
					error={error}
					value={this.state.value}
					onChange={this.handleChange}
					variant={this.variant}
					onBlur={this.isValid}
					helperText={optional ? optionalText : '' }
					{ ...props }
				/>
				{ block ? <br /> : null }
				{ error ? <span> { errorText } </span> : null }
				{ block && error ? <br/> : null }
			</Fragment>
		)
	}
}

class OutlinedTextField extends DefaultTextFieldCore {
  constructor(props){
    super(props, 'outlined')
  }
}

class DefaultTextField extends DefaultTextFieldCore {
  constructor(props){
    super(props, 'standard')
  }
}

class TelephoneInput extends React.Component {
	constructor(props){
		super(props)

		this.mask = '(__) _____-____'
		this.state = {
			value: this.mask,
		}

		this.isDeleteClicked = false

		this.eventMap = {
			1: value => `(${value}_) _____-____`,
			2: value => `(${value}) _____-____`,
			3: value => `(${value.slice(0, 2)}) ${value.slice(2,3)}____-____`,
			4: value => `(${value.slice(0, 2)}) ${value.slice(2,4)}___-____`,
			5: value => `(${value.slice(0, 2)}) ${value.slice(2,5)}__-____`,
			6: value => `(${value.slice(0, 2)}) ${value.slice(2,6)}_-____`,
			7: value => `(${value.slice(0, 2)}) ${value.slice(2,7)}-____`,
			8: value => `(${value.slice(0, 2)}) ${value.slice(2,7)}-${value.slice(7, 8)}____`,
			9: value => `(${value.slice(0, 2)}) ${value.slice(2,7)}-${value.slice(7, 9)}___`,
			10: value => `(${value.slice(0, 2)}) ${value.slice(2,7)}-${value.slice(7, 10)}_`,
			11: value => `(${value.slice(0, 2)}) ${value.slice(2,7)}-${value.slice(7,11)}`,
		}
	}

	handleChange = event => {
		const { value } = event.target

		if (this.isDeleteClicked){
			this.isDeleteClicked = false
			return
		}

		if (this.removeFormat(value).length > 11)
			return

		this.setState({ value: this.format(value) })
	}

	onKeyDown = (e) => {
		if (e.keyCode === 8) {
			this.isDeleteClicked = true
			let { value } = e.target

			if (value) {
				value = this.removeFormat(value)
				if (value.length > 0){
					value = value.slice(0, value.length - 1)
					
					this.setState({ value: this.format(value) })
				}
			}
		}
	}

	removeFormat = (value) => {
		return value
				.replace('(', '')
				.replace(/_/g, '')
				.replace(')', '')
				.replace('-', '')
				.replace(' ', '')
	}

	format = (value) => {
		value = this.removeFormat(value)

		if (value){
			if (value.length > 0 && value.length < 12){
				try {
					return this.eventMap[value.length](value)
				}catch (e) {
					return value
				}	
			}
		}else {
			return this.mask
		}
	}

	isValid = () => {

	}

	render() {
		const { onChange, value, ...restProps } = this.props
		return <OutlinedTextField type='tel' onChange={e => { this.handleChange(e); onChange(e) }} onKeyDown={ this.onKeyDown }  value={ this.state.value } {...restProps} />
	}
}

const Picker = props => (
	<Fragment>
		<TextField
			type={props.type}
			InputLabelProps={{
				shrink: true,
			}}
			variant='outlined'
			{ ...props }
		/>
		{ props.block ? <br /> : null }
	</Fragment>
)

/// defaultValue, label
const TimePicker = (props) => {
	const { className, optional = false, ...restProps } = props
	return (
		<Picker
			type='time'
			inputProps={{
				step: 300, // 5 min
			}}
			helperText={optional ? optionalText : ''}
			className={`time-picker ${className}`}
			{ ...restProps }
		/>
	)
}

class DatePicker extends React.Component {

	onChange = (event) => {
		event.target.value = event.target.value.replace('undefined-undefined-', '')
		if (this.props.onChange){
			this.props.onChange(event)
		}
	}

	render(){
		const { className, onChange, ...restProps } = this.props

		return (
			<Picker
				type='date'
				className={`time-picker ${className}`}
				onChange={this.onChange}
				{ ...restProps }
			/>
		)
	}
}

class ComboBox extends React.Component {
	state = { value: '' }

	handleChange = (event) => {
		if (this.props.onChange){
			this.props.onChange(event)
		}
		this.setState({ value: event.target.value })
	}

	render(){
		const { options, label, onChange, values = [], ...restProps } = this.props
		return (
		<Fragment>
			<FormControl variant='outlined'>
			<InputLabel>{ label }</InputLabel>
			<Select
				className='combo-box'
				value={this.state.value}
				onChange={this.handleChange}
				input={<OutlinedInput labelWidth={90}/>}
				{ ...restProps }
			>
				{ options && options.map((option, index) => <MenuItem key={`menu-item-${index}`} value={values[index] || option}> {option} </MenuItem>)}
			</Select>
			</FormControl>
			{ this.props.block ? <br /> : null }
		</Fragment>
		)
	}
}

export {
  OutlinedTextField,
  DefaultTextField,
  TimePicker,
  DatePicker,
  TelephoneInput,
  ComboBox
}

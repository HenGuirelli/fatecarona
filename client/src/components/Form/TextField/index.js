import React, { Fragment } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import MaskedInput from 'react-text-mask'
import './style.css'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { fillZeros } from '../../../utils'

class DefaultTextFieldCore extends React.Component {
  state = {
    value: ''
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

  render() {
    const { onChange, ...props } = this.props
    return (
      <Fragment>
        <TextField
          value={this.state.value}
          onChange={this.handleChange}
          variant={this.variant}
          { ...props }
        />
        { this.props.block ? <br /> : null }
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

const TextMaskCustom = (props) => {
    console.log(props)
    const { inputRef, ...other } = props

    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null)
        }}
        mask={[/[A-Z]/, /[A-Z]/, /[A-Z]/, '-', /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/ ]}
        placeholderChar={'\u2000'}
        showMask
      />
    )
  }

class FormattedInput extends React.Component {
  state = {
    value: '',
  }

  handleChange = event => {
    this.setState({
      value: event.target.value,
    })
    if (this.props.onChange){
      this.props.onChange(event)
    }
  }

  render() {
    const { textmask, value } = this.state
    const { label, mask, onChange, ...restProps } = this.props

    return (
        <TextField
          label={label}
          value={value}
          onChange={this.handleChange}
          inputComponent={TextMaskCustom}
          { ...restProps }
        />
    )
  }
}

// TODO: implements masked textInputs
class TelephoneInput extends React.Component {
	render() {
		return <FormattedInput {...this.props} variant='outlined' mask={[/[A-Z]/, /[A-Z]/, /[A-Z]/, '-', /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/ ]}/>
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
	const { className, ...restProps } = props
	return (
		<Picker
			type='time'
			inputProps={{
				step: 300, // 5 min
			}}
			className={`time-picker ${className}`}
			{ ...restProps }
		/>
	)
}

const DatePicker = (props) => {
	const { className, ...restProps } = props

	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1; // january is 0
	let yyyy = today.getFullYear();

	return (
		<Picker
			type='date'
			className={`time-picker ${className}`}
			defaultValue={`${yyyy}-${fillZeros(2, mm.toString())}-${fillZeros(2, dd.toString())}`}
			{ ...restProps }
		/>
	)
}

class ComboBox extends React.Component {
	state = { value: '' }

	handleChange = (event) => this.setState({ value: event.target.value })

	render(){
		const { options, label, ...restProps } = this.props
		return (
		<Fragment>
			<FormControl>
			<InputLabel>{ label }</InputLabel>
			<Select
				className='combo-box'
				value={this.state.value}
				onChange={this.handleChange}
				input={<OutlinedInput labelWidth={200} />}
				{ ...restProps }
			>
				{options.map((option, index) => <MenuItem key={`menu-item-${index}`} value={option}> {option} </MenuItem>)}
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
  FormattedInput,
  TimePicker,
  DatePicker,
  TelephoneInput,
  ComboBox
}

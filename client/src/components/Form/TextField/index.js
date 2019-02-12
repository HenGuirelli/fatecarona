import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';

import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class DefaultTextFieldCore extends React.Component {
  state = {
    value: ''
  };

  constructor(props, variant){
    super(props)
    this.variant = variant
  }

  handleChange = event => {
    this.setState({
      value: event.target.value,
    });

    const { onChange } = this.props
    if (onChange)
        onChange(event)
  };

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
    );
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
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={ref => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={[/[A-Z]/, /[A-Z]/, /[A-Z]/, '-', /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/ ]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }

class FormattedInput extends React.Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    const { textmask, value } = this.state;
    const { label, mask, ...restProps } = this.props

    return (
        <TextField
          label={label}
          value={value}
          onChange={this.handleChange}
          inputComponent={TextMaskCustom}
          { ...restProps }
        />
    );
  }
}

export {
  OutlinedTextField,
  DefaultTextField,
  FormattedInput
}

import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';

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

export {
  OutlinedTextField,
  DefaultTextField
}

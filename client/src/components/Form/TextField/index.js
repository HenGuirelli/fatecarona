import React from 'react';
import TextField from '@material-ui/core/TextField';

class LoginTextField extends React.Component {
  state = {
    value: ''
  };

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
        <TextField
          value={this.state.value}
          onChange={this.handleChange}
          variant="outlined"
          { ...props }
        />
    );
  }
}

export default LoginTextField;

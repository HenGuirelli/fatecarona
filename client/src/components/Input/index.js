import React from 'react';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class OutlinedTextFields extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, ...rest } = this.props;

    return (
        <form>
        <TextField
          label="Name"
          margin="normal"
          variant="outlined"
          className="form-control"
        />
        </form>
    );
  }
}


const Input = () => <TextField
label="Name"
margin="normal"
variant="outlined"
className="form-control"
/>


//const Input = (OutlinedTextFields)
export default Input
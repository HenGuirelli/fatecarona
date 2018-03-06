import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  root: {
    paddingTop: '50px',
  },
  progress: {
    position: 'relative',
    width: '150px',
    height: '150px',
  },
  innerNumber: {
    width: '150px',
    height: '40px',
    textAlign: 'center',
    fontSize: '2.5em',
    position: 'absolute',
    top: '50px',
    left: 0,
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    width: '75%', 
    marginRight: 'auto', 
    marginLeft: 'auto'
  },
}

export default class Leilometer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.animate(),
      50
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  animate = () => {
    if (this.state.value < this.props.value) {
      this.setState({value: this.state.value + 1})
    }
  }

  render() {
    return (
      <center style={styles.root}>
        <h4>Caronas bem sucedidas</h4>
        <div style={styles.progress}>
          <CircularProgress
            color={'#76c4fb'}
            mode="determinate"
            value={this.state.value}
            size={150}
            thickness={15}
            style={styles.bar}
          />
          <div style={styles.innerNumber}>{this.state.value + '%'}</div>
        </div>
      </center>
    );
  }
}
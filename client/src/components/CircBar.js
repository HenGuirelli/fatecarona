import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  root: {width: '50%', marginRight: 'auto', alignContent: 'center'},
  progress: {width: '150px', marginLeft: 'auto', marginRight: 'auto', paddingTop: '50px'},
  innerNumber: {width: '75px', marginLeft: 'auto', fontSize: '2.5em', margin: '-113px auto 72px'},
  content: {width: '75%', marginRight: 'auto', marginLeft: 'auto'},
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
      <div style={styles.root}>
        <div style={styles.progress}>
          <center>
            Caronas bem sucedidas
          </center>
          <CircularProgress
            color={'#76c4fb'}
            mode="determinate"
            value={this.state.value}
            size={150}
            thickness={15}
          />
          <div style={styles.innerNumber}>{this.state.value + '%'}</div>
        </div>
      </div>
    );
  }
}
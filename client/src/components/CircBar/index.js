import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import styles from './styles'

export default class Leilometer extends React.Component {
  render() {
    const { value } = this.props
    return (
      <center style={styles.root}>
        <h4>Caronas bem sucedidas</h4>
        <div style={styles.progress}>
          <CircularProgress
            color={'#76c4fb'}
            mode="determinate"
            value={value}
            size={150}
            thickness={15}
            style={styles.bar}
          />
          <div style={styles.innerNumber}>{value + '%'}</div>
        </div>
      </center>
    );
  }
}

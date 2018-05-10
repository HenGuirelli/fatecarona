import React, { Component } from 'react'
import { connect } from 'react-redux'
import InfoCarona from '../../components/InfoCarona'
import axios from 'axios'
import config from '../../config.json'

class ResultCaronas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  gatherDrivers = (caronas) => {
    return new Promise((resolve, reject) => {
      caronas.forEach((e, index) => {
        axios.get(config.endpoint + '/users/' + e.emailMotorista)
        .then(result => {
          e.motorista = result.data
          if (index === (caronas.length - 1)) {
            resolve()
          }
        })
        .catch((err) => reject(err.message))
      })
    })
  }

  gatherCars = (caronas) => {
    return new Promise((resolve, reject) => {
      caronas.forEach((e, index) => {
        axios.get(config.endpoint + '/cars/lift/' + e.veiculo)
        .then(result => {
          e.veiculo = result.data[0]
          if (index === (caronas.length - 1)) {
            resolve()
          }
        })
        .catch((err) => reject(err.message))
      })
    })
  }

  componentWillMount() {
    this.gatherDrivers(this.props.caronas)
    .then(() => {
      this.gatherCars(this.props.caronas)
      .then(() => {
        this.setState({loading: false})
      })
      .catch(err => <div>{err}</div>)
    })
    .catch(err => <div>{err}</div>)
  }

  render() {
    const { caronas } = this.props

    if (this.state.loading) return <div>Loading...</div>

    return (
      <div className="pageBase container">
        { caronas.map((lift, key) => <InfoCarona key={key} carona={lift}/>)}
      </div>
    )
  }
}

export default connect(store => {
  return {
    caronas: store.lift.resultCaronas
  }
})(ResultCaronas)

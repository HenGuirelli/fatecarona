import React, { Component } from 'react'
import * as map from '../../actions/mapActions'
import { connect } from 'react-redux'

class GoogleMap extends Component {
  componentDidMount() {
    this.props.dispatch(map.renderMap())
    this.bindAutoComplete(this.refs.origem)
    this.bindAutoComplete(this.refs.destino)
  }

  bindAutoComplete(element) {
    new window.google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(element),
    {types: ['geocode']});
  }

  displayRoute() {
    let origin = this.refs.origem.value;
    let destination = this.refs.destino.value;
    if(!origin || !destination) {
      return;
    }
    this.props.dirServ.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.props.dirDisp.setDirections(response);
      } else {
        alert('Não foi possível estabelecer rota, motivo: ' + status);
      }
    });
  };

  render () {
    const styles = {
      button: {
        color: '#fff',
        margin: '1em 0',
      },
      root: {
        paddingTop: '1em',
      }
    }

    return (
      <div className="pageBase">
        <div className="container" style={styles.root}>
          <div className="form-group">
            <label htmlFor="origem">Origem</label>
            <input
              className="form-control"
              ref="origem"
            />
            <label htmlFor="destino">Destino</label>
            <input
              className="form-control"
              ref="destino"
            />
            <a role="button" style={styles.button} className="btn btn-primary btn-block" onClick={this.displayRoute.bind(this)}>Carregar Rota</a>
          </div>
        </div>
        <div className="Map container" style={{height: '-webkit-fill-available', maxHeigh: 'calc(100% -210px)'}}/>
      </div>
    );
  }
}

export default connect(store => {
  return {
    unRendered: store.map.unRendered,
    dirServ: store.map.dirServ,
    dirDisp: store.map.dirDisp,
    map: store.map.map,
  }
})(GoogleMap)

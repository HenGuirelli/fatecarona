import React, { Component } from 'react'
import * as map from '../../actions/mapActions'
import { connect } from 'react-redux'

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {waypoints: []};
  } 

  componentDidMount() {
    this.props.dispatch(map.renderMap())
    this.bindAutoComplete(this.refs.origem)
    this.bindAutoComplete(this.refs.destino)
    this.bindAutoComplete(this.refs.waypoint)
  }

  bindAutoComplete(element) {
    new window.google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(element),
    {types: ['geocode']});
  }

  addWaypoint = () => {
    let waypoints = this.state.waypoints;
    if (!waypoints.includes(this.refs.waypoint.value)) {
      waypoints.push(this.refs.waypoint.value);
      this.setState({waypoints})
    }
    this.refs.waypoint.value = "";
  }

  displayRoute = () => {
    let origin = this.refs.origem.value;
    let destination = this.refs.destino.value;

    if(!origin || !destination) {
      return;
    }

    let waypts = [];
    let checkboxArray = document.getElementById("waypoints");
    for (var i = 0; i < checkboxArray.length; i++) {
      if(checkboxArray.options[i].selected) {
        waypts.push({
          location: checkboxArray[i].value,
          stopover: false
        })
      }
    }

    this.props.dirServ.route({
      origin: origin,
      destination: destination,
      waypoints: waypts,
      optimizeWaypoints: true,
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
    }

    const { waypoints } = this.state

    return (
      <div className="pageBase">
        <div className="container">
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
          
            <div className="input-group mb-3">
              <input
                className="form-control"
                ref="waypoint"
                placeholder="Ponto de interesse"
              />
              <div className="input-group-append">
                <a 
                  role="button" 
                  className="btn btn-primary btn-block" 
                  onClick={() => this.addWaypoint(waypoints)}>
                  Adicionar ponto
                </a>
              </div>
            </div>

            <select multiple id="waypoints">
              {waypoints.map((waypt, key) => <option value={waypt} key={key}>{waypt}</option>)}
            </select>
            
            <a role="button" style={styles.button} className="btn btn-primary btn-block" onClick={() => this.displayRoute()}>Carregar Rota</a>
          </div>
        </div>
        <div className="Map container pageBase"/>
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

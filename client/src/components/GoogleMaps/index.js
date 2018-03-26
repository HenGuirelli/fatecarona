import React, { Component } from 'react'
import * as map from '../../actions/mapActions'
import { connect } from 'react-redux'

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {waypoints: [], route: {}};
  }

  componentWillMount() {
    if (document.cookie) {
      let wpts = JSON.parse(document.cookie);
      this.setState({waypoints: wpts});
    }
  }

  componentDidMount() {
    this.props.dispatch(map.renderMap())
    this.bindAutoComplete(this.refs.origem)
    this.bindAutoComplete(this.refs.destino)
    this.bindAutoComplete(this.refs.waypoint)
  }

  bindAutoComplete(element) {
    new window.google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(element));
  }

  addWaypoint = () => {
    let waypoints = this.state.waypoints;
    if (!waypoints.includes(this.refs.waypoint.value)) {
      waypoints.push(this.refs.waypoint.value);
      document.cookie = JSON.stringify(waypoints);
      this.setState({waypoints});
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
        this.setState({route: response});
        this.props.dirDisp.setDirections(response);
        this.renderCircles(response.routes[0].overview_path);
      } else {
        alert('Não foi possível estabelecer rota, motivo: ' + status);
      }
    });
  };

  renderCircles = (path) => {
    let map = this.props.map;

    let prev = new window.google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: {lat: path[0].lat(), lng: path[0].lng()},
      radius: 500
    });
    for (var i = 1; i < path.length; i++) {
      if (!(this.circleContains(prev, path[i].lat(), path[i].lng()))) {
        prev = new window.google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: {lat: path[i].lat(), lng: path[i].lng()},
          radius: 500
        });
      }
    }
  };

  circleContains = (circle, lat, lng) => {
    let latLng = new window.google.maps.LatLng(lat, lng);
    return circle.getBounds().contains(latLng) && window.google.maps.geometry.spherical.computeDistanceBetween(circle.getCenter(), latLng) <= circle.getRadius();
  }

  storeRoute = () => {
    this.props.dispatch(map.storeRoute(this.state.route ,this.props.userData.email, this.refs.nomeRota.value));
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
        <div className="container" style={{paddingTop: '1rem'}}>
          <div className="form-group">
            <label>Origem</label>
            <input
              className="form-control"
              ref="origem"
            />
          </div>
          <div className="form-group">
            <label>Destino</label>
            <input
              className="form-control"
              ref="destino"
            />
          </div>
          <div className="form-group">
            <label>Pontos de interesse</label>
            <div className="input-group mb-3">
              <input
                className="form-control"
                ref="waypoint"
              />
              <div className="input-group-append">
                <input
                  type="button"
                  style={{color: '#FFF'}}
                  className="btn btn-primary btn-block"
                  onClick={() => this.addWaypoint(waypoints)}
                  value="Adicionar ponto"
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <select multiple id="waypoints" className="form-control">
              {waypoints.map((waypt, key) => <option value={waypt} key={key} selected="selected">{waypt}</option>)}
            </select>
            <input type="button" style={styles.button} className="btn btn-primary btn-block" onClick={() => this.displayRoute()} value="Carregar Rota"/>
          </div>
        </div>
        <div className="Map container pageBase"/>
        <div className="container">
          <div className="form-group" style={{marginTop: '1rem'}}>
            <label htmlFor="destino">Nome da rota</label>
            <input
              className="form-control"
              ref="nomeRota"
            />
          </div>
          <input
            type="button"
            style={styles.button}
            className="btn btn-primary btn-block"
            value="FINALIZAR"
            onClick={this.storeRoute}
          />
        </div>
      </div>
    );
  }
}

export default connect(store => {
  return {
    unRendered: store.map.unRendered,
    userData: store.user.userData,
    dirServ: store.map.dirServ,
    dirDisp: store.map.dirDisp,
    map: store.map.map,
  }
})(GoogleMap)

import React, { Component } from 'react'
import * as map from '../../actions/mapActions'
import GoogleMaps from '../../components/GoogleMaps'
import { connect } from 'react-redux'

class AdicionarRota extends Component {
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
    this.bindAutoComplete(this.refs.origem)
    this.bindAutoComplete(this.refs.destino)
    this.bindAutoComplete(this.refs.waypoint)
  }

  bindAutoComplete(element) {
    new window.google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(element))
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

  routeState = (route) => {
    this.setState({route})
  }

  storeRoute = () => {
    this.props.dispatch(map.storeRoute(this.state.route ,this.props.userData.email, this.refs.nomeRota.value));
  };

  saveFunc = f => {
    this.displayRoute = f;
  }

  getSelected = () => {
    let wpts = [];
    let checkBoxArray = document.getElementById("waypoints");
    for (var i = 0; i < checkBoxArray.length; i++) {
      if(checkBoxArray.options[i].selected) {
        wpts.push({
          location: checkBoxArray[i].value
        })
      }
    }
    this.displayRoute({
      origin: this.refs.origem.value,
      destination: this.refs.destino.value,
      waypoints: wpts
    })
  }

  render () {
    const styles = {
      button: {
        margin: '25px 0',
        borderRadius: '8px',
        backgroundColor: '#6E4D8B',
        borderColor: '#ffffff',
        color: '#ffffff',
        fontSize: '20px',
        width: '70%',
        marginLeft: '15%'
      },
      buttonLittle: {
        borderRadius: '8px',
        backgroundColor: '#6E4D8B',
        borderColor: '#ffffff',
        color: '#ffffff',
        fontSize: '16px'
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
                  style={styles.buttonLittle}
                  className="btn btn-primary btn-block"
                  onClick={() => this.addWaypoint(waypoints)}
                  value="Adicionar ponto"
                />
              </div>
            </div>
          </div>
          <div className="form-group">

            <select multiple id="waypoints" className="form-control">
              {waypoints.map((waypt, key) =>
                  <option value={waypt} key={key} defaultValue="selected">{waypt}</option>
                )}
            </select>
            <input
              type="button"
              style={styles.button}
              className="btn btn-primary btn-block"
              onClick={this.getSelected}
              value="Carregar Rota"
            />
          </div>
        </div>
        <GoogleMaps routeState={this.routeState} callback={this.saveFunc}/>
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
            value="Finalizar"
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
})(AdicionarRota)

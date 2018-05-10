import React, { Component } from 'react'

export default class Map extends Component {
  componentDidMount() {
    this.setMap();
    this.props.callback(this.displayRoute, this.renderCircles, this.circleContains);
  }

  setMap() {
    this.map = new window.google.maps.Map(document.querySelector('.Map'), {
      center: {
        lat: -23.6234,
        lng: -46.5552
      },
      zoom: 10
    })
    this.dirServ = new window.google.maps.DirectionsService();
    this.dirDisp = new window.google.maps.DirectionsRenderer({
      draggable: false,
      map: this.map,
    });
  }

  displayRoute = (route = {}) => {
    return new Promise((resolve, reject) => {
      if(!route.origin || !route.destination) {
        reject('Rota inválida!')
        return
      }
      this.dirServ.route({
        origin: route.origin,
        destination: route.destination,
        waypoints: route.waypoints,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.dirDisp.setDirections(response)
          resolve(response.routes[0].overview_path)
          let routeState = this.props.routeState
          if (routeState) routeState(response);
        } else {
          reject('Não foi possível estabelecer rota, motivo: ' + status);
        }
        reject('')
      })
      }
    )
  };

  renderCircles = (path) => {
    let circles = []
    circles[0] = new window.google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      center: {lat: path[0].lat(), lng: path[0].lng()},
      radius: 500
    });
    for (var i = 1, index = 1; i < path.length; i++) {
      if (!(this.circleContains(circles[index - 1], path[i].lat(), path[i].lng()))) {
        circles[index] = new window.google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: this.map,
          center: {lat: path[i].lat(), lng: path[i].lng()},
          radius: 500
        })
        index++
      }
    }
    return circles
  };

  circleContains = (circle, lat, lng) => {
    let latLng = new window.google.maps.LatLng(lat, lng);
    return circle.getBounds().contains(latLng) && window.google.maps.geometry.spherical.computeDistanceBetween(circle.getCenter(), latLng) <= circle.getRadius();
  }

  render () {
    const { hidden } = this.props
    return (
        <div className="Map container pageBase" style={hidden ? {height: '0px'} : null}/>
    );
  }
}

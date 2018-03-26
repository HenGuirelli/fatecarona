import React, { Component } from 'react'

export default class Map extends Component {
  componentDidMount() {
    this.setMap();
    this.props.callback(this.displayRoute);
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
      draggable: true,
      map: this.map,
    });
  }

  displayRoute = (route) => {

    if(!route.origin || !route.destination) {
      return;
    }

    this.dirServ.route({
      origin: route.origin,
      destination: route.destination,
      waypoints: route.waypoints,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.dirDisp.setDirections(response);
        this.renderCircles(response.routes[0].overview_path);
        this.props.routeState(response);
      } else {
        alert('Não foi possível estabelecer rota, motivo: ' + status);
      }
    });
  };

  renderCircles = (path) => {
    let prev = new window.google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
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
          map: this.map,
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

  render () {

    return (
      <div className="pageBase">
        <div className="Map container pageBase"/>
      </div>
    );
  }
}
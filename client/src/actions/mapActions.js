import axios from 'axios'
import config from '../config.json'

export function renderMap() {
  return {
    type: "MAP_RENDER"
  }
}

export function storeRoute(route, user) {
  return {
    type: "STORE_ROUTE",
    payload: axios.post(config.endpoint + '/routes', {
      email: user.email,
      rota: {
        origin: route.request.origin.query,
        destination: route.request.destination.query,
        waypoints: route.request.waypoints
      }
    })
  }
}

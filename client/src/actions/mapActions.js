import axios from 'axios'
import config from '../config.json'

export function alteraRota(rota) {
  return{
    type: "ALTERAR_ROTA",
    payload: rota
  }
}

export function storeRoute(route, email, nomeRota) {
  return {
    type: "STORE_ROUTE",
    payload: axios.post(config.endpoint + '/routes', {
      email,
      nomeRota,
      rota: {
        origin: route.request.origin.query,
        destination: route.request.destination.query,
        waypoints: route.request.waypoints
      }
    })
  }
}

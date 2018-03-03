import axios from 'axios'

export function renderMap() {
  return {
    type: "MAP_RENDER"
  }
}

export function storeRoute(route, user) {
  return {
    type: "STORE_ROUTE",
    payload: axios.post('http://localhost:8080/routes', {
      email: user.email,
      rota: {
        origin: route.request.origin.query,
        destination: route.request.destination.query,
        waypoints: route.request.waypoints
      }
    })
  }
}
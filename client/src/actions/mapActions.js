import axios from 'axios'
import config from '../config.json'

export function alteraRota(rota) {
  return{
    type: "ALTERAR_ROTA",
    payload: rota
  }
}

export function buscarRotas(email) {
  return{
    type: "BUSCAR_ROTAS",
    payload: axios.get(config.endpoint + '/routes/' + email)
  }
}

export function excluirRota(id) {
  return{
    type: "EXCLUIR_ROTA",
    payload: axios.delete(config.endpoint + '/routes/route/' + id)
  }
}

export function storeRoute(route, email, nomeRota) {
  return {
    type: "GRAVAR_ROTA",
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

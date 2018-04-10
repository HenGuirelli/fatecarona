import axios from 'axios'
import config from '../config.json'


export function carregar(carona) {
  return{
    type: "CARREGAR_CARONA",
    payload: carona
  }
}

export function loadCaronista(email) {
  return {
    type: "LOAD_CARONISTA",
    payload: axios.get(config.endpoint + "/caronista/" + email)
  }
}

export function loadLiftbyEmail(emailMotorista) {
  return {
    type: "LOAD_CARONA_BY_EMAIL",
    payload: axios.get(config.endpoint + "/lift/motorista/" + emailMotorista)
  }
}

export function loadLiftbyID(id) {
  return {
    type: "LOAD_CARONA_BY_ID",
    payload: axios.get(config.endpoint + "/lift/id/" + id)
  }
}

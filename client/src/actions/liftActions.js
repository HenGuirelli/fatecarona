import axios from 'axios'
import config from '../config.json'

export function ativar(lift) {
  return{
    type: "CARONA_PEND",
    payload: lift
  }
}

export function loadLift(email) {
  return {
    type: "LOAD_CARONA",
    payload: axios.get(config.endpoint + "/lift/" + email)
  }
}

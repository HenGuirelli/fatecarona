import axios from 'axios'
import config from '../config.json'

export function carregar(carona) {
  return{
    type: "CARREGAR_CARONA",
    payload: carona
  }
}

export function espiarMembro(email) {
  return{
    type: "ESPIAR_MEMBRO",
    payload: axios.get(config.endpoint + "/users/" + email)
  }
}

export function transferResults(caronas) {
  return{
    type: "RESULT_CARONAS",
    payload: caronas
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

export function offerLift(lift) {
  return {
    type: "OFERECER_CARONA",
    payload: axios.post(config.endpoint + "/lift", lift)
  }
}

export function loadListMembers(id) {
  return {
    type: "LOAD_MEMBROS_CARONA",
    payload: axios.get(config.endpoint + "/lift/members/" + id)
  }
}

export function loadMembers(email) {
  return {
    type: "LOAD_MEMBER_DATA",
    payload: axios.get(config.endpoint + "/members/" + email)
  }
}

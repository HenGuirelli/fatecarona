import axios from 'axios'
import config from '../config.json'

export function insertUser(user) {
  return {
    type: "INSERT_USER",
    payload: axios.post(config.endpoint + "/users", user)
  }
}

export function loadUser() {
  return {
    type: "LOAD_USER",
    payload: axios.get(config.endpoint + "/userstest")
  }
}

export function setFirebase(firebase) {
  return {
    type: "SET_FIREBASE",
    payload: firebase
  }
}

export function updateUser(user) {
  return {
    type: "UPDATE_USER",
    payload: user
  }
}

export function setUserData(email) {
  return {
    type: "SET_USER_DATA",
    payload: axios.get(config.endpoint + "/users/" + email)
  }
}

export function updateUserData(email, userData) {
  return {
    type: "UPDATE_USER_DATA",
    payload: axios.put(config.endpoint + "/users/" + email, userData)
  }
}

export function unsetUser() {
  return {
    type: "UNSET_USER"
  }
}

export function logIn(email, password, firebase) {
  return {
    type: "USER_LOGIN",
    payload: firebase.auth().signInWithEmailAndPassword(email, password)
  }
}

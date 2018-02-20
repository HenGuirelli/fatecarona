//import axios from 'axios'

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
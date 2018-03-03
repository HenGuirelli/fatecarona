import axios from 'axios'

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
    payload: axios.get("http://localhost:8080/users/" + email)
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
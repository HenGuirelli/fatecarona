import axios from 'axios'

export function sendSubscription(email, subscription) {
  return {
    type: 'STORE_SUBSCRIPTION',
    payload: axios.post('http://localhost:8080/subs', {email, subscription})
  }
}
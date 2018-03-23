import axios from 'axios'
import config from '../config.json'

export function sendSubscription(email, subscription) {
  return {
    type: 'STORE_SUBSCRIPTION',
    payload: axios.post(config.endpoint + '/subs', {email, subscription})
  }
}

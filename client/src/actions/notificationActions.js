import axios from 'axios'
import config from '../config.json'

export function sendSubscription(email, subscription) {
  return {
    type: 'STORE_SUBSCRIPTION',
    payload: axios.put(config.endpoint + '/subs', {_id: email, subscription})
  }
}

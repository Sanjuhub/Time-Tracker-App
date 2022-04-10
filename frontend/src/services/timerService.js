import axios from 'axios';
const baseURL = process.env.REACT_APP_API_ENDPOINT;

export function getTimer() {
  return axios.get(baseURL + '/v1/timer', {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export function updateTimer(data) {
  return axios.put(baseURL + '/v1/timer', JSON.stringify(data), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

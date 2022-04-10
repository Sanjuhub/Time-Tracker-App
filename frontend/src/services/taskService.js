import axios from 'axios';
const baseURL = process.env.REACT_APP_API_ENDPOINT;

export function getTask() {
  return axios.get(baseURL + '/v1/task', {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export function createTask(data) {
    return axios.post(baseURL + '/v1/task', JSON.stringify(data), {
      headers: {
        'content-type': 'application/json',
      },
    });
  }
  
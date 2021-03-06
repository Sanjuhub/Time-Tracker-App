import axios from 'axios';
const baseURL = process.env.REACT_APP_API_ENDPOINT;

export function getAuthor() {
  return axios.get(baseURL + '/v1/author', {
    headers: {
      'content-type': 'application/json',
    },
  });
}

export function createAuthor(data) {
  return axios.post(baseURL + '/v1/author', JSON.stringify(data), {
    headers: {
      'content-type': 'application/json',
    },
  });
}

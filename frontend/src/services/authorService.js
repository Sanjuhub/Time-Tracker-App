import axios from 'axios';
const baseURL = process.env.REACT_APP_API_ENDPOINT;

export function getAuthor(actionId) {
  return axios.get(baseURL + '/v1/author', {
    headers: {
      'content-type': 'application/json',
    },
  });
}

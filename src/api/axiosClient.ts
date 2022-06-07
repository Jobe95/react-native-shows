import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://api.tvmaze.com',
});

export const api = axios;

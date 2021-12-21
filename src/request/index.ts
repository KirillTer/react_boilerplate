import axios from 'axios';

const sources = {
  'localhost:3000': 'http://localhost:8080/',
  'dev.returnb2b.com': 'https://dev.returnb2b.com/',
  // TODO add prod url
};

export const baseURL =
  sources[window.location.host as keyof typeof sources] ||
  sources['localhost:3000'];

const request = axios.create({ baseURL });

export default request;

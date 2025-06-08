import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.1.34:3001/api',
});

// אפשר להוסיף כאן Interceptors בעתיד לטוקנים

export default API;
import axios from 'axios';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log("BASE_URL:",BASE_URL);

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(async (req) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
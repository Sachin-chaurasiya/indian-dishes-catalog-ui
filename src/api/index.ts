import axios from 'axios';

export const API_CLIENT = axios.create({
  baseURL: 'https://devxmongodb-hackathon.onrender.com/api',
});

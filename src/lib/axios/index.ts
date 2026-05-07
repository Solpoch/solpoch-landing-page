import axios from 'axios';

const token = localStorage.getItem('token');

export const api = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`,
  }
})
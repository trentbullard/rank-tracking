import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.MRANK_API_HOST}`,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

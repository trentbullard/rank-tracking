import axios from 'axios';
const baseURL = process.env.REACT_APP_MRANK_API_HOST || 'https://localhost:3002/api';

export default axios.create({ baseURL });

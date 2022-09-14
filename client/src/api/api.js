import axios from 'axios';
const baseURL = process.env.REACT_APP_MRANK_API_HOST || 'http://localhost:3002';

export default axios.create({ baseURL });

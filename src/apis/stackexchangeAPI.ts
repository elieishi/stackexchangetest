import axios from 'axios';

export default axios.create({
    baseURL: 'http://api.stackexchange.com/2.2'
})
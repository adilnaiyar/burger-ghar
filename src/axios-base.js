import axios from 'axios';

const Instance = axios.create({
    baseURL: 'https://burger-ghar.firebaseio.com/'
});

export default Instance;
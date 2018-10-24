import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-ddbb0.firebaseio.com/'
});

export default instance;

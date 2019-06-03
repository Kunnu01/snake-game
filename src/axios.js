import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://snake-game-9529f.firebaseio.com/'
});

export default instance;
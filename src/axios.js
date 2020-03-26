import axios from 'axios';

const instance = axios.create({
    baseURL: "https://somemusic-a36c7.firebaseio.com/"
});

export default instance;

import axios from 'axios';

const instance = axios.create({
    baseURL: "https://somemusic2-3a7d9.firebaseio.com/"
    // baseURL: "https://somemusic-a36c7.firebaseio.com/"
});

export default instance;

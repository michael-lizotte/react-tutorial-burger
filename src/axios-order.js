import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-tutorial-burger.firebaseio.com/'
});
import axios from 'axios';


export default axios.create({
    baseURL: "http://192.168.100.41:5555/moves",
    responseType: "json"
  });
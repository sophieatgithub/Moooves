import axios from 'axios';


export default axios.create({
    baseURL: "https://api.moves.bajescu.com//moves",
    responseType: "json"
  });
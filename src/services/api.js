import axios from "axios";

const instance = axios.create({
  baseURL: "https://lucasfortunato.com.br/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

import axios from "axios";
// import qs from "qs"

const axiosExample = axios.create({
  baseURL: ""
});

function request(config) {
    return axiosExample(config)
}

export default request

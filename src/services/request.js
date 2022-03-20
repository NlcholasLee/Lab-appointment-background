import axios from "axios";
// import qs from "qs"

const axiosExample = axios.create({
  baseURL: "http://www.vrsafer.com:6193"
});

function request(config) {
    return axiosExample(config)
}

export default request

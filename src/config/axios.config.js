import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 5000,
    timeoutErrorMessage: 'Operation timed out'
})
export default axiosInstance
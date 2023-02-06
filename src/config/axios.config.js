import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: 'https://sampletest12345.azurewebsites.net/api/',
    timeout: 5000,
    timeoutErrorMessage: 'Operation timed out'
})
export default axiosInstance
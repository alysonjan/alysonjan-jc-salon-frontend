import axios from 'axios'
import { getItem } from '../Utils/sessionStorage';
import LSContants from '../Constants/SessionStorage';
const { TOKEN } = LSContants

const baseURL = process.env.REACT_APP_SERVER_URL;

var newToken
const token = getItem(TOKEN)
if (token === null || token.length === 0){
    sessionStorage.clear()
}else{
    let text = token.split(" ")
    newToken = text[0]
}

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': newToken
    },
});

export default axiosInstance;
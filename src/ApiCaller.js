import axios from 'axios';
import { API_URL} from './constants/index'

export default function callApi(endpoint, method = 'get', body) {

    let axiosobj = axios[method](`${API_URL}${endpoint}`);

    return new Promise((resolve,reject)=>{
        axiosobj.then((res)=>{
            resolve(res)
        }).catch((error)=>{
            reject(error)
        })
    })
}
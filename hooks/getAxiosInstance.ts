'use client';
import axios from 'axios';
import { message } from 'antd';

export const getInstance = () => {
    const axiosApiInstance = axios.create({
        baseURL: '/api/v1',
        withCredentials: true,
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
    });

    axiosApiInstance.interceptors.request.use(
        (config) => {
            let token;
            if (typeof window !== 'undefined') {
                token = localStorage.getItem('SESSIONID');
            }
            if (token) {
                config.headers.Authorization = `bearer ${token}`;
            }
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

    axiosApiInstance.interceptors.response.use(
        (response) => {
            // console.log(window);
            // console.log(global);
            // console.log(response.headers);
            // console.log(axiosApiInstance.defaults.headers);
            return response;
        },
        (error) => {
            if (error.response.data.error) {
                if (Array.isArray(error.response.data.error.message)) {
                    message.error(error.response.data.error.message[0]);
                }
                if (typeof error.response.data.error.message === 'string') {
                    message.error(error.response.data.error.message);
                }
            }
            return Promise.reject(error.response);
        }
    );

    return axiosApiInstance;
};

// export default function getAxiosInstance() {
//     let token;
//     if (typeof window !== 'undefined') {
//         token = sessionStorage.getItem('SESSIONID');
//     }
//     return getInstance(token);
// }

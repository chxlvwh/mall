import axios from 'axios';

const getInstance = (token) => {
    const axiosApiInstance = axios.create({
        baseURL: 'http://localhost:3002/api/v1'
    });

    axiosApiInstance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.common = {
                    Authorization: `${token}`
                };
            }
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

    axiosApiInstance.interceptors.response.use(
        (data) => {
            return data;
        },
        (error) => {
            if (error.response.data.error && error.response.data.error.message) {
                return error.response.data.error.message[0];
            }
        }
    );

    return axiosApiInstance;
};

export default function useAxios() {
    let token;
    if (typeof window !== 'undefined') {
        token = sessionStorage.getItem('token');
    }
    return getInstance(token);
}

'use client';
import useAxios from '../hooks/useAxios';
const axiosInstance = useAxios();

export const signup = (body) => {
    return axiosInstance.post('auth/signup', body);
};

import { getInstance } from '@/hooks/getAxiosInstance';
import { AxiosResponse } from 'axios';
const axiosInstance = getInstance();
export type LoginProps = {
    username: string;
    password: string;
};
export const signup = (body: { username: string; password: string }) => {
    return axiosInstance.post('auth/signup', body);
};

export const login = <T>(body: LoginProps): Promise<AxiosResponse<T>> => {
    return axiosInstance.post('auth/login', body);
};

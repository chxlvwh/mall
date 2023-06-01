import { getInstance } from '@/hooks/getAxiosInstance';
const axiosInstance = getInstance();

export const getUserInfo = () => {
    return axiosInstance.get('public/user/info');
};

import { cookies } from 'next/headers';
const jwt = require('jsonwebtoken');

export const getSessionId = () => {
    const cookieStore = cookies();
    return cookieStore.get('SESSIONID')?.value;
};

export const getIsLogin = (): boolean => {
    const SESSIONID = getSessionId();
    let isLogin: boolean;

    try {
        jwt.verify(SESSIONID, process.env.jwtTokenPwd);
        isLogin = true;
    } catch (e) {
        isLogin = false;
    }
    return isLogin;
};

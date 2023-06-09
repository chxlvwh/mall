import { cookies } from 'next/headers';
const jwt = require('jsonwebtoken');

export const getSessionId = () => {
    const cookieStore = cookies();
    return cookieStore.get('SESSIONID')?.value;
};

export type JwtType = { username: string; sub: string } | null;

export const getJwtUser = (): JwtType => {
    const SESSIONID = getSessionId();
    let loginUser: JwtType;

    try {
        loginUser = jwt.verify(SESSIONID, process.env.jwtTokenPwd);
    } catch (e) {
        loginUser = null;
    }
    return loginUser;
};

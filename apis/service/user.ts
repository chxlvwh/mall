import { JwtType } from '@/utils/utils';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function getUserInfo(jwtUser?: JwtType) {
    const SESSIONID = cookies().get('SESSIONID')?.value;
    const config = {
        headers: { Authorization: `bearer ${SESSIONID}` }
    };
    let res: { data: JwtType } = { data: { username: '', sub: '' } };
    try {
        res = await axios.get<JwtType>(
            `${process.env.serverUrl}/public/user/${jwtUser?.sub}`,
            config
        );
    } catch (e) {
        console.info('AppHeader caught error when get user info.', e);
    }
    return res.data;
}

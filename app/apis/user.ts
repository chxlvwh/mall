import { jwtType } from '@/utils/utils';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function getUserInfo(jwtUser: jwtType) {
    const SESSIONID = cookies().get('SESSIONID')?.value;
    const config = {
        headers: { Authorization: `bearer ${SESSIONID}` }
    };
    let res = {};
    try {
        res = await axios.get<jwtType>(
            `${process.env.serverUrl}/public/user/${jwtUser?.sub}`,
            config
        );
    } catch (e) {
        console.info('AppHeader caught error when get user info.', e?.message);
    }
    return res.data;
}

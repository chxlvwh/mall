'use client';
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { UserInfo } from '@/apis/typings';
const Cookies = require('js-cookie');

export const HeaderRight = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>();
    useEffect(() => {
        if (typeof localStorage.getItem('userInfo') === 'string') {
            setUserInfo(JSON.parse(localStorage.getItem('userInfo') as string));
        }
    }, []);

    const logout = () => {
        Cookies.remove('SESSIONID');
        localStorage.clear();
        location.reload();
    };
    return (
        <div className={'flex min-w-[10px]'}>
            {!userInfo ? (
                <div className={'leading-10 flex items-center'}>
                    <Link
                        href={'/signup'}
                        className={'bg-blue-500 h-10 px-10 rounded-full font-bold text-white mr-2'}>
                        Signup
                    </Link>
                    <Link
                        href={'/login'}
                        className={`bg-primary-color h-10 px-10 rounded-full font-bold text-white`}>
                        Login
                    </Link>
                </div>
            ) : (
                <div>
                    <span>Welcome， </span>
                    <div className={'inline group relative cursor-pointer'}>
                        <span className={'text-primary-color'}>{userInfo.username}</span>
                        <Image
                            className={'inline ml-2 cursor-pointer'}
                            src={'/img/user.png'}
                            alt={';'}
                            width={30}
                            height={30}
                        />
                        <ul
                            className={
                                'hidden group-hover:block absolute left-0 top-0 whitespace-nowrap leading-10 pt-10 bg-transparent'
                            }>
                            {
                                <li
                                    onClick={logout}
                                    className={
                                        'hover:bg-primary-color hover:text-white px-5 transition-all bg-white'
                                    }>
                                    退出登录
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

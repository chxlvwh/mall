'use client';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
const Cookies = require('js-cookie');

export const HeaderRight = ({ isLogin }: { isLogin: boolean }) => {
    const logout = () => {
        Cookies.remove('SESSIONID');
        location.reload();
    };
    return (
        <div className={'flex'}>
            {!isLogin ? (
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
                    <span>Welcome</span>
                    <div className={'inline group relative cursor-pointer'}>
                        <Image
                            className={'inline ml-2 cursor-pointer'}
                            src={'/img/user.png'}
                            alt={';'}
                            width={30}
                            height={30}
                        />
                        <ul
                            className={
                                'hidden group-hover:block bg-white absolute left-0 top-0 whitespace-nowrap leading-10 pt-10 bg-transparent'
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

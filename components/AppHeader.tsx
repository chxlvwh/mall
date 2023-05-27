import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IncomingMessage } from 'http';
import axios, { AxiosResponse } from 'axios';
const cookie = require('cookie');

const AppHeader = () => {
    return (
        <header className={'h-[64px] bg-white leading-[64px] flex justify-center'}>
            <div className={'w-[1200px] flex justify-between'}>
                <div className={'flex leading-[64px]'}>
                    <Image
                        src={'/next.svg'}
                        alt={'logo'}
                        width={100}
                        height={180}
                        className={'mr-20'}
                    />
                    <ul className={'flex'}>
                        <Link
                            href={'/'}
                            className={`text-center px-5 cursor-pointer hover:text-white relative overflow-hidden group
                                         before:absolute before:content-[''] before:h-full before:left-0 before:top-0 before:z-0
                                         before:w-0 hover:before:w-full before:duration-500 hover:before:bg-blue-500 duration-500`}>
                            <span
                                className={`group-hover:inline absolute left-1/2 translate-x-[-50%]`}>
                                首页
                            </span>
                            <span className={`text-transparent`}>首页</span>
                        </Link>
                        <Link
                            href={'/'}
                            className={`text-center px-5 cursor-pointer hover:text-white relative overflow-hidden group
                                         before:absolute before:content-[''] before:h-full before:left-0 before:top-0 before:z-0
                                         before:w-0 hover:before:w-full before:duration-500 hover:before:bg-blue-500 duration-500`}>
                            <span
                                className={`group-hover:inline absolute left-1/2 translate-x-[-50%] whitespace-nowrap`}>
                                商品分类
                            </span>
                            <span className={`text-transparent`}>商品分类</span>
                        </Link>
                        <Link
                            href={'/'}
                            className={`text-center px-5 cursor-pointer hover:text-white relative overflow-hidden group
                                         before:absolute before:content-[''] before:h-full before:left-0 before:top-0 before:z-0
                                         before:w-0 hover:before:w-full before:duration-500 hover:before:bg-blue-500 duration-500`}>
                            <span
                                className={`group-hover:inline absolute left-1/2 translate-x-[-50%] whitespace-nowrap`}>
                                商品列表
                            </span>
                            <span className={`text-transparent`}>商品列表</span>
                        </Link>
                        <Link
                            href={'/'}
                            className={`text-center px-5 cursor-pointer hover:text-white relative overflow-hidden group
                                         before:absolute before:content-[''] before:h-full before:left-0 before:top-0 before:z-0
                                         before:w-0 hover:before:w-full before:duration-500 hover:before:bg-blue-500 duration-500`}>
                            <span
                                className={`group-hover:inline absolute left-1/2 translate-x-[-50%] whitespace-nowrap`}>
                                购物车
                            </span>
                            <span className={`text-transparent`}>购物车</span>
                        </Link>
                        <Link
                            href={'/'}
                            className={`text-center px-5 cursor-pointer hover:text-white relative overflow-hidden group
                                         before:absolute before:content-[''] before:h-full before:left-0 before:top-0 before:z-0
                                         before:w-0 hover:before:w-full before:duration-500 hover:before:bg-blue-500 duration-500`}>
                            <span
                                className={`group-hover:inline absolute left-1/2 translate-x-[-50%] whitespace-nowrap`}>
                                订单管理
                            </span>
                            <span className={`text-transparent`}>订单管理</span>
                        </Link>
                    </ul>
                </div>
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
            </div>
        </header>
    );
};

export const getServerSideProps = async ({ req }: { req: IncomingMessage }) => {
    const JSONCookie = cookie.parse(req.headers.cookie);
    let response = {} as AxiosResponse;
    try {
        response = await axios.get(`${process.env.serverUrl}/menus`, {
            withCredentials: true,
            headers: { Authorization: `bearer ${JSONCookie.SESSIONID}` }
        });
    } catch (e) {
        console.info('Error: Caught an error when attempting to fetch menus', e);
    }
    return { props: { menus: response.data || [] } };
};

export default AppHeader;

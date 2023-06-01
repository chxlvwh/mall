import React, { useState } from 'react';
import '../app/globals.css';
import { Button, Checkbox, ConfigProvider, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { customThemeToken } from '@/utils/const';
import { login, LoginProps } from '@/apis/client/auth';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/apis/client/user';

const Login = () => {
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const router = useRouter();

    const onFinish = async (loginProps: LoginProps) => {
        setSubmitLoading(true);
        try {
            const res = await login<{ access_token: string }>({
                username: loginProps.username,
                password: loginProps.password
            });
            localStorage.setItem('SESSIONID', res.data.access_token);
            message.success('登录成功');
            const {
                data: { data: userInfo }
            } = await getUserInfo();
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            router.push('/');
            setSubmitLoading(false);
        } catch (err) {
            setSubmitLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="h-full min-h-screen bg-[url('/img/login-bcg.jpg')] bg-cover pt-40">
            <div className="md:w-1/3 xs:w-screen bg-white rounded-2xl ml-auto mr-auto py-10 px-20">
                <Link href={'/'}>
                    <Image
                        src={'/next.svg'}
                        alt={'logo'}
                        width={40}
                        height={180}
                        className={'mr-5 content-center inline'}
                    />
                </Link>
                <h1 className={`block text-center text-primary-color mb-10 text-2xl font-bold`}>
                    <span className="hidden">SEO</span>
                    Login
                </h1>
                <ConfigProvider theme={{ token: { ...customThemeToken, fontSize: 16 } }}>
                    <Form
                        name="loginForm"
                        size="large"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                        autoComplete="off">
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input
                                size="large"
                                placeholder={'Please input your username'}
                                prefix={<UserOutlined className={`text-primary-color`} />}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password
                                size="large"
                                placeholder={'Please input your password'}
                                prefix={<LockOutlined className={`text-primary-color`} />}
                            />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className={`w-full text-white`}
                                htmlType="submit"
                                loading={submitLoading}>
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
                <p className={`text-center text-sm`}>
                    <Link href="/signup" className={`text-second-color`}>
                        Signup
                    </Link>
                </p>
            </div>
        </div>
    );
};

// export const getServerSideProps = async ({ req }: { req: IncomingMessage }) => {
// const JSONCookie = cookie.parse(req.headers.cookie);
// let response = {} as AxiosResponse;
// try {
//     response = await axios.get(`${process.env.serverUrl}/menus`, {
//         withCredentials: true,
//         headers: { Authorization: `bearer ${JSONCookie.SESSIONID}` }
//     });
// } catch (e) {
//     console.info('Error: Caught an error when attempting to fetch menus', e);
// }
// return { props: { menus: response.data || [] } };
// };

export default Login;

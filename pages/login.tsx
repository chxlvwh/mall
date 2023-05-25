import '../app/globals.css';
import React, { useState } from 'react';
import { Button, Checkbox, ConfigProvider, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { $primaryColor, customThemeToken } from '@/utils/const';
import { login, LoginProps } from '@/apis/auth';
import { IncomingMessage } from 'http';
import axios, { AxiosResponse } from 'axios';
const cookie = require('cookie');

const Login = () => {
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const onFinish = async (loginProps: LoginProps) => {
        setSubmitLoading(true);
        try {
            const res = await login<{ access_token: string }>({
                username: loginProps.username,
                password: loginProps.password
            });
            localStorage.setItem('SESSIONID', res.data.access_token);
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
                <h1 className={`text-center text-[${$primaryColor}] mb-10 text-2xl font-bold`}>
                    <span className="hidden">SEO</span>
                    Login
                </h1>
                <ConfigProvider theme={{ token: { ...customThemeToken, fontSize: 18 } }}>
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
                                prefix={<UserOutlined className={`text-[rgb(67,56,202)]`} />}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password
                                size="large"
                                prefix={<LockOutlined className="text-[rgb(67,56,202)]" />}
                            />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                className="w-full"
                                type="primary"
                                htmlType="submit"
                                loading={submitLoading}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </div>
        </div>
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
        console.info('Error: Caught an error when attempting to fetch menus', e.message);
    }
    return { props: { menus: response.data || [] } };
};

export default Login;

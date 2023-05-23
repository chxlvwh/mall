import '../app/globals.css';
import 'semantic-ui-css/semantic.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import Link from 'next/link';
import { signup } from '@/apis/auth';

// type Menus = {
//     id: number;
//     name: string;
//     acl: string;
//     path: string;
//     order: number;
// };

export default () =>
    // { menus }: InferGetServerSidePropsType<typeof getServerSideProps>
    {
        const [username, setUsername] = useState<string>('');
        const [password, setPassword] = useState<string | undefined>('');
        const [confirmPassword, setConfirmPassword] = useState<string>('');
        const [agreed, setAgreed] = useState<boolean>(false);
        const [usernameError, setUsernameError] = useState<boolean>(false);
        const [passwordError, setPasswordError] = useState<boolean>(false);
        const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
        const handleSubmit = async () => {
            if (!username) {
                setUsernameError(true);
            }
            if (!password) {
                setPasswordError(true);
            }
            if (!confirmPassword) {
                setConfirmPasswordError(true);
            }
            if (!username || !password || !confirmPassword) {
                return;
            }
            const res = await signup({ username: username, password });
            console.log(res);
        };
        return (
            <div className="h-full min-h-screen bg-[url('/img/login-bcg.jpg')] bg-cover pt-40">
                <div className="md:w-1/3 xs:w-screen bg-white rounded-2xl ml-auto mr-auto p-10">
                    <h1 className="text-center text-red-500">
                        <span className="hidden">SEO</span>
                        Sign Up
                    </h1>
                    <Form>
                        <Form.Field error={usernameError}>
                            <label>Username</label>
                            <input
                                placeholder="Please input password"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setUsernameError(false);
                                }}
                            />
                        </Form.Field>
                        <Form.Field error={passwordError}>
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Please input password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError(false);
                                }}
                            />
                        </Form.Field>
                        <Form.Field error={confirmPassword !== password || confirmPasswordError}>
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                placeholder="Please input password again"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setConfirmPasswordError(false);
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                label="I agree to the Terms and Conditions"
                                checked={agreed}
                                onChange={(e) => {
                                    setAgreed(!agreed);
                                }}
                            />
                        </Form.Field>
                        <div className="flex justify-between">
                            <Button type="submit" color="green" onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Link className="align-middle leading-9" href="/login">
                                Login
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        );
    };

// export const getServerSideProps: GetServerSideProps<{ menus: Menus[] }> = async () => {
//     const res = await fetch('http://localhost:3002/api/v1/menus');
//     const menus = await res.json();
//     return { props: { menus } };
// };

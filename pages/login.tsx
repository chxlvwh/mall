import '../app/globals.css';
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { Button, Checkbox, Form, Input } from 'semantic-ui-react';
import Image from 'next/image';
import Link from 'next/link';

export default () => {
    return (
        <div className="h-full min-h-screen bg-[url('/img/login-bcg.jpg')] bg-cover pt-40">
            <div className="md:w-1/3 xs:w-screen bg-white rounded-2xl ml-auto mr-auto p-10">
                <h1 className="text-center text-red-500">
                    <span className="hidden">SEO</span>
                    Login
                </h1>
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder="Please input username" />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type="password" placeholder="Please input password" />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label="I agree to the Terms and Conditions" />
                    </Form.Field>
                    <div className="flex justify-between">
                        <Button type="submit" color="green">
                            Submit
                        </Button>
                        <Link className="align-middle leading-9" href="/signup">
                            Sign up
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

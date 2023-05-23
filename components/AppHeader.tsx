'use client';

import React, { SyntheticEvent, useState } from 'react';
import { InView } from 'react-intersection-observer';
import { Button, Container, Menu, MenuItemProps } from 'semantic-ui-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function App() {
    const router = useRouter();
    const [activeItem, setActiveItem] = useState<string | undefined>('home');
    const handleItemClick = (e: SyntheticEvent, { name }: MenuItemProps) => {
        setActiveItem(name);
        router.push(`/${name === 'home' ? '' : name}`);
    };

    return (
        <>
            <InView>
                <Menu borderless fixed={'top'} className="h-20">
                    <Container className="pl-6 pr-6">
                        <Menu.Item>
                            <Image
                                className="!mr-20 ui"
                                src="/next.svg"
                                alt="Next.js Logo"
                                width={100}
                                height={37}
                            />
                        </Menu.Item>
                        <Menu.Item
                            name="home"
                            active={activeItem === 'home'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name="messages"
                            active={activeItem === 'messages'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name="friends"
                            active={activeItem === 'friends'}
                            onClick={handleItemClick}
                        />
                        <Menu.Item
                            name="logout"
                            active={activeItem === 'logout'}
                            onClick={handleItemClick}
                        />
                        <Menu.Menu position="right" className="relative">
                            <Button className="h-10 relative top-1/4" color="red">
                                <Link href="/login">Login</Link>
                            </Button>

                            <Button className="h-10 relative top-1/4" color="grey">
                                Logout
                            </Button>
                        </Menu.Menu>
                    </Container>
                </Menu>
            </InView>
        </>
    );
}

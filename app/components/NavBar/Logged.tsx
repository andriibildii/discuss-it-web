'use client';

import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

interface ILoggedProps {
    image: string;
}

export default function Logged({ image }: ILoggedProps) {
    return (
        <li className='flex items-center gap-8'>
            <button
                onClick={() => signOut()}
                className='rounded-xl bg-gray-700 px-6 py-2 text-sm text-white disabled:opacity-25'
            >
                Sign Out
            </button>
            <Link href={'/dashboard'}>
                <Image
                    width={64}
                    height={64}
                    src={image}
                    alt='user image'
                    className='w-14 rounded-full'
                />
            </Link>
        </li>
    );
}

'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
    return (
        <li className='list-none'>
            <button
                onClick={() => signIn()}
                className='rounded-xl bg-gray-700 px-6 py-2 text-sm text-white disabled:opacity-25'
            >
                Sign In
            </button>
        </li>
    );
}

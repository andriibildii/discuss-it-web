'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IComment } from '../types/postsTypes';

interface IPostProps {
    id: string;
    image: string | undefined;
    name: string | undefined;
    postTitle: string;
    comments: IComment[] | undefined;
}

export default function Post({
    id,
    image,
    name,
    postTitle,
    comments,
}: IPostProps) {
    return (
        <div className='my-8 rounded-lg bg-white p-8'>
            <div className='flex items-center gap-2'>
                <Image
                    className='rounded-full'
                    width={32}
                    height={32}
                    src={image ? image : ''}
                    alt='avatar'
                />
                <h3 className='font-bold text-gray-700'>{name}</h3>
            </div>
            <div className='my-8'>
                <p className='break-all'>{postTitle}</p>
            </div>
            <div className='flex cursor-pointer items-center gap-4'>
                <Link href={`/post/${id}`}>
                    <p className='text-sm font-bold text-gray-700'>
                        {comments?.length} Comments
                    </p>
                </Link>
            </div>
        </div>
    );
}

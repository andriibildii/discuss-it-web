'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios from 'axios';
import Toggle from './Toggle';
import { IComment } from '../types/postsTypes';
import Link from 'next/link';

interface IMyPostProps {
    id: string;
    image: string;
    name: string;
    title: string;
    comments?: IComment[];
}

export default function MyPost({
    id,
    image,
    name,
    title,
    comments,
}: IMyPostProps) {
    const [toggle, setToggle] = useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();
    let deleteToastID = 'Dashboard';

    const { mutate } = useMutation(
        async (id: string) => await axios.delete(`/api/posts/deletePost/${id}`),
        {
            onError: (error) => {
                toast.error('Error deleting that post', { id: deleteToastID });
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(['my-posts']);
                router.refresh();
                toast.success('Post has been deleted', {
                    id: deleteToastID,
                });
            },
        }
    );

    const deletePost = () => {
        deleteToastID = toast.loading('Deleting your post.', {
            id: deleteToastID,
        });
        mutate(id);
    };

    return (
        <>
            <div className='my-8 rounded-lg bg-white p-8'>
                <div className='flex items-center gap-2'>
                    <Image width={32} height={32} src={image} alt='avatar' />
                    <h3 className='font-bold text-gray-700'>{name}</h3>
                </div>
                <div className='my-8 '>
                    <p className='break-all'>{title}</p>
                </div>
                <div className='flex items-center gap-4 '>
                    <Link href={`/post/${id}`}>
                        <p className=' text-sm font-bold text-gray-700'>
                            {comments?.length} Comments
                        </p>
                    </Link>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setToggle(true);
                        }}
                        className='text-sm font-bold text-red-500'
                    >
                        Delete
                    </button>
                </div>
            </div>
            {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
        </>
    );
}

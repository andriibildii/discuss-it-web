'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const router = useRouter();
    let toastPostID = 'Post';

    // Access the client
    const queryClient = useQueryClient();

    //Create a post
    const { mutate } = useMutation(
        async (title: string) =>
            await axios.post('/api/posts/addPost', {
                title,
            }),
        {
            onError: (error) => {
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, {
                        id: toastPostID,
                    });
                }
                setIsDisabled(false);
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(['posts']);
                router.refresh();
                toast.success('Post has been made', { id: toastPostID });
                setTitle('');
                setIsDisabled(false);
            },
        }
    );
    const submitPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDisabled(true);
        toastPostID = toast.loading('Creating your post', { id: toastPostID });
        mutate(title);
    };

    return (
        <form onSubmit={submitPost} className='my-8 rounded-md bg-white p-8 '>
            <div className='my-4 flex flex-col'>
                <textarea
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    name='title'
                    placeholder="What's on your mind?"
                    className='my-2 rounded-md bg-gray-200 p-4  text-lg'
                />
            </div>
            <div className=' flex items-center justify-between gap-2'>
                <p
                    className={`text-sm font-bold ${
                        title.length > 300 ? 'text-red-700' : 'text-gray-700'
                    } `}
                >{`${title.length}/300`}</p>
                <button
                    disabled={isDisabled}
                    className='rounded-xl bg-teal-600 px-6 py-2 text-sm text-white disabled:opacity-25'
                    type='submit'
                >
                    Create post
                </button>
            </div>
        </form>
    );
}

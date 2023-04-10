'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MyPost from './MyPost';
import { IUser } from '../types/postsTypes';

const fetchAuthPosts = async () => {
    const response = await axios.get('/api/posts/authPosts');
    return response.data;
};

export default function MyPosts() {
    const { data, isLoading } = useQuery<IUser>({
        queryFn: fetchAuthPosts,
        queryKey: ['auth-posts'],
    });

    if (isLoading) return <h1>Posts are loading...</h1>;

    console.log(data);

    return (
        <div>
            {data?.post?.map((myPost) => (
                <MyPost
                    key={myPost.id}
                    id={myPost.id}
                    image={data.image}
                    name={data.name}
                    title={myPost.title}
                    comments={myPost.comments}
                />
            ))}
        </div>
    );
}

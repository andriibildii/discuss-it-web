'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Post from './components/Post';
import AddPost from './components/AddPost';
import { IPosts } from './types/postsTypes';

//Fetch All posts
const allPosts = async () => {
    const response = await axios.get('/api/posts/getPosts');
    return response.data;
};

export default function Home() {
    const { data } = useQuery<IPosts[]>({
        queryFn: allPosts,
        queryKey: ['posts'],
    });

    return (
        <div>
            <AddPost />
            {data?.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    name={post.user?.name}
                    image={post.user?.image}
                    postTitle={post.title}
                    comments={post.comments}
                />
            ))}
        </div>
    );
}

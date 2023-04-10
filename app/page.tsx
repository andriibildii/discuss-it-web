import Post from './components/Post';
import axios from 'axios';
import AddPost from './components/AddPost';
import { IPosts } from './types/postsTypes';

async function getPosts() {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/getPosts`, {
        cache: 'no-store',
    });
    return res.json();
}

export default async function Home() {
    const data: IPosts[] = await getPosts();

    return (
        <main>
            <AddPost />
            {data?.map((post) => (
                <Post
                    key={post.id}
                    image={post.user?.image}
                    name={post.user?.name}
                    postTitle={post.title}
                    id={post.id}
                    comments={post.comments}
                />
            ))}
        </main>
    );
}

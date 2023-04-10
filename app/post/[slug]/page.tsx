import Post from '@/app/components/Post';
import AddComment from '@/app/components/PostDetails/AddComment';
import Comment from '@/app/components/PostDetails/Comment';
import { IPosts } from '@/app/types/postsTypes';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

interface IParams {
    params: {
        slug: string;
    };
}

async function fetchDetails(slug: string) {
    const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/posts/${slug}`,
        { cache: 'no-store' }
    );

    return response.json();
}

export default async function PostDetail({ params }: IParams) {
    const data: IPosts = await fetchDetails(params.slug);
    const session = await getServerSession(authOptions);

    return (
        <div>
            <Post
                id={data?.id}
                image={data?.user?.image}
                name={data?.user?.name}
                postTitle={data?.title}
                comments={data?.comments}
            />
            <AddComment id={data?.id} />
            {data?.comments?.map((comment) => (
                <Comment
                    key={comment.id}
                    image={comment.user?.image}
                    name={comment.user?.name}
                    createdAt={comment.createdAt}
                    comment={comment.message}
                    account={session?.user?.email}
                    commentCreator={comment.user?.email}
                    commentId={comment.id}
                />
            ))}
        </div>
    );
}

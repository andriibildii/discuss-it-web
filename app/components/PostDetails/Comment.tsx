import Image from 'next/image';
import DeleteComment from './DeleteComment';

interface ICommentProps {
    image: string | undefined;
    name: string | undefined;
    createdAt: string;
    comment: string;
    account?: string | undefined | null;
    commentCreator?: string;
    commentId: string;
}

export default function Comment({
    image,
    name,
    createdAt,
    comment,
    account,
    commentCreator,
    commentId,
}: ICommentProps) {
    const date = new Date(createdAt);
    const options = { timeZone: 'Europe/Kiev' };
    const formattedDate = date.toLocaleString('uk-UA', options);

    return (
        <div className='my-6 rounded-md bg-white p-8'>
            <div className='flex justify-between'>
                <div className='flex gap-1'>
                    <Image
                        className='rounded-full'
                        width={24}
                        height={24}
                        src={image ? image : ''}
                        alt='avatar'
                    />
                    <h3 className='font-bold'>{name}</h3>
                </div>
                <div>
                    <h2 className='text-sm'>{formattedDate}</h2>
                </div>
            </div>
            <div className='py-4'>{comment}</div>
            <div>
                {account === commentCreator && (
                    <DeleteComment commentId={commentId} />
                )}
            </div>
        </div>
    );
}

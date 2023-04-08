import Image from "next/image";
import DeleteComment from "./DeleteComment";

interface ICommentProps {
	avatar: string | undefined;
	name: string | undefined;
	createdAt: string;
	comment: string;
	account?: string | undefined | null;
	commentCreator?: string;
	commentId: string;
}

export default function Comment({
	avatar,
	name,
	createdAt,
	comment,
	account,
	commentCreator,
	commentId,
}: ICommentProps) {
	return (
		<div className="my-6 bg-white p-8 rounded-md">
			<div className="flex justify-between">
				<div className="flex gap-1">
					<Image
						className="rounded-full"
						width={24}
						height={24}
						src={avatar ? avatar : ""}
						alt="avatar"
					/>
					<h3 className="font-bold">{name}</h3>
				</div>
				<div>
					<h2 className="text-sm">{createdAt}</h2>
				</div>
			</div>
			<div className="py-4">{comment}</div>
			<div>
				{account === commentCreator && <DeleteComment commentId={commentId} />}
			</div>
		</div>
	);
}

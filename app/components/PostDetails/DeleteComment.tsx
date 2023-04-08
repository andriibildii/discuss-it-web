"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function DeleteComment({ commentId }: { commentId: string }) {
	const router = useRouter();
	let deleteToastId = "Comment";

	// Delete Comment
	const { mutate } = useMutation(
		async (id: string) => await axios.delete(`/api/posts/deleteComment/${id}`),
		{
			onError: (error) => {
				toast.error("Error deleting that comment", { id: deleteToastId });
			},
			onSuccess: (data) => {
				toast.success("Comment has been deleted", { id: deleteToastId });
				router.refresh();
			},
		}
	);

	const deleteComment = () => {
		deleteToastId = toast.loading("Deleting your comment.", {
			id: deleteToastId,
		});
		mutate(commentId);
	};

	return (
		<button className="text-sm font-bold text-red-500" onClick={deleteComment}>
			Delete
		</button>
	);
}

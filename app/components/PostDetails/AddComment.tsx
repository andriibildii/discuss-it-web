"use client";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IMutateData {
	title: string;
	postId: string | undefined;
}

export default function AddComment({ id }: { id: string }) {
	const [title, setTitle] = useState("");
	const [isDisabled, setIsDisabled] = useState(false);
	const router = useRouter();
	let commentToastId = "Comment";

	// Access the client
	const queryClient = useQueryClient();

	// Create a post
	const { mutate } = useMutation(
		// Make a request
		async (data: IMutateData) =>
			await axios.post("/api/posts/addComment", { data }),
		{
			onError: (error) => {
				if (error instanceof AxiosError) {
					toast.error(error?.response?.data.message, { id: commentToastId });
				}
				setIsDisabled(false);
			},
			onSuccess: (data) => {
				toast.success("Comment has been added", {
					id: commentToastId,
				});
				setTitle("");
				setIsDisabled(false);
				router.refresh();
			},
		}
	);

	const submitComment = async (e: React.FormEvent) => {
		e.preventDefault();
		commentToastId = toast.loading("Adding your comment", {
			id: commentToastId,
		});
		setIsDisabled(true);
		mutate({ title, postId: id });
	};

	return (
		<form onSubmit={submitComment} className="my-8">
			<h3>Add the comment</h3>
			<div className="flex flex-col my-2">
				<input
					className="p-4 text-gl rounded-md my-2"
					type="text"
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="flex items-center gap-2">
				<button
					className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
					type="submit"
					disabled={isDisabled}
				>
					Add Comment
				</button>
				<p
					className={`font-bold ${
						title.length > 300 ? "text-red-700" : "text-gray-700"
					}`}
				>{`${title.length}/300`}</p>
			</div>
		</form>
	);
}

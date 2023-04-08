"use client";

import Post from "./components/Post";
import AddPost from "./components/AddPost";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export type PostsType = {
	title: string;
	id: string;
	createdAt?: string;
	comments?: {
		createdAt: string;
		id: string;
		postId: string;
		userId: string;
	}[];
	user: {
		name: string;
		image: string;
	};
};

//Fetch All posts
const allPosts = async () => {
	const response = await axios.get("/api/posts/getPosts");
	return response.data;
};

export default function Home() {
	const { data } = useQuery<PostsType[]>({
		queryFn: allPosts,
		queryKey: ["posts"],
	});

	return (
		<div>
			<AddPost />
			{data?.map((post) => (
				<Post
					key={post.id}
					id={post.id}
					name={post.user.name}
					avatar={post.user.image}
					postTitle={post.title}
					comments={post.comments}
				/>
			))}
		</div>
	);
}

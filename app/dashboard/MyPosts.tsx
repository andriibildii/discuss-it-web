"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MyPost from "./MyPost";
import { AuthPosts } from "../types/AuthPosts";

const fetchAuthPosts = async () => {
	const response = await axios.get("/api/posts/authPosts");
	return response.data;
};

export default function MyPosts() {
	const { data, isLoading } = useQuery<AuthPosts>({
		queryFn: fetchAuthPosts,
		queryKey: ["auth-posts"],
	});

	if (isLoading) return <h1>Posts are loading...</h1>;

	return (
		<div>
			{data?.post?.map((p) => (
				<MyPost
					key={p.id}
					id={p.id}
					avatar={data.image}
					name={data.name}
					title={p.title}
					comments={p.comments}
				/>
			))}
		</div>
	);
}

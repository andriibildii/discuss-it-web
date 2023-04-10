import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import MyPosts from "./MyPosts";

export default async function Dashboard() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/api/auth/signin");
	}
	return (
		<main>
			<h1 className="text-2xl font-bold">Welcome {session.user?.name}</h1>
			<h2 className="text=xl pt-8">There are your posts:</h2>
			<MyPosts />
		</main>
	);
}

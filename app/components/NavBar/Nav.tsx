import Link from "next/link";
import Login from "./Login";
import Logged from "./Logged";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Nav() {
	// for get user
	const session = await getServerSession(authOptions);

	return (
		<nav className="flex justify-between items-center py-8">
			<Link href={"/"}>
				<h1 className="font-bold text-lg">!DiscussIt</h1>
			</Link>
			<ul className="flex items-center gap-6">
				{!session?.user ? (
					<Login />
				) : (
					<Logged image={session.user?.image || ""} />
				)}
			</ul>
		</nav>
	);
}

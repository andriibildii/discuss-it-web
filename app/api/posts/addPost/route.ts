import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { authOptions } from "../../../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import prisma from "../../../../prisma/client";

interface PrismaUser {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean | null;
	image?: string;
}

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session)
		return new Response("Error!", {
			status: 401,
			statusText: "Please sign in to make a post",
		});

	const res: { title: string } = await request.json();
	const title = res.title;

	// Get User
	// associate user with post
	const prismaUser = await prisma.user.findUnique({
		// @ts-ignore
		where: { email: session?.user?.email },
	});

	// Check title
	if (title.length > 300)
		return new Response("Error!", {
			status: 403,
			statusText: "Please write a shorter post",
		});

	if (!title.length)
		return new Response("Error!", {
			status: 403,
			statusText: "Please do not leave this empty",
		});

	// Create a post
	try {
		const result = await prisma.post.create({
			// @ts-ignore
			data: {
				title,
				userId: prismaUser?.id,
			},
		});
		return NextResponse.json(result);
	} catch (error) {
		return new Response("Error has occurred whilst making a post", {
			status: 403,
			statusText: "Error has occurred whilst making a post",
		});
	}
}

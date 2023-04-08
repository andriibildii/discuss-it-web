import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

import prisma from "../../../../prisma/client";

export async function GET(request: NextRequest) {
	// Fetch all posts
	try {
		const data = await prisma.post.findMany({
			// as because we have relation in between Post and User schemas and we wat to get user when we get posts we should use include user true
			include: {
				user: true,
				comments: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json(data);
	} catch (error) {
		return new Response("Error has occurred whilst making a post", {
			status: 403,
			statusText: "Error fetching posts",
		});
	}
}

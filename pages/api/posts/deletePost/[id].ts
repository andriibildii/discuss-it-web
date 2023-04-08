import { getServerSession } from "next-auth";
import prisma from "../../../../prisma/client";

import { authOptions } from "../../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).json({ message: "Please signin to delete a post." });
	}
	let postId = "";

	if (req.query.id && typeof req.query.id === "string") {
		postId = req.query.id;
	}

	if (req.method === "DELETE") {
		try {
			const result = await prisma.post.delete({
				where: {
					id: postId,
				},
			});

			res.status(200).json(result);
		} catch (err) {
			res.status(403).json({ err: "Error has occured while deleting a post" });
		}
	}
}

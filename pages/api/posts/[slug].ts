import prisma from '../../../prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let postId = '';

    if (typeof req.query.slug === 'string') {
        postId = req.query.slug;
    }

    if (req.method === 'GET') {
        try {
            const data = await prisma.post.findUnique({
                where: {
                    id: postId,
                },
                include: {
                    user: true,
                    comments: {
                        orderBy: {
                            createdAt: 'desc',
                        },
                        include: {
                            user: true,
                        },
                    },
                },
            });
            return res.status(200).json(data);
        } catch (err) {
            res.status(403).json({
                err: 'Error has occurred while getting the post',
            });
        }
    }
}

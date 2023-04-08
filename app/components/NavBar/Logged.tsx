"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface IUserImage {
	image: string;
}

export default function Logged({ image }: IUserImage) {
	return (
		<li className="flex gap-8 items-center">
			<button
				onClick={() => signOut()}
				className="text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25"
			>
				Sign Out
			</button>
			<Link href={"/dashboard"}>
				<Image
					width={64}
					height={64}
					src={image}
					alt="user image"
					className="rounded-full w-14"
				/>
			</Link>
		</li>
	);
}

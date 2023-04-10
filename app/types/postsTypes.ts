export interface IUser {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean | null;
	image: string;
	post?: IPosts[];
}

export interface IComment {
	id: string;
	message: string;
	postId: string;
	userId: string;
	createdAt: string;
	user?: IUser;
}

export interface IPosts {
	id: string;
	createdAt?: string;
	updatedAt?: string;
	title: string;
	published?: boolean;
	userId?: string;
	user?: IUser;
	comments?: IComment[];
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean | null;
	image: string;
}

export interface IComments {
	id: string;
	message: string;
	postId: string;
	userId: string;
	createdAt: string;
	user?: IUser;
}

export interface IPost {
	createdAt?: string;
	id: string;
	published: boolean;
	title: string;
	updatedAt?: string;
	user: IUser;
	userId?: string;
	comments?: IComments[];
}

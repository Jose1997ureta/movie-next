export interface UserProps {
	id: number;
	name: string;
	lastName: string;
	email: string;
	image: string;
	username: string;
}

export interface addSaveInfoProps {
	token: string;
	data: UserProps;
}

export interface AuthProps {
	user: UserProps | null;
	token: string;
	handleSaveInfo: (value: addSaveInfoProps) => void;
}

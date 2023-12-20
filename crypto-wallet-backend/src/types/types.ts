export interface IUser {
    id: number;
    email: string;
    username: string;
    userId: number;
    role: string;
}

export type ICurrency = {
    name: string;
    shortName: string;
    imgURL: string;
    equivalent?: number;
    address: string;
};

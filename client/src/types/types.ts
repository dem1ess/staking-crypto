export interface IUser {
    id: number
    email: string
    role: string
    token: string
}

export interface IUserData {
    email: string
    password: string
}

export interface IResponseUser {
    email: string
    id: number
    createdAt: string
    updatedAt: string
    password: string
    role?: string
}

export interface IResponseUserData {
    token: string
    user: IResponseUser
}

export interface ITransaction {
    amount: number
    createdAt: string
    updatedAt: string
    user: IUser
    type: string
    id: number
    wallet: IWallets
}

export interface IAddress {
    id: number
    name: string
    address: string
}

export interface ICryptoInfo {
    name: string
    symbol: string
    iconUrl: string
    price: number
    marketCap: string
    '24hVolume': string
    rank: number
    coinrankingUrl: string
}

export interface ICryptoData extends Array<ICryptoInfo> {
}

export interface IDeposit {
    id: number;
    amount: number;
    interestRate: number;
    startDate: string;
    endDate: string;
    user: IUser;
}

export interface IDepositFormData {
    amount: string;
    interestRate: string;
    startDate: string;
    endDate: string;
}

export interface IWallets {
    name: string
    id: number
    type: string
    balance: number
    imgURL: string
    userId: number
    equivalent: number
    address: string
    transactions?: []
}

export interface IResponseTransactionLoader {
    categories: IWallets[]
    transactions: ITransaction[]
    totalIncome: number
    totalExpense: number
}

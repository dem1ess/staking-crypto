import {IsDateString, IsNotEmpty, IsNumber} from 'class-validator';
import {User} from "../../user/entities/user.entity";
import {Wallet} from "../../wallet/entities/wallet.entity";
import {Transform} from "class-transformer";

export class CreateDepositDto {
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsNumber()
    @IsNotEmpty()
    interestRate: number;

    @IsDateString()
    @Transform(({value}) => new Date(value).toISOString().split('T')[0])
    startDate: string;

    @IsDateString()
    @Transform(({value}) => new Date(value).toISOString().split('T')[0])
    endDate: string;

    @IsNotEmpty()
    wallet: Wallet

    @IsNumber()
    @IsNotEmpty()
    user: User;
}
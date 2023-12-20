import {IsNotEmpty, IsNumber, IsString, MinLength,} from 'class-validator'
import {Wallet} from 'src/wallet/entities/wallet.entity'
import {User} from "../../user/entities/user.entity";

export class CreateTransactionDto {


    @IsNotEmpty()
    @IsNumber()
    amount: number

    @IsString()
    @MinLength(3)
    type: string

    @IsNotEmpty()
    wallet: Wallet

    @IsNotEmpty()
    user: User
}

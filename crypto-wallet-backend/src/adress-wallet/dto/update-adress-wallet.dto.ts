import {PartialType} from '@nestjs/mapped-types';
import {CreateAdressWalletDto} from './create-adress-wallet.dto';
import {IsOptional, IsString} from "class-validator";

export class UpdateAdressWalletDto extends PartialType(CreateAdressWalletDto) {
    @IsOptional() // Этот декоратор позволяет полю быть необязательным
    @IsString({message: 'Name must be a string'})
    name?: string;

    @IsOptional()
    @IsString({message: 'Address must be a string'})
    address?: string;
}

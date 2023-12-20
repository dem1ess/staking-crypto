import {PartialType} from '@nestjs/mapped-types';
import {CreateWalletDto} from './create-wallet.dto';
import {IsNumber, IsOptional} from "class-validator";

export class UpdateWalletDto extends PartialType(CreateWalletDto) {

    @IsOptional() // Этот декоратор позволяет полю быть необязательным
    @IsNumber({}, {message: 'Должно быть числом'})
    id?: number;

    @IsOptional()
    @IsNumber({}, {message: 'Должно быть числом'})
    balance?: number;
}

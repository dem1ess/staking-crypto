import {PartialType} from '@nestjs/mapped-types'
import {CreateTransactionDto} from './create-transaction.dto'
import {IsString} from "class-validator";

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @IsString({message: 'Type must be a string'})
    type: string
}

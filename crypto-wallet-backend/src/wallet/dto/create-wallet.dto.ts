import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateWalletDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  user?: User;
}

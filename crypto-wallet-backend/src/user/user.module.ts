import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletModule } from 'src/wallet/wallet.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    WalletModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'loremipsumdolorsitametconsecteturadipiscingelit',
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ScheduleModule} from '@nestjs/schedule';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CronService} from './CronService';
import {AdressWalletModule} from './adress-wallet/adress-wallet.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {DepositModule} from './deposit/deposit.module';
import {TransactionModule} from './transaction/transaction.module';
import {UserModule} from './user/user.module';
import {WalletModule} from './wallet/wallet.module';

@Module({
    imports: [
        UserModule,
        WalletModule,
        AuthModule,
        TransactionModule,
        ScheduleModule.forRoot(),
        AdressWalletModule,
        DepositModule,
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '123456',
                database: 'stack',
                synchronize: true,
                entities: [__dirname + '/**/*.entity{.js, .ts}'],
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService, CronService],
})
export class AppModule {
}

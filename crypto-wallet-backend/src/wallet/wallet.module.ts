import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Transaction} from 'src/transaction/entities/transaction.entity';
import {TransactionService} from 'src/transaction/transaction.service';
import {Wallet} from './entities/wallet.entity';
import {WalletController} from './wallet.controller';
import {WalletService} from './wallet.service';

@Module({
    imports: [TypeOrmModule.forFeature([Wallet, Transaction])],
    providers: [WalletService, TransactionService],
    controllers: [WalletController],
    exports: [WalletService, TypeOrmModule],
})
export class WalletModule {
}

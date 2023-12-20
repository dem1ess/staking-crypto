import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Wallet} from 'src/wallet/entities/wallet.entity';
import {WalletService} from 'src/wallet/wallet.service';
import {Transaction} from './entities/transaction.entity';
import {TransactionController} from './transaction.controller';
import {TransactionService} from './transaction.service';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Wallet])],
    controllers: [TransactionController],
    providers: [TransactionService, WalletService],
})
export class TransactionModule {
}

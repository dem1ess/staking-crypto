import {Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Wallet} from "./wallet/entities/wallet.entity";
import {Deposit} from "./deposit/entities/deposit.entity";

@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);

    constructor(
        @InjectRepository(Deposit)
        private depositRepository: Repository<Deposit>,
        @InjectRepository(Wallet)
        private walletRepository: Repository<Wallet>,
    ) {
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // runs every day at midnight
    async handleCron() {
        this.logger.debug('Started updating wallets balance');

        const expiredDeposits = await this.depositRepository.createQueryBuilder('deposit')
            .where('deposit.endDate <= :today', {today: new Date()})
            .getMany();

        for (let deposit of expiredDeposits) {
            const wallet = await this.walletRepository.findOne({where: {userId: deposit.user.id}})
            if (wallet) {
                console.log(deposit.interestRate)
                
                const newBalance = wallet.balance + deposit.amount + (deposit.amount * deposit.interestRate);
                await this.updateWalletBalance(wallet.id, newBalance);
            }
        }

        this.logger.debug('Finished updating wallets balance');
    }

    async updateWalletBalance(walletId: number, newBalance: number): Promise<Wallet | undefined> {
        const wallet = await this.walletRepository.findOne({where: {id: walletId}});

        if (!wallet) {
            return undefined; // или бросьте исключение или обработайте ошибку, в зависимости от вашей логики
        }

        wallet.balance = newBalance; // Обновляем баланс кошелька

        await this.walletRepository.save(wallet); // Сохраняем обновленный кошелек

        return wallet;
    }
}
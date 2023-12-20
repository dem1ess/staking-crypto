import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Transaction} from 'src/transaction/entities/transaction.entity';
import {IUser} from 'src/types/types';
import {User} from 'src/user/entities/user.entity';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {Wallet} from './entities/wallet.entity';
import {AdressWallet} from "../adress-wallet/entities/adress-wallet.entity";

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
    ) {
    }

    async createWallet(
        user: User,
        shortName: string,
        name: string,
        imgURL: string,
        equivalent: number,
        address: string,
    ): Promise<Wallet> {
        const wallet = new Wallet();
        wallet.name = name;
        wallet.balance = 0;
        wallet.type = shortName;
        wallet.user = user;
        wallet.userId = user.id;
        wallet.imgURL = imgURL;
        wallet.equivalent = equivalent;
        wallet.address = address;
        return await this.walletRepository.save(wallet);
    }

    async getUserWallets(userId: number): Promise<Wallet[]> {
        return await this.walletRepository.find({
            where: {user: {id: userId}},
        });
    }

    async updateWalletBalance(walletId: number, newBalance: number): Promise<AdressWallet | undefined> {
        const wallet = await this.walletRepository.findOne({where: {id: walletId}});

        if (!wallet) {
            return undefined; // или бросьте исключение или обработайте ошибку, в зависимости от вашей логики
        }

        wallet.balance = newBalance; // Обновляем баланс кошелька

        await this.walletRepository.save(wallet); // Сохраняем обновленный кошелек

        return wallet;
    }


    // async findAll(id: number) {
    //   return await this.walletRepository.find({
    //     where: {
    //       user: { id },
    //     },
    //     relations: {
    //       transactions: true,
    //     },
    //   });
    // }

    async findAll(userId: number) {
        const queryBuilder: SelectQueryBuilder<Wallet> = this.walletRepository
            .createQueryBuilder('wallet')
            .innerJoin('wallet.user', 'user')
            .where('user.id = :userId', {userId});

        const wallets = await queryBuilder.getMany();

        return wallets;
    }

    async getWalletById(id: number): Promise<Wallet | undefined> {
        return await this.walletRepository.findOne({where: {id}});
    }

    async getWalletsByUser(user: IUser): Promise<Wallet[]> {
        return await this.walletRepository.find({where: {user}});
    }

    async getTransactionsByWallet(wallet: Wallet): Promise<Transaction[]> {
        const transactions = await this.transactionRepository
            .createQueryBuilder('transaction')
            .where(
                'transaction.senderWalletId = :walletId OR transaction.receiverWalletId = :walletId',
                {walletId: wallet.id},
            )
            .orderBy('transaction.createdAt', 'DESC')
            .getMany();

        return transactions;
    }
}

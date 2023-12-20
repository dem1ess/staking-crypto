import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      wallet: { id: +createTransactionDto.wallet.id },
      user: { id },
    };

    if (!newTransaction)
      throw new BadRequestException('Somethins went wrong...');
    return await this.transactionRepository.save(newTransaction);
  }

  async findAll() {
    const queryBuilder: SelectQueryBuilder<Transaction> =
      this.transactionRepository
        .createQueryBuilder('transaction')
        .leftJoinAndSelect('transaction.wallet', 'wallet') // Используем leftJoinAndSelect для включения информации о кошельке
        .orderBy('transaction.createdAt', 'DESC');

    const transactions = await queryBuilder.getMany();

    return transactions;
  }
  async findAllByUserId(userId: number) {
    const queryBuilder: SelectQueryBuilder<Transaction> =
      this.transactionRepository
        .createQueryBuilder('transaction')
        .innerJoinAndSelect('transaction.wallet', 'wallet') // Используем innerJoinAndSelect для включения информации о кошельке
        .innerJoin('wallet.user', 'user')
        .where('user.id = :userId', { userId })
        .orderBy('transaction.createdAt', 'DESC');

    const transactions = await queryBuilder.getMany();

    return transactions;
  }

  async findOne(id: number) {
    const transaction = await this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.wallet', 'wallet')
      .leftJoinAndSelect('transaction.category', 'category')
      .where('transaction.id = :id', { id })
      .getOne();

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return await this.transactionRepository.update(id, updateTransactionDto);
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) throw new NotFoundException('Transaction not found');

    return await this.transactionRepository.delete(id);
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const transactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .innerJoin('transaction.wallet', 'wallet')
      .innerJoin('wallet.user', 'user')
      .where('user.id = :userId', { userId: id })
      .orderBy('transaction.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return transactions;
  }

  async findAllByType(id: number, type: string) {
    const transactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .where('transaction.user.id = :id', { id })
      .andWhere('transaction.type = :type', { type })
      .getMany();

    const total = transactions.reduce((acc, obj) => acc + obj.amount, 0);

    return total;
  }
}

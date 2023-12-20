// deposit.service.ts

import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Deposit} from './entities/deposit.entity';
import {CreateDepositDto} from "./dto/create-deposit.dto";

@Injectable()
export class DepositService {
    constructor(
        @InjectRepository(Deposit)
        private readonly depositRepository: Repository<Deposit>,
    ) {
    }

    async create(createDepositDto: CreateDepositDto, id: number) {
        const deposit = {
            amount: createDepositDto.amount,
            interestRate: createDepositDto.interestRate,
            endDate: createDepositDto.endDate,
            startDate: createDepositDto.startDate,
            user: {id},
        }
        return await this.depositRepository.save(deposit);
    }

    async findAll(): Promise<Deposit[]> {
        return await this.depositRepository.find();
    }

    async findAllByUserId(id: number): Promise<Deposit[]> {
        return await this.depositRepository.find({
            where: {user: {id}},
        });
    }

    // async findOne(id: number): Promise<Deposit | undefined> {
    //     return await this.depositRepository.findOne(id);
    // }
    //
    // async update(id: number, updateDepositDto: CreateDepositDto): Promise<Deposit> {
    //     const deposit = await this.depositRepository.findOne(id);
    //
    //     if (!deposit) {
    //         throw new NotFoundException(`Deposit with ID ${id} not found`);
    //     }
    //
    //     deposit.amount = updateDepositDto.amount;
    //     deposit.interestRate = updateDepositDto.interestRate;
    //     deposit.startDate = updateDepositDto.startDate;
    //     deposit.endDate = updateDepositDto.endDate;
    //     deposit.userId = updateDepositDto.userId;
    //
    //     return await this.depositRepository.save(deposit);
    // }
    //
    // async remove(id: number): Promise<void> {
    //     const deposit = await this.depositRepository.findOne(id);
    //
    //     if (!deposit) {
    //         throw new NotFoundException(`Deposit with ID ${id} not found`);
    //     }
    //
    //     await this.depositRepository.remove(deposit);
    // }
}

import {Injectable} from '@nestjs/common';
import {AdressWallet} from "./entities/adress-wallet.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AdressWalletService {
    constructor(
        @InjectRepository(AdressWallet)
        private readonly adressWalletRepository: Repository<AdressWallet>,) {
    }

    async create(adressWalletData: Partial<AdressWallet>): Promise<AdressWallet> {
        const adressWallet = this.adressWalletRepository.create(adressWalletData);
        return await this.adressWalletRepository.save(adressWallet);
    }

    async findAll(): Promise<AdressWallet[]> {
        return await this.adressWalletRepository.find();
    }

    async findOne(id: number): Promise<AdressWallet | undefined> {
        return await this.adressWalletRepository.findOne({where: {id}});
    }

    async update(id: number, updateData: Partial<AdressWallet>): Promise<AdressWallet | undefined> {
        await this.adressWalletRepository.update(id, updateData);
        return await this.adressWalletRepository.findOne({where: {id}});
    }

    async remove(id: number): Promise<void> {
        await this.adressWalletRepository.delete(id);
    }
}

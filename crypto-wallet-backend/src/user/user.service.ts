import {BadRequestException, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import {Wallet} from 'src/wallet/entities/wallet.entity';
import {WalletService} from 'src/wallet/wallet.service';
import {Repository} from 'typeorm';
import {ICurrency} from '../types/types';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly walletService: WalletService,
    ) {
    }

    async create(createUserDto: CreateUserDto) {
        const existUser = await this.userRepository.findOne({
            where: {
                email: createUserDto.email,
            },
        });
        if (existUser) throw new BadRequestException('Этот email уже занят!');

        const user = await this.userRepository.save({
            email: createUserDto.email,
            password: await argon2.hash(createUserDto.password),
            role: 'lead',
        });


        const CURRENCY_NAMES: ICurrency[] = [
            {
                name: 'Bitcoin',
                shortName: 'BTC',
                imgURL: '/btc.svg',
                equivalent: 26663,
                address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
            },
            {
                name: 'Ethereum',
                shortName: 'ETH',
                imgURL: '/eth.svg',
                equivalent: 1591,
                address: 'tqTFn5Au4m4GF1BvBMSEYstWeg7xJaNVN2'
            },
            {
                name: 'Tether',
                shortName: 'USDT',
                imgURL: '/usdt.svg',
                equivalent: 1,
                address: 'stWetqTFn5Au1BvBMSEY4m4GFg7xJaNVN2'
            },
            {
                name: 'Litecoin',
                shortName: 'LTC',
                imgURL: '/ltc.svg',
                equivalent: 64.78,
                address: '4m4GFg7x1BvBMSEYstWetqTFn5AuJaNVN2'
            },
            {
                name: 'Ripple',
                shortName: 'XRP',
                imgURL: '/xrp.svg',
                equivalent: 0.508,
                address: 'SEYstWe1BvBMtqTFn5Au4m4GFg7xJaNVN2'
            },
            {
                name: 'Cardano',
                shortName: 'ADA',
                imgURL: '/ada.svg',
                equivalent: 0.249,
                address: 'tWetqTFn5A1BvBMSEYsu4m4GFg7xJaNVN2'
            },
            {
                name: 'Polkadot',
                shortName: 'DOT',
                imgURL: '/polkadot.svg',
                equivalent: 4.04,
                address: 'YstWetqTFn5A1BvBMSEu4m4GFg7xJaNVN2'
            },
            {
                name: 'Stellar',
                shortName: 'XLM',
                imgURL: '/xlm.svg',
                equivalent: 0.114,
                address: 'BMSEYstW1BvetqTFn5Au4m4GFg7xJaNVN2'
            },
            {
                name: 'Chainlink',
                shortName: 'LINK',
                imgURL: '/link.svg',
                equivalent: 6.75,
                address: '4GFg7xJa1BvBMSEYstWetqTFn5Au4mNVN2'
            },
        ];
        const createdWallets: Wallet[] = [];
        for (const currency of CURRENCY_NAMES) {
            const wallet = await this.walletService.createWallet(
                user,
                currency.shortName,
                currency.name,
                currency.imgURL,
                currency.equivalent,
                currency.address
            );
            createdWallets.push(wallet);
        }

        const token = this.jwtService.sign({email: createUserDto.email});

        return {user, token};
    }

    async findOne(email: string) {
        return await this.userRepository.findOne({
            where: {
                email,
            },
        });
    }
}

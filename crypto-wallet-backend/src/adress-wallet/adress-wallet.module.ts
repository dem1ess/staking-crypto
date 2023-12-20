import {Module} from '@nestjs/common';
import {AdressWalletService} from './adress-wallet.service';
import {AdressWalletController} from './adress-wallet.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AdressWallet} from "./entities/adress-wallet.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AdressWallet])],
    controllers: [AdressWalletController],
    providers: [AdressWalletService],
})
export class AdressWalletModule {
}

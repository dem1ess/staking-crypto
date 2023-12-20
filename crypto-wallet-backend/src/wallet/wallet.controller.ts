// wallet.controller.ts

import {Body, Controller, Get, Param, Patch, Req, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';
import {WalletService} from './wallet.service';
import {UpdateWalletDto} from "./dto/update-wallet.dto";

@Controller('wallets')
export class WalletController {
    constructor(private readonly walletService: WalletService) {
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req) {
        return this.walletService.findAll(+req.user.id);
    }

    @Patch('update-balance/:id')
    @UseGuards(JwtAuthGuard)
    async updateWalletBalance(
        @Param('id') walletId: number,
        @Body() updateWalletDto: UpdateWalletDto,
    ) {
        try {
            const updatedWallet = await this.walletService.updateWalletBalance(
                walletId,
                updateWalletDto.balance, // Получаем новый баланс из DTO
            );

            if (!updatedWallet) {
                return {message: 'Wallet not found'};
            }

            return {
                message: 'Wallet balance updated successfully',
                wallet: updatedWallet,
            };
        } catch (error) {
            return {message: `Error updating wallet balance: ${error.message}`};
        }
    }


    @Get(':id')
    async getWalletById(@Param('id') id: number) {
        return await this.walletService.getWalletById(id);
    }
}

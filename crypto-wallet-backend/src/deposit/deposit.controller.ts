// deposit.controller.ts

import {Body, Controller, Get, Post, Req, UseGuards,} from '@nestjs/common';
import {DepositService} from './deposit.service';
import {Deposit} from './entities/deposit.entity';
import {CreateDepositDto} from "./dto/create-deposit.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Controller('deposits')
export class DepositController {
    constructor(private readonly depositService: DepositService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)

    async create(@Body() createDepositDto: CreateDepositDto, @Req() req): Promise<Deposit> {
        return await this.depositService.create(createDepositDto, +req.user.id);
    }

    //
    // @Get(':id')
    // async findOne(@Param('id', ParseIntPipe) id: number): Promise<Deposit> {
    //     return await this.depositService.findOne(id);
    // }
    //
    //

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req) {
        console.log(req.user);
        if (req.user.role == 'admin') {
            return this.depositService.findAll();
        } else {
            return this.depositService.findAllByUserId(+req.user.id);
        }
    }


    // @Get('user/:userId')
    // async findAllByUser(@Param('userId', ParseIntPipe) userId: number): Promise<Deposit[]> {
    //     return await this.depositService.findAll(userId);
    // }

    // @Put(':id')
    // @UsePipes(ValidationPipe)
    // async update(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() updateDepositDto: CreateDepositDto,
    // ): Promise<Deposit> {
    //     return await this.depositService.update(id, updateDepositDto);
    // }
    //
    // @Delete(':id')
    // async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    //     return await this.depositService.remove(id);
    // }
}

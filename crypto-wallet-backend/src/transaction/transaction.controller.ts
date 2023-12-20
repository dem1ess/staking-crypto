import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards,} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';
import {CreateTransactionDto} from './dto/create-transaction.dto';
import {UpdateTransactionDto} from './dto/update-transaction.dto';
import {TransactionService} from './transaction.service';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
        return this.transactionService.create(createTransactionDto, +req.user.id);
    }

    @Get(':type/find')
    @UseGuards(JwtAuthGuard)
    findAllByType(@Req() req, @Param('type') type: string) {
        return this.transactionService.findAllByType(+req.user.id, type);
    }

    // @Get('pagination')
    // @UseGuards(JwtAuthGuard)
    // findAllWithPagination(
    //     @Req() req,
    //     @Query('page') page: number = 1,
    //     @Query('limit') limit: number = 3,
    // ) {
    //     return this.transactionService.findAllWithPagination(
    //         +req.user.id,
    //         +page,
    //         +limit,
    //     )
    // }

    //   @Get()
    //   @UseGuards(JwtAuthGuard)
    //   findAllByUserId(@Req() req) {
    //     return this.transactionService.findAllByUserId(+req.user.id);
    //   }

    //   @Get('/all')
    //   @UseGuards(JwtAuthGuard)
    //   findAll() {
    //     return this.transactionService.findAll();
    //   }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req) {
        console.log(req.user);
        if (req.user.role === 'admin') {
            return this.transactionService.findAll();
        } else {
            return this.transactionService.findAllByUserId(+req.user.id);
        }
    }

    // url/transactions/transaction/1
    // url/categories/category/1
    @Get(':type/:id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.transactionService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(
        @Param('id') id: string,
        @Body() updateTransactionDto: UpdateTransactionDto,
    ) {
        return this.transactionService.update(+id, updateTransactionDto);
    }

    @Delete(':type/:id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.transactionService.remove(+id);
    }
}

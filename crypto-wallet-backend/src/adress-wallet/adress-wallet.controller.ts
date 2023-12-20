import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdressWalletService } from './adress-wallet.service';
import { CreateAdressWalletDto } from './dto/create-adress-wallet.dto';
import { UpdateAdressWalletDto } from './dto/update-adress-wallet.dto';

@Controller('address-wallet')
export class AdressWalletController {
  constructor(private readonly adressWalletService: AdressWalletService) {}

  @Post()
  create(@Body() createAddressWalletDto: CreateAdressWalletDto) {
    return this.adressWalletService.create(createAddressWalletDto);
  }

  @Get()
  findAll() {
    return this.adressWalletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adressWalletService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAddressWalletDto: UpdateAdressWalletDto,
  ) {
    return this.adressWalletService.update(+id, updateAddressWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adressWalletService.remove(+id);
  }
}

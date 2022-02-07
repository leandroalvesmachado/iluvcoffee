import { CoffeesService } from './coffees.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

// @UsePipes(new ValidationPipe()) validation para todo o controller
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  // @UsePipes(new ValidationPipe()) validation para todo o método
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    // return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;

    return this.coffeesService.findAll(paginationQuery);
  }

  // formato utilizando express
  // @Get()
  // findAll(@Res() response) {
  //   response.status(200.send('This action returns all coffees');
  // }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.coffeesService.findOne('' + id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  // Método com status code informado, existe uma lista no nest
  // @Post()
  // @HttpCode(HttpStatus.GONE)
  // create(@Body() body) {
  //   return body;
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}

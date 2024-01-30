import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Query, Put, ConflictException } from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Page, PageResponse } from 'src/config/page.models';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UserService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUserDto): Promise<CreateUserDto> {
      if (await this.usersService.userExists(payload.cpf, payload.rg, payload.email)) {
      throw new ConflictException('Usuário com informações já existentes.')
    }
    return await this.usersService.create(payload);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() page: Page,
    @Query() filters: CreateUserDto,
    ): Promise < PageResponse < any > > {
      return await this.usersService.listAll(page, filters);
    }

    @Get('/:id')
    findOne(@Param('id') id: string) {
      return this.usersService.findOne(id);
    }

    @Put('/:id')
    @HttpCode(HttpStatus.OK)
    async update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
      return await this.usersService.update(id, payload);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
      return await this.usersService.delete(id);
    }
  }

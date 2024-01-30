import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Page, PageResponse } from 'src/config/page.models';
import IUserRepository from './repository/user.repository.contracts';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) { }

  async listAll(
    page: Page,
    filters?: CreateUserDto,
  ): Promise<PageResponse<any>> {
    const data = await this.userRepository.findAll(page, filters);

    if (data.items.length === 0) {
      throw new HttpException(
        'Não existem dados de Grupos',
        HttpStatus.NOT_FOUND,
      );
    }
    return data;
  }

  async create(payload: CreateUserDto) {
    return await this.userRepository.create(payload)
  }

  async findOne(id: string) {
    return await this.userRepository.findById(id)
  }

  async update(id: string, payload: UpdateUserDto): Promise<any> {
    return await this.userRepository.update(id, payload)
  }

  async delete(id: string): Promise<any> {
    return await this.userRepository.delete(id)
  }

  async userExists(rg: string, cpf: string, email: string): Promise<any> {
    const hasRG = await this.userRepository.rgValidation(rg)
    const hasCPF = await this.userRepository.cpfValidation(cpf)
    const hasEMAIL = await this.userRepository.emailValidation(email)

    return hasRG || hasCPF || hasEMAIL
  }
}
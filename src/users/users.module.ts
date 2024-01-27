import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/config/prisma.service';
import { UserRepository } from './repository/user.repository';

@Module({
  controllers: [UsersController],
  providers: [UserService, PrismaService,{
    provide: 'IUserRepository',
    useClass: UserRepository
  }],
  exports: [UserService]
})
export class UsersModule {}

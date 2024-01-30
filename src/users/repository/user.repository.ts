import { Pageable } from "src/config/pageable.service";
import IUserRepository from "./user.repository.contracts";
import { Page, PageResponse } from "src/config/page.models";
import { CreateUserDto } from "../dto/create-user.dto";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/config/prisma.service";
import { generateQueryForUser } from "src/utils/queryUser";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserRepository extends Pageable<any> implements IUserRepository {
    constructor(private readonly repository: PrismaService) {
        super();
    } async findAll(page: Page, filters?: CreateUserDto): Promise<PageResponse<any>> {
        const condition = generateQueryForUser(filters);
        const items = await this.repository.users.findMany({
            ...this.buildPage(page),
            where: {
                ...condition,
            },
            orderBy: {

            },
        });
        const total = await this.repository.users.count({
            where: {
                ...condition
            }
        })
        return this.buildPageResponse(items, total)
    }
    create(payload: CreateUserDto): Promise<any> {
        return this.repository.users.create({
            data: {
                ...payload
            },
        });
    }
    update(id: string, payload: UpdateUserDto): Promise<any> {
        return this.repository.users.update({
            data: {
                ...payload
            },
            where: {
                id: id
            }
        });
    }
    delete(id: string): Promise<any> {
        return this.repository.users.delete({
            where: {
                id: id
            }
        })
    }
    findById(id: string): Promise<any> {
        return this.repository.users.findUnique({
            where: {
                id: id
            }
        })
    }
    async cpfValidation(cpf: string): Promise<boolean> {
        const validation = await this.repository.users.findUnique({
            where: {
                cpf: cpf,
            }
        });
        return !!validation;
    }
    async rgValidation(rg: string): Promise<boolean> {
        const validation = await this.repository.users.findUnique({
            where: {
                rg: rg,
            }
        });
        return !!validation;
    }
    async emailValidation(email: string): Promise<boolean> {
        const validation = await this.repository.users.findUnique({
            where: {
                email: email,
            }
        });
        return !!validation;
    }
}

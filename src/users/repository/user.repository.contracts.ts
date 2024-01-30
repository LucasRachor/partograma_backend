import { Page, PageResponse } from "src/config/page.models";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

export default interface IUserRepository {
    findAll(page: Page, filters?: CreateUserDto): Promise<PageResponse<any>>
    create(payload: CreateUserDto): Promise<any>
    update(id: string, data: UpdateUserDto): Promise<any>
    delete(id: string): Promise<any>
    findById(id: string): Promise<any>
}
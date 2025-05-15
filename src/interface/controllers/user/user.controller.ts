import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CreateUserDto} from "./request-dto/create-user.dto";
import {CreateUserUseCase} from "../../../application/use-cases/user/create-user.use-case";
import {DeleteUserUseCase} from "../../../application/use-cases/user/delete-user.use-case";
import {UpdateUserUseCase} from "../../../application/use-cases/user/update-user.use-case";
import {ListUsersUseCase} from "../../../application/use-cases/user/list-users.use-case";

@Controller()
export class UserController {
    constructor(
        private readonly createUser: CreateUserUseCase,
        private readonly deleteUser: DeleteUserUseCase,
        private readonly updateUser: UpdateUserUseCase,
        private readonly usersList: ListUsersUseCase
    ) {}

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<string> {
        const result = await this.createUser.execute(dto);
        return "user created successfully"
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<string> {
        await this.deleteUser.execute(+id);
        return "user deleted successfully"
    }

    @Patch(":id")
    async update(@Param("id") id: string): Promise<string> {
        await this.updateUser.execute(+id);
        return "user updated successfully"
    }

    @Get()
    async findAll(): Promise<string> {
        this.usersList.execute();
        return "users list"
    }
}

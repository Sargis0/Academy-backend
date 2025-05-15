import {Injectable} from "@nestjs/common";
import {IUserRepository} from "../../../domain/entities/user/user.repository.interface";
import {UserEntity} from "../../../domain/entities/user/user.entity";

@Injectable()
export class UserRepository implements IUserRepository{
    async create(user: UserEntity): Promise<void> {
    }

    async findByEmail(email:string): Promise<void> {
    }
}

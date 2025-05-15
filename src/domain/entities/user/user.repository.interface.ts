import {UserEntity} from "./user.entity";

export interface IUserRepository {
    create(user: UserEntity): Promise<void>
    findByEmail(email: string): Promise<void>
}
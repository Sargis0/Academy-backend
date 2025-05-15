import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "../../../interface/controllers/user/request-dto/create-user.dto";

@Injectable()
export class CreateUserUseCase {
    async execute(dto: CreateUserDto): Promise<void> {

    }
}

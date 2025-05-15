import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "roles"})
export class RoleOrmEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    name: string
}

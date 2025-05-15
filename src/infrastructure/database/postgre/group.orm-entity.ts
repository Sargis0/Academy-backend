import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserOrmEntity} from "./user.orm-entity";

@Entity({name: "groups"})
export class GroupOrmEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => UserOrmEntity)
    @JoinTable({name: "user_groups"})
    members: UserOrmEntity[]
}

import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {RoleOrmEntity} from "./role.orm-entity";
import {JoinAttribute} from "typeorm/query-builder/JoinAttribute";

@Entity({name: "users"})
export class UserOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({default: null})
    phone_number: number

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    is_public: boolean;

    @Column({default: false})
    is_activated: Boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => RoleOrmEntity, {eager: true})
    role: RoleOrmEntity;
}

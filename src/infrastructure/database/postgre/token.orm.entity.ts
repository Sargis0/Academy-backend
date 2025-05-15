import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn
} from "typeorm";
import {UserOrmEntity} from "./user.orm-entity";

@Entity({name: "token"})
export class TokenOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    refreshToken: string;

    @OneToOne(() => UserOrmEntity, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: UserOrmEntity;

    @CreateDateColumn()
    createdAt: Date;

    @Column({type: 'timestamp'})
    expiresAt: Date;
}
